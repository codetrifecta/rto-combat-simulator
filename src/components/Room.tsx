import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Tile } from './Tile';
import { ENTITY_TYPE, STARTING_ACTION_POINTS } from '../constants/entity';
import { TILE_SIZE, TILE_TYPE } from '../constants/tile';
import {
  intelligenceBasedSkillIDs,
  SKILL_ID,
  SKILL_TYPE,
  weaponBasedSkillIDs,
} from '../constants/skill';
import { STATUSES, STATUS_ID } from '../constants/status';
import { WEAPON_ATTACK_TYPE } from '../constants/weapon';
import { IEnemy, IEntity, IPlayer } from '../types';
import { useGameStateStore } from '../store/game';
import { usePlayerStore } from '../store/player';
import { useEnemyStore } from '../store/enemy';
import {
  getEntityPosition,
  handlePlayerEndTurn,
  isEnemy,
  isPlayer,
  updateRoomEntityPositions,
} from '../utils';
import { useLogStore } from '../store/log';
import { handleSkill } from '../skill_utils';

export const Room: FC<{
  currentHoveredEntity: IEntity | null;
  setCurrentHoveredEntity: (enemy: IEntity | null) => void;
}> = ({ currentHoveredEntity, setCurrentHoveredEntity }) => {
  // For handling AOE skill effects
  const [isEffectZoneHovered, setIsEffectZoneHovered] = useState(false);
  const [effectZoneHovered, setEffectZoneHovered] = useState<
    [number, number] | null
  >(null);
  const targetZones = useRef<[number, number][]>([]); // saves the target zones (row, col) for AOE skills

  const {
    roomLength,
    roomTileMatrix,
    roomEntityPositions,
    setRoomEntityPositions,
    turnCycle,
    setTurnCycle,
    endTurn,
    isRoomOver,
    isGameOver,
    setIsGameOver,
    setIsRoomOver,
  } = useGameStateStore();
  const {
    getPlayer,
    getPlayerBaseAttackDamage,
    getPlayerTotalStrength,
    getPlayerTotalIntelligence,
    getPlayerTotalDefense,
    getPlayerLifestealMultiplier,
    setPlayer,
    setPlayerActionPoints,
    setPlayerState,
  } = usePlayerStore();
  const player = getPlayer();
  const playerBaseAttackDamage = getPlayerBaseAttackDamage();
  const playerTotalStrength = getPlayerTotalStrength();
  const playerTotalIntelligence = getPlayerTotalIntelligence();
  const playerLifestealMultiplier = getPlayerLifestealMultiplier();

  const { enemies, setEnemies, setEnemy } = useEnemyStore();

  const { addLog } = useLogStore();

  // Get player's position in the room matrix
  const playerPosition: [number, number] = useMemo(() => {
    if (roomEntityPositions) {
      const playerPos = getEntityPosition(player, roomEntityPositions);
      return playerPos;
    } else {
      console.error('Room entity positions not found!');
      return [-1, -1];
    }
  }, [player, roomEntityPositions]);

  // When an enemy is defeated (i.e. removed from the game),
  // remove it from the room matrix,
  // remove it from the turn cycle and,
  // check if the room is over and log a message if it is.
  useEffect(() => {
    console.log('updateEnemyPositionsWhenEnemyDefeated');

    // Update enemy positions when enemy is defeated
    const updateEnemyPositionsWhenEnemyDefeated = () => {
      // Delete enemy from room entity positions
      const newRoomEntityPositions = new Map<string, [ENTITY_TYPE, number]>(
        roomEntityPositions
      );

      newRoomEntityPositions.forEach((value, key) => {
        if (value[0] === ENTITY_TYPE.ENEMY) {
          const enemy = enemies.find((e) => e.id === value[1]);
          if (!enemy) {
            newRoomEntityPositions.delete(key);
          }
        }
      });

      setRoomEntityPositions(newRoomEntityPositions);
    };

    // Update turn cycle to remove defeated enemies
    const updateTurnCycleWhenEnemyDefeated = () => {
      if (turnCycle.length > 0) {
        const newTurnCycle = turnCycle.filter((entity) => {
          if (entity.entityType === ENTITY_TYPE.ENEMY) {
            const enemy = enemies.find((e) => e.id === entity.id);
            if (!enemy) {
              return false;
            }
          }
          return true;
        });

        // Update game store turn cycle
        setTurnCycle(newTurnCycle);
      }
    };

    // If all enemies are defeated, log a message saying the player has completed the room
    const logRoomCompletion = () => {
      if (enemies.length === 0) {
        addLog({
          message: (
            <span className="text-green-500">Player completed the room!</span>
          ),
          type: 'info',
        });
        setIsRoomOver(true);
        setPlayer({
          ...player,
          actionPoints: STARTING_ACTION_POINTS,
          skills: player.skills.map((skill) => ({
            ...skill,
            cooldownCounter: skill.cooldown,
          })),
          statuses: [],
        });
      }
    };

    // updateRoomMatrixWhenEnemyDefeated();
    updateEnemyPositionsWhenEnemyDefeated();
    updateTurnCycleWhenEnemyDefeated();
    logRoomCompletion();
  }, [enemies.length]);

  // When player's action points reach 0 and there are still enemies in the room (room is not over),
  // Automatically end player's turn
  useEffect(() => {
    console.log('automaticallyEndPlayerTurn');

    const automaticallyEndPlayerTurn = () => {
      if (player.actionPoints === 0 && !isRoomOver && enemies.length > 0) {
        handlePlayerEndTurn(turnCycle, getPlayer, setPlayer, endTurn);
        addLog({
          message: (
            <>
              <span className="text-green-500">{player.name}</span> ended their
              turn.
            </>
          ),
          type: 'info',
        });
      }
    };
    automaticallyEndPlayerTurn();
  }, [player.actionPoints, isRoomOver, enemies.length]);

  // When turn cycle changes,
  // Handle DoT effects,
  // Handle enemy turn (for now, move to a random adjacent tile and attack player if in range)
  useEffect(() => {
    console.log('handleDoT');

    // Handle DoT check first
    const handleDoT = () => {
      if (
        turnCycle.length > 0 &&
        turnCycle[0].entityType === ENTITY_TYPE.ENEMY &&
        isEnemy(turnCycle[0])
      ) {
        // Simulate enemy action with a timeout
        const enemy = enemies.find((e) => e.id === turnCycle[0].id);

        if (!enemy) {
          addLog({ message: 'Enemy not found!', type: 'error' });
          return;
        }

        const affectedEnemy = { ...enemy };

        const burnedDoT = affectedEnemy.statuses.find(
          (status) => status.id === STATUS_ID.BURNED
        );

        if (burnedDoT) {
          setTimeout(() => {
            const totalDamage = burnedDoT.effect.damageOverTime;

            affectedEnemy.health -= totalDamage;

            if (affectedEnemy.health <= 0) {
              addLog({
                message: (
                  <>
                    <span className="text-red-500">{affectedEnemy.name}</span>{' '}
                    took 1 damage from burn and has been defeated!
                  </>
                ),
                type: 'info',
              });
              setEnemies(enemies.filter((e) => e.id !== affectedEnemy.id));
            } else {
              addLog({
                message: (
                  <>
                    <span className="text-red-500">{affectedEnemy.name}</span>{' '}
                    took 1 damage from burn.
                  </>
                ),
                type: 'info',
              });

              const damagedEnemy = setEnemy(affectedEnemy);

              handleEnemyEndTurn(damagedEnemy);
            }
          }, 1000);
        } else {
          handleEnemyEndTurn(affectedEnemy);
        }
      } else if (
        turnCycle.length > 0 &&
        turnCycle[0].entityType === ENTITY_TYPE.PLAYER &&
        isPlayer(turnCycle[0])
      ) {
        const affectedPlayer = { ...player };

        const burnedDoT = affectedPlayer.statuses.find(
          (status) => status.id === STATUS_ID.BURNED
        );

        if (burnedDoT) {
          const totalDamage = burnedDoT.effect.damageOverTime;

          affectedPlayer.health -= totalDamage;

          if (affectedPlayer.health <= 0) {
            addLog({
              message: (
                <>
                  <span className="text-green-500">{affectedPlayer.name}</span>{' '}
                  took 1 damage from burn and has been defeated!
                </>
              ),
              type: 'info',
            });
          } else {
            addLog({
              message: (
                <>
                  <span className="text-green-500">{affectedPlayer.name}</span>{' '}
                  took 1 damage from burn.
                </>
              ),
              type: 'info',
            });
          }

          setPlayer(affectedPlayer);
        }
      }
    };

    // Handle enemy's action and end turn
    const handleEnemyEndTurn = (affectedEnemy: IEnemy) => {
      if (
        turnCycle.length > 0 &&
        turnCycle[0].entityType === ENTITY_TYPE.ENEMY &&
        isEnemy(turnCycle[0])
      ) {
        // Simulate enemy action with a timeout
        const enemy = enemies.find((e) => e.id === turnCycle[0].id);

        if (!enemy) {
          addLog({ message: 'Enemy not found!', type: 'error' });
          return;
        }

        // For now, end enemy's turn after moving once to a random adjacent tile and attacking the player if they are in range
        let totalTime = 0; // Total time for enemy's turn

        // Check if enemy has a status effect that prevents them from moving
        const cannotMove = enemy.statuses.some(
          (status) => status.effect.canMove === false
        );

        // Check if enemy has a status effect that prevents them from attacking
        const cannotAttack = enemy.statuses.some(
          (status) => status.effect.canAttack === false
        );

        let enemyPosition: [number, number] | undefined = getEntityPosition(
          enemy,
          roomEntityPositions
        );

        const moveTime = 1000;
        const attackTime = 1000;
        const endTurnTime = 2000;

        // Move enemy if they can move
        totalTime += moveTime;

        if (cannotMove && cannotAttack) {
          setTimeout(() => {
            addLog({
              message: (
                <>
                  <span className="text-red-500">{enemy.name}</span> is unable
                  to move or attack.
                </>
              ),
              type: 'info',
            });
          }, moveTime);
        } else {
          if (!cannotMove) {
            setTimeout(() => {
              enemyPosition = handleEnemyMovement(affectedEnemy);

              // Make enemy attack player if they can attack
              if (!cannotAttack) {
                totalTime += attackTime;

                setTimeout(() => {
                  if (!enemyPosition) {
                    console.error('Enemy position not found!');
                    const oldEnemyPos = getEntityPosition(
                      enemy,
                      roomEntityPositions
                    );
                    if (oldEnemyPos[0] === -1 && oldEnemyPos[1] === -1) {
                      console.error('Old enemy position not found!');
                      return;
                    }
                    handleEnemyAttack(
                      affectedEnemy,
                      oldEnemyPos,
                      playerPosition
                    );
                    return;
                  }
                  handleEnemyAttack(
                    affectedEnemy,
                    enemyPosition,
                    playerPosition
                  );
                }, attackTime);
              } else {
                setTimeout(() => {
                  addLog({
                    message: (
                      <>
                        <span className="text-red-500">{enemy.name}</span> is
                        unable to attack.
                      </>
                    ),
                    type: 'info',
                  });
                }, attackTime);
              }
            }, moveTime);
          } else {
            setTimeout(() => {
              addLog({
                message: (
                  <>
                    <span className="text-red-500">{enemy.name}</span> is unable
                    to move.
                  </>
                ),
                type: 'info',
              });

              // Make enemy attack player if they can attack
              if (!cannotAttack) {
                totalTime += attackTime;

                setTimeout(() => {
                  if (!enemyPosition) {
                    console.error('Enemy position not found!');
                    return;
                  }
                  handleEnemyAttack(
                    affectedEnemy,
                    enemyPosition,
                    playerPosition
                  );
                }, attackTime);
              } else {
                setTimeout(() => {
                  addLog({
                    message: (
                      <>
                        <span className="text-red-500">{enemy.name}</span> is
                        unable to attack.
                      </>
                    ),
                    type: 'info',
                  });
                }, attackTime);
              }
            }, moveTime);
          }
        }

        if (isGameOver) {
          return;
        }

        // End enemy's turn after moving and attacking (if they can)
        setTimeout(() => {
          // Decrease enemy's statuses' duration
          const decreasedStatuses = enemy.statuses.map((status) => {
            return {
              ...status,
              durationCounter: status.durationCounter - 1,
            };
          });

          // Filter out statuses with duration 0
          const filteredStatuses = decreasedStatuses.filter(
            (status) => status.durationCounter > 0
          );

          // Update enemy with new statuses
          const newEnemy = {
            ...affectedEnemy,
            statuses: filteredStatuses,
          };

          setEnemies(
            enemies.map((e) => {
              if (e.id === enemy.id) {
                return newEnemy;
              }
              return e;
            })
          );

          addLog({
            message: (
              <>
                <span className="text-red-500">{enemy.name}</span> ended their
                turn.
              </>
            ),
            type: 'info',
          });
          endTurn();
        }, totalTime + endTurnTime);
      }
    };

    if (!isGameOver) {
      handleDoT();
    }
  }, [turnCycle, turnCycle.length, isGameOver]);

  // Handle player defeat
  useEffect(() => {
    console.log('handlePlayerDefeat');

    const handlePlayerDefeat = () => {
      if (player.health <= 0) {
        addLog({
          message: (
            <>
              <span className="text-green-500">{player.name}</span> has been
              defeated!
            </>
          ),
          type: 'info',
        });
        // setPlayerDefeated(true);
      }
    };

    handlePlayerDefeat();
  }, [isGameOver, player.health, player.name, addLog]);

  // Handle player attacking an enemy
  const handleEnemyClick = (entityId: number | null) => {
    if (entityId === null) {
      return;
    }

    const enemy = enemies.find((enemy) => enemy.id === entityId);
    const newPlayer = { ...player };

    if (!enemy) {
      addLog({ message: 'Enemy not found!', type: 'error' });
      return;
    }

    const statusDamageBonus = player.statuses.reduce((acc, status) => {
      return acc + status.effect.damageBonus;
    }, 0);

    if (newPlayer.state.isAttacking) {
      if (!newPlayer.equipment.weapon) {
        addLog({ message: 'Player has no weapon equipped!', type: 'error' });
        return;
      }

      // Compute base attack damage based on the higher of player's strength or intelligence
      const totalDamage = playerBaseAttackDamage + statusDamageBonus;
      const newEnemy = { ...enemy };
      newEnemy.health = newEnemy.health - totalDamage;

      if (playerLifestealMultiplier > 0) {
        // Limit lifesteal to the enemy's remaining health
        const lifestealAmount = Math.round(
          (totalDamage > enemy.health ? enemy.health : totalDamage) *
            playerLifestealMultiplier
        );

        if (newPlayer.health + lifestealAmount > newPlayer.maxHealth) {
          newPlayer.health = newPlayer.maxHealth;
        } else {
          newPlayer.health += lifestealAmount;
        }
      }

      if (newEnemy.health <= 0) {
        setEnemies(enemies.filter((e) => e.id !== entityId));
        addLog({
          message: (
            <>
              <span className="text-red-500">{newEnemy.name}</span> took{' '}
              {totalDamage} damage and has been defeated!
            </>
          ),
          type: 'info',
        });
      } else {
        setEnemies(
          enemies.map((e) => {
            if (e.id === entityId) {
              return newEnemy;
            }
            return e;
          })
        );
        addLog({
          message: (
            <>
              <span className="text-red-500">{newEnemy.name}</span> took{' '}
              {totalDamage} damage.
            </>
          ),
          type: 'info',
        });
      }

      setPlayer({
        ...newPlayer,
        actionPoints: newPlayer.actionPoints - newPlayer.equipment.weapon.cost,
      });
    } else if (player.state.isUsingSkill && player.state.skillId) {
      const skill = player.skills.find(
        (skill) => skill.id === player.state.skillId
      );

      if (!skill) {
        addLog({ message: 'Skill not found!', type: 'error' });
        return;
      }

      let totalDamage = statusDamageBonus;
      let doesDamage = false;

      if (intelligenceBasedSkillIDs.includes(skill.id)) {
        totalDamage += Math.round(
          skill.damageMultiplier * playerTotalIntelligence
        );
      } else {
        totalDamage += Math.round(skill.damageMultiplier * playerTotalStrength);
      }

      const affectedEnemy = { ...enemy };
      const affectedPlayer = { ...player };

      switch (skill.id) {
        case SKILL_ID.GORGONS_GAZE: {
          // Petrify enemy
          const petrifedStatus = STATUSES.find(
            (s) => s.id === STATUS_ID.PETRIFIED
          );

          if (!petrifedStatus) {
            addLog({ message: 'Petrified status not found!', type: 'error' });
            return;
          }

          affectedEnemy.statuses = [...affectedEnemy.statuses, petrifedStatus];
          break;
        }
        case SKILL_ID.LIGHTNING: {
          // Deal damage to enemy
          affectedEnemy.health = affectedEnemy.health - totalDamage;

          if (playerLifestealMultiplier > 0) {
            // Limit lifesteal to the enemy's remaining health
            const lifestealAmount = Math.round(
              (totalDamage > affectedEnemy.health
                ? affectedEnemy.health
                : totalDamage) * playerLifestealMultiplier
            );

            if (
              affectedPlayer.health + lifestealAmount >
              affectedPlayer.maxHealth
            ) {
              affectedPlayer.health = affectedPlayer.maxHealth;
            } else {
              affectedPlayer.health += lifestealAmount;
            }
          }

          doesDamage = true;
          break;
        }
        case SKILL_ID.FREEZE: {
          // Petrify enemy
          const frozenStatus = STATUSES.find((s) => s.id === STATUS_ID.FROZEN);

          if (!frozenStatus) {
            addLog({ message: 'Frozen status not found!', type: 'error' });
            return;
          }

          affectedEnemy.statuses = [...affectedEnemy.statuses, frozenStatus];
          break;
        }
        case SKILL_ID.ABSORB: {
          // Absorb enemy's health
          const absorbedHealth = totalDamage;

          affectedEnemy.health = affectedEnemy.health - absorbedHealth;

          // Heal player with absorbed health
          if (player.health + absorbedHealth > player.maxHealth) {
            affectedPlayer.health = player.maxHealth;
          } else {
            affectedPlayer.health = affectedPlayer.health + absorbedHealth;
          }

          if (playerLifestealMultiplier > 0) {
            // Limit lifesteal to the enemy's remaining health
            const lifestealAmount = Math.round(
              (totalDamage > affectedEnemy.health
                ? affectedEnemy.health
                : totalDamage) * playerLifestealMultiplier
            );

            if (
              affectedPlayer.health + lifestealAmount >
              affectedPlayer.maxHealth
            ) {
              affectedPlayer.health = affectedPlayer.maxHealth;
            } else {
              affectedPlayer.health += lifestealAmount;
            }
          }

          doesDamage = true;
          break;
        }
        case SKILL_ID.EXECUTE: {
          const executeThreshold = Math.round(affectedEnemy.maxHealth * 0.25);

          if (affectedEnemy.health <= executeThreshold) {
            // For execute, damage multiplier is 2x player's strength when enemy health is less than 25%
            totalDamage =
              statusDamageBonus + Math.round(2 * playerTotalStrength);

            affectedEnemy.health = affectedEnemy.health - totalDamage;
          } else {
            affectedEnemy.health = affectedEnemy.health - totalDamage;
          }

          if (playerLifestealMultiplier > 0) {
            // Limit lifesteal to the enemy's remaining health
            const lifestealAmount = Math.round(
              (totalDamage > affectedEnemy.health
                ? affectedEnemy.health
                : totalDamage) * playerLifestealMultiplier
            );

            if (
              affectedPlayer.health + lifestealAmount >
              affectedPlayer.maxHealth
            ) {
              affectedPlayer.health = affectedPlayer.maxHealth;
            } else {
              affectedPlayer.health += lifestealAmount;
            }
          }

          if (affectedEnemy.health <= 0) {
            affectedPlayer.actionPoints += 2;
          }

          doesDamage = true;

          break;
        }
        case SKILL_ID.ANNIHILATE: {
          affectedEnemy.health = affectedEnemy.health - totalDamage;

          if (playerLifestealMultiplier > 0) {
            // Limit lifesteal to the enemy's remaining health
            const lifestealAmount = Math.round(
              (totalDamage > affectedEnemy.health
                ? affectedEnemy.health
                : totalDamage) * playerLifestealMultiplier
            );

            if (
              affectedPlayer.health + lifestealAmount >
              affectedPlayer.maxHealth
            ) {
              affectedPlayer.health = affectedPlayer.maxHealth;
            } else {
              affectedPlayer.health += lifestealAmount;
            }
          }

          doesDamage = true;

          break;
        }
        case SKILL_ID.WEAKEN: {
          // Weaken enemy
          const weakenedStatus = STATUSES.find(
            (s) => s.id === STATUS_ID.WEAKENED
          );

          if (!weakenedStatus) {
            addLog({ message: 'Weakened status not found!', type: 'error' });
            return;
          }

          affectedEnemy.statuses = [...affectedEnemy.statuses, weakenedStatus];
          break;
        }
        case SKILL_ID.DISABLE: {
          // Disable enemy
          const disabledStatus = STATUSES.find(
            (s) => s.id === STATUS_ID.DISABLED
          );

          if (!disabledStatus) {
            addLog({ message: 'Disabled status not found!', type: 'error' });
            return;
          }

          affectedEnemy.statuses = [...affectedEnemy.statuses, disabledStatus];
          break;
        }
        case SKILL_ID.ENTANGLE: {
          // Petrify enemy
          const entangleStatus = STATUSES.find(
            (s) => s.id === STATUS_ID.ENTANGLED
          );

          if (!entangleStatus) {
            addLog({ message: 'Entangled status not found!', type: 'error' });
            return;
          }

          affectedEnemy.statuses = [...affectedEnemy.statuses, entangleStatus];
          break;
        }
        default:
          break;
      }

      addLog({
        message: (
          <>
            <span className="text-green-500">{player.name}</span> used{' '}
            <span className="text-green-500">{skill.name}</span> on{' '}
            <span className="text-red-500">{enemy.name}</span>.
          </>
        ),
        type: 'info',
      });

      // Check if enemy is defeated
      if (doesDamage) {
        if (affectedEnemy.health <= 0) {
          setEnemies(enemies.filter((e) => e.id !== entityId));
          addLog({
            message: (
              <>
                <span className="text-red-500">{affectedEnemy.name}</span> took{' '}
                {totalDamage} damage and has been defeated!
              </>
            ),
            type: 'info',
          });
        } else {
          setEnemy(affectedEnemy);
          addLog({
            message: (
              <>
                <span className="text-red-500">{affectedEnemy.name}</span> took{' '}
                {totalDamage} damage.
              </>
            ),
            type: 'info',
          });
        }
      } else {
        // Update enemy with new statuses
        setEnemy(affectedEnemy);
      }

      // Decrease player's action points and set skill cooldown
      setPlayer({
        ...affectedPlayer,
        actionPoints: affectedPlayer.actionPoints - skill.cost,
        skills: affectedPlayer.skills.map((s) =>
          s.id === skill.id ? { ...s, cooldownCounter: s.cooldown } : s
        ),
      });
    }

    setPlayerState({
      ...player.state,
      isAttacking: false,
      isMoving: false,
      isUsingSkill: false,
    });
  };

  // Update room matrix when player moves
  // x = column, y = row
  const handlePlayerMove = (row: number, col: number) => {
    console.log('handlePlayerMove');

    // Update player's position in the entity positions map
    setRoomEntityPositions(
      updateRoomEntityPositions([row, col], playerPosition, roomEntityPositions)
    );

    addLog({
      message: (
        <>
          <span className="text-green-500">{player.name}</span> moved to tile (
          {col}, {row}).
        </>
      ),
      type: 'info',
    });
    if (!isRoomOver) {
      setPlayerActionPoints(player.actionPoints - 1);
    }
    setPlayerState({
      ...player.state,
      isMoving: false,
    });
  };

  // This function is called when player uses a a self targeted skill, e.g buffing themselves
  // Skills that affect enemies are handled in the handleEnemyClick function
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePlayerUseSkill = (skillId: number) => {
    console.log('handlePlayerUseSkill');

    const skill = player.skills.find((skill) => skill.id === skillId);

    if (!skill) {
      addLog({ message: 'Skill not found!', type: 'error' });
      return;
    }

    const newPlayer = {
      ...player,
    };

    if (!isPlayer(newPlayer)) {
      addLog({
        message: 'handlePlayerUseSkill: newPlayer not a valid player type',
        type: 'error',
      });
      return;
    }
    // skill: ISkill,
    // clickedTilePosition: [number, number],
    // player: IPlayer,
    // enemies: IEnemy[],
    // targetZones: [number, number][],
    // roomEntityPositions: Map<string, [ENTITY_TYPE, number]>

    // handleSkill(skill,  newPlayer, player, );

    // // Handle skill effect
    // switch (skill.id) {
    //   case SKILL_ID.FLEX: {
    //     const buffedStatus = STATUSES.find((s) => s.id === STATUS_ID.FLEXED);

    //     if (!buffedStatus) {
    //       addLog({ message: 'Buffed status not found!', type: 'error' });
    //       return;
    //     }

    //     newPlayer.statuses.push(buffedStatus);
    //     break;
    //   }
    //   case SKILL_ID.IRONFLESH: {
    //     const stoneSkinStatus = STATUSES.find(
    //       (s) => s.id === STATUS_ID.STONE_SKIN
    //     );

    //     if (!stoneSkinStatus) {
    //       addLog({ message: 'Stone Skin status not found!', type: 'error' });
    //       return;
    //     }

    //     newPlayer.statuses.push(stoneSkinStatus);
    //     break;
    //   }
    //   case SKILL_ID.BLOODLUST: {
    //     const bloodlustStatus = STATUSES.find(
    //       (s) => s.id === STATUS_ID.BLOODLUST
    //     );

    //     if (!bloodlustStatus) {
    //       addLog({ message: 'Bloodlust status not found!', type: 'error' });
    //       return;
    //     }

    //     newPlayer.statuses.push(bloodlustStatus);
    //     break;
    //   }
    //   case SKILL_ID.FOCUS: {
    //     const focusedStatus = STATUSES.find((s) => s.id === STATUS_ID.FOCUSED);

    //     if (!focusedStatus) {
    //       addLog({ message: 'Focused status not found!', type: 'error' });
    //       return;
    //     }

    //     newPlayer.statuses.push(focusedStatus);
    //     break;
    //   }
    //   case SKILL_ID.ENLIGHTEN: {
    //     const enlightenedStatus = STATUSES.find(
    //       (s) => s.id === STATUS_ID.ENLIGHTENED
    //     );

    //     if (!enlightenedStatus) {
    //       addLog({ message: 'Enlightened status not found!', type: 'error' });
    //       return;
    //     }

    //     newPlayer.statuses.push(enlightenedStatus);
    //     break;
    //   }
    //   default:
    //     break;
    // }

    // if (!newPlayer) {
    //   addLog({ message: 'Skill did not return anything!', type: 'error' });
    //   return;
    // }

    addLog({
      message: (
        <>
          <span className="text-green-500">{player.name}</span> used{' '}
          <span className="text-green-500">{skill.name}</span>.
        </>
      ),
      type: 'info',
    });
    setPlayer({
      ...newPlayer,
      state: {
        ...player.state,
        isUsingSkill: false,
      },
      actionPoints: player.actionPoints - skill.cost,
      skills: player.skills.map((s) =>
        s.id === skill.id ? { ...s, cooldownCounter: s.cooldown } : s
      ),
    });
  };

  // Function to handle player using an AOE skill
  // This function is called when player uses a skill that targets an area
  // Skills that affect enemies are handled in the handleEnemyClick function
  const handlePlayerUseAOESkill = (
    skillId: number,
    clickedTilePosition: [number, number]
  ) => {
    console.log('handlePlayerUseAOESkill');

    const skill = player.skills.find((skill) => skill.id === skillId);

    if (!skill) {
      addLog({ message: 'Skill not found!', type: 'error' });
      return;
    }

    addLog({
      message: (
        <>
          <span className="text-green-500">{player.name}</span> used{' '}
          <span className="text-green-500">{skill.name}</span>.
        </>
      ),
      type: 'info',
    });

    // Handle individual skill effect
    switch (skill.id) {
      case SKILL_ID.WHIRLWIND:
      case SKILL_ID.CLEAVE: {
        // Within target zones, deal damage to enemies

        // First find the enemies, then update them with the damage at the same time to avoid multiple renders
        const enemiesInTargetZones: IEnemy[] = [];
        targetZones.current.forEach(([row, col]) => {
          const entitiyIfExists = roomEntityPositions.get(`${row},${col}`);

          if (entitiyIfExists && entitiyIfExists[0] === ENTITY_TYPE.ENEMY) {
            const enemy = enemies.find((e) => e.id === entitiyIfExists[1]);
            if (!enemy) {
              addLog({ message: 'Enemy not found!', type: 'error' });
              return;
            }

            enemiesInTargetZones.push(enemy);
          }
        });

        // Update the enemies with the damage dealt

        if (player.equipment.weapon === null) {
          addLog({
            message: 'Player has no weapon equipped!',
            type: 'error',
          });
          return;
        }

        const statusDamageBonus = player.statuses.reduce((acc, status) => {
          return acc + status.effect.damageBonus;
        }, 0);

        // Calculate total damage dealt
        // Damage scaled based off player's strength stat
        const totalDamage =
          Math.round(skill.damageMultiplier * playerTotalStrength) +
          statusDamageBonus;

        // Create a new array of enemies with the damage dealt to be updated in the store
        const newEnemies = [...enemies];

        const newPlayer = { ...player };

        enemiesInTargetZones.forEach((enemy) => {
          // Find enemy index
          const enemyIndex = newEnemies.findIndex((e) => e.id === enemy.id);

          const newEnemy = { ...enemy };
          newEnemy.health -= totalDamage;

          if (playerLifestealMultiplier > 0) {
            // Limit lifesteal to the enemy's remaining health
            const lifestealAmount = Math.round(
              (totalDamage > enemy.health ? enemy.health : totalDamage) *
                playerLifestealMultiplier
            );

            if (newPlayer.health + lifestealAmount > newPlayer.maxHealth) {
              newPlayer.health = newPlayer.maxHealth;
            } else {
              newPlayer.health += lifestealAmount;
            }
          }

          // Check if enemy is defeated
          if (newEnemy.health <= 0) {
            addLog({
              message: (
                <>
                  <span className="text-red-500">{enemy.name}</span> took{' '}
                  {totalDamage} damage and has been defeated!
                </>
              ),
              type: 'info',
            });
            newEnemies.splice(enemyIndex, 1);
          } else {
            addLog({
              message: (
                <>
                  <span className="text-red-500">{enemy.name}</span> took{' '}
                  {totalDamage} damage.
                </>
              ),
              type: 'info',
            });
            newEnemies[enemyIndex] = newEnemy;
          }
        });

        setEnemies(newEnemies);
        setPlayer({
          ...newPlayer,
          state: {
            ...newPlayer.state,
            isUsingSkill: false,
          },
          actionPoints: newPlayer.actionPoints - skill.cost,
          skills: newPlayer.skills.map((s) =>
            s.id === skill.id ? { ...s, cooldownCounter: s.cooldown } : s
          ),
        });

        break;
      }
      case SKILL_ID.FIREBALL: {
        // Within target zones, deal damage to enemies

        // First find the enemies, then update them with the damage at the same time to avoid multiple renders
        const enemiesInTargetZones: IEnemy[] = [];
        const playerInTargetZones: IPlayer[] = [];

        targetZones.current.forEach(([row, col]) => {
          const entitiyIfExists = roomEntityPositions.get(`${row},${col}`);

          if (entitiyIfExists && entitiyIfExists[0] === ENTITY_TYPE.ENEMY) {
            const enemy = enemies.find((e) => e.id === entitiyIfExists[1]);
            if (!enemy) {
              addLog({ message: 'Enemy not found!', type: 'error' });
              return;
            }

            enemiesInTargetZones.push(enemy);
          } else if (
            entitiyIfExists &&
            entitiyIfExists[0] === ENTITY_TYPE.PLAYER
          ) {
            playerInTargetZones.push(player);
          }
        });

        // Update the enemies with the damage dealt

        if (player.equipment.weapon === null) {
          addLog({
            message: 'Player has no weapon equipped!',
            type: 'error',
          });
          return;
        }

        const statusDamageBonus = player.statuses.reduce((acc, status) => {
          return acc + status.effect.damageBonus;
        }, 0);

        const totalDamage =
          Math.round(skill.damageMultiplier * playerTotalIntelligence) +
          statusDamageBonus;

        // Create a new array of enemies with the damage dealt to be updated in the store
        const newEnemies = [...enemies];

        // Create a new player with the damage dealt to be updated in the store
        const newPlayer = { ...player };

        enemiesInTargetZones.forEach((enemy) => {
          // Find enemy index
          const enemyIndex = newEnemies.findIndex((e) => e.id === enemy.id);

          const newEnemy = { ...enemy };
          newEnemy.health -= totalDamage;

          if (playerLifestealMultiplier > 0) {
            // Limit lifesteal to the enemy's remaining health
            const lifestealAmount = Math.round(
              (totalDamage > enemy.health ? enemy.health : totalDamage) *
                playerLifestealMultiplier
            );

            if (newPlayer.health + lifestealAmount > newPlayer.maxHealth) {
              newPlayer.health = newPlayer.maxHealth;
            } else {
              newPlayer.health += lifestealAmount;
            }
          }

          const burnedStatus = STATUSES.find((s) => s.id === STATUS_ID.BURNED);

          if (!burnedStatus) {
            addLog({ message: 'Burned status not found!', type: 'error' });
            return;
          }

          // Only apply burn status if enemy is not already burned
          if (
            !newEnemy.statuses.some((status) => status.id === STATUS_ID.BURNED)
          ) {
            newEnemy.statuses.push(burnedStatus);
          }

          // Check if enemy is defeated
          if (newEnemy.health <= 0) {
            addLog({
              message: (
                <>
                  <span className="text-red-500">{enemy.name}</span> took{' '}
                  {totalDamage} damage and has been defeated!
                </>
              ),
              type: 'info',
            });
            newEnemies.splice(enemyIndex, 1);
          } else {
            addLog({
              message: (
                <>
                  <span className="text-red-500">{enemy.name}</span> took{' '}
                  {totalDamage} damage.
                </>
              ),
              type: 'info',
            });
            newEnemies[enemyIndex] = newEnemy;
          }
        });

        // Update player with the damage dealt if they are in the target zone

        if (playerInTargetZones.length > 0) {
          newPlayer.health -= totalDamage;

          const burnedStatus = STATUSES.find((s) => s.id === STATUS_ID.BURNED);

          if (!burnedStatus) {
            addLog({ message: 'Burned status not found!', type: 'error' });
            return;
          }

          // Only apply burn status if player is not burned
          if (
            !player.statuses.some((status) => status.id === STATUS_ID.BURNED)
          ) {
            player.statuses.push(burnedStatus);
          }

          if (newPlayer.health <= 0) {
            addLog({
              message: (
                <>
                  <span className="text-green-500">{player.name}</span> took{' '}
                  {totalDamage} damage and has been defeated!
                </>
              ),
              type: 'info',
            });
          } else {
            addLog({
              message: (
                <>
                  <span className="text-green-500">{player.name}</span> took{' '}
                  {totalDamage} damage.
                </>
              ),
              type: 'info',
            });
          }
        }

        setEnemies(newEnemies);
        setPlayer({
          ...newPlayer,
          state: {
            ...newPlayer.state,
            isUsingSkill: false,
          },
          actionPoints: newPlayer.actionPoints - skill.cost,
          skills: newPlayer.skills.map((s) =>
            s.id === skill.id ? { ...s, cooldownCounter: s.cooldown } : s
          ),
        });

        break;
      }
      case SKILL_ID.WARCRY: {
        // Add either Battle Fury I, II, or III status to player depending on how many enemies are hit in the target zone
        const battleFuryI = STATUSES.find(
          (s) => s.id === STATUS_ID.BATTLE_FURY_1
        );
        const battleFuryII = STATUSES.find(
          (s) => s.id === STATUS_ID.BATTLE_FURY_2
        );
        const battleFuryIII = STATUSES.find(
          (s) => s.id === STATUS_ID.BATTLE_FURY_3
        );

        if (!battleFuryI || !battleFuryII || !battleFuryIII) {
          addLog({ message: 'Battle Fury status not found!', type: 'error' });
          return;
        }

        // First find the enemies, then update them with the damage at the same time to avoid multiple renders
        const enemiesInTargetZones: IEnemy[] = [];
        targetZones.current.forEach(([row, col]) => {
          const entitiyIfExists = roomEntityPositions.get(`${row},${col}`);

          if (entitiyIfExists && entitiyIfExists[0] === ENTITY_TYPE.ENEMY) {
            const enemy = enemies.find((e) => e.id === entitiyIfExists[1]);
            if (!enemy) {
              addLog({ message: 'Enemy not found!', type: 'error' });
              return;
            }

            enemiesInTargetZones.push(enemy);
          }
        });

        // Create a new player with the status effect to be updated in the store
        const newPlayer = { ...player };

        if (enemiesInTargetZones.length === 1) {
          newPlayer.statuses.push(battleFuryI);
        } else if (
          enemiesInTargetZones.length === 2 ||
          enemiesInTargetZones.length === 3
        ) {
          newPlayer.statuses.push(battleFuryII);
        } else if (enemiesInTargetZones.length >= 4) {
          newPlayer.statuses.push(battleFuryIII);
        }

        addLog({
          message: (
            <>
              <span className="text-green-500">{player.name}</span> used{' '}
              <span className="text-green-500">{skill.name}</span>.
            </>
          ),
          type: 'info',
        });

        setPlayer({
          ...newPlayer,
          state: {
            ...player.state,
            isUsingSkill: false,
          },
          actionPoints: player.actionPoints - skill.cost,
          skills: player.skills.map((s) =>
            s.id === skill.id ? { ...s, cooldownCounter: s.cooldown } : s
          ),
        });

        break;
      }
      case SKILL_ID.LEAP_SLAM: {
        // Within target zones, deal damage to enemies

        // First find the enemies, then update them with the damage at the same time to avoid multiple renders
        const enemiesInTargetZones: IEnemy[] = [];
        targetZones.current.forEach(([row, col]) => {
          const entitiyIfExists = roomEntityPositions.get(`${row},${col}`);

          if (entitiyIfExists && entitiyIfExists[0] === ENTITY_TYPE.ENEMY) {
            const enemy = enemies.find((e) => e.id === entitiyIfExists[1]);
            if (!enemy) {
              addLog({ message: 'Enemy not found!', type: 'error' });
              return;
            }

            enemiesInTargetZones.push(enemy);
          }
        });

        // Update the enemies with the damage dealt

        if (player.equipment.weapon === null) {
          addLog({
            message: 'Player has no weapon equipped!',
            type: 'error',
          });
          return;
        }

        const statusDamageBonus = player.statuses.reduce((acc, status) => {
          return acc + status.effect.damageBonus;
        }, 0);

        // Calculate total damage dealt
        // Damage scaled based off player's strength stat
        const totalDamage =
          Math.round(skill.damageMultiplier * playerTotalStrength) +
          statusDamageBonus;

        // Create a new array of enemies with the damage dealt to be updated in the store
        const newEnemies = [...enemies];

        const newPlayer = { ...player };

        enemiesInTargetZones.forEach((enemy) => {
          // Find enemy index
          const enemyIndex = newEnemies.findIndex((e) => e.id === enemy.id);

          const newEnemy = { ...enemy };
          newEnemy.health -= totalDamage;

          if (playerLifestealMultiplier > 0) {
            // Limit lifesteal to the enemy's remaining health
            const lifestealAmount = Math.round(
              (totalDamage > enemy.health ? enemy.health : totalDamage) *
                playerLifestealMultiplier
            );

            if (newPlayer.health + lifestealAmount > newPlayer.maxHealth) {
              newPlayer.health = newPlayer.maxHealth;
            } else {
              newPlayer.health += lifestealAmount;
            }
          }

          // Check if enemy is defeated
          if (newEnemy.health <= 0) {
            addLog({
              message: (
                <>
                  <span className="text-red-500">{enemy.name}</span> took{' '}
                  {totalDamage} damage and has been defeated!
                </>
              ),
              type: 'info',
            });
            newEnemies.splice(enemyIndex, 1);
          } else {
            addLog({
              message: (
                <>
                  <span className="text-red-500">{enemy.name}</span> took{' '}
                  {totalDamage} damage.
                </>
              ),
              type: 'info',
            });
            newEnemies[enemyIndex] = newEnemy;
          }
        });

        setRoomEntityPositions(
          updateRoomEntityPositions(
            clickedTilePosition,
            playerPosition,
            roomEntityPositions
          )
        );

        setEnemies(newEnemies);
        setPlayer({
          ...newPlayer,
          state: {
            ...newPlayer.state,
            isUsingSkill: false,
          },
          actionPoints: newPlayer.actionPoints - skill.cost,
          skills: newPlayer.skills.map((s) =>
            s.id === skill.id ? { ...s, cooldownCounter: s.cooldown } : s
          ),
        });
        break;
      }
      case SKILL_ID.FLAME_DIVE: {
        // Within target zones not including the middle tile, deal damage to enemies

        // First find the enemies, then update them with the damage at the same time to avoid multiple renders
        const enemiesInTargetZones: IEnemy[] = [];
        targetZones.current.forEach(([row, col]) => {
          const entitiyIfExists = roomEntityPositions.get(`${row},${col}`);

          if (entitiyIfExists && entitiyIfExists[0] === ENTITY_TYPE.ENEMY) {
            const enemy = enemies.find((e) => e.id === entitiyIfExists[1]);
            if (!enemy) {
              addLog({ message: 'Enemy not found!', type: 'error' });
              return;
            }

            enemiesInTargetZones.push(enemy);
          }
        });

        // Update the enemies with the damage dealt

        if (player.equipment.weapon === null) {
          addLog({
            message: 'Player has no weapon equipped!',
            type: 'error',
          });
          return;
        }

        const statusDamageBonus = player.statuses.reduce((acc, status) => {
          return acc + status.effect.damageBonus;
        }, 0);

        // Calculate total damage dealt
        // Damage scaled based off player's strength stat
        const totalDamage =
          Math.round(skill.damageMultiplier * playerTotalStrength) +
          statusDamageBonus;

        // Create a new array of enemies with the damage dealt to be updated in the store
        const newEnemies = [...enemies];

        const newPlayer = { ...player };

        enemiesInTargetZones.forEach((enemy) => {
          // Find enemy index
          const enemyIndex = newEnemies.findIndex((e) => e.id === enemy.id);

          const newEnemy = { ...enemy };
          newEnemy.health -= totalDamage;

          if (playerLifestealMultiplier > 0) {
            // Limit lifesteal to the enemy's remaining health
            const lifestealAmount = Math.round(
              (totalDamage > enemy.health ? enemy.health : totalDamage) *
                playerLifestealMultiplier
            );

            if (newPlayer.health + lifestealAmount > newPlayer.maxHealth) {
              newPlayer.health = newPlayer.maxHealth;
            } else {
              newPlayer.health += lifestealAmount;
            }
          }

          // Apply burn status to enemy
          const burnedStatus = STATUSES.find((s) => s.id === STATUS_ID.BURNED);

          if (!burnedStatus) {
            addLog({ message: 'Burned status not found!', type: 'error' });
            return;
          }

          // Only apply burn status if enemy is not already burned
          if (
            !newEnemy.statuses.some((status) => status.id === STATUS_ID.BURNED)
          ) {
            newEnemy.statuses.push(burnedStatus);
          }

          // Check if enemy is defeated
          if (newEnemy.health <= 0) {
            addLog({
              message: (
                <>
                  <span className="text-red-500">{enemy.name}</span> took{' '}
                  {totalDamage} damage and has been defeated!
                </>
              ),
              type: 'info',
            });
            newEnemies.splice(enemyIndex, 1);
          } else {
            addLog({
              message: (
                <>
                  <span className="text-red-500">{enemy.name}</span> took{' '}
                  {totalDamage} damage.
                </>
              ),
              type: 'info',
            });
            newEnemies[enemyIndex] = newEnemy;
          }
        });

        setRoomEntityPositions(
          updateRoomEntityPositions(
            clickedTilePosition,
            playerPosition,
            roomEntityPositions
          )
        );
        setEnemies(newEnemies);
        setPlayer({
          ...newPlayer,
          state: {
            ...newPlayer.state,
            isUsingSkill: false,
          },
          actionPoints: newPlayer.actionPoints - skill.cost,
          skills: newPlayer.skills.map((s) =>
            s.id === skill.id ? { ...s, cooldownCounter: s.cooldown } : s
          ),
        });

        break;
      }
      default:
        break;
    }
  };

  // This function is called when player uses a skill that targets an empty tile
  // Skills that affect enemies are handled in the handleEnemyClick function
  const handleEmptyTileClick = (skillId: number, row: number, col: number) => {
    console.log('handleEmptyTileClick');

    const skill = player.skills.find((skill) => skill.id === skillId);

    if (!skill) {
      addLog({ message: 'Skill not found!', type: 'error' });
      return;
    }

    const newPlayer = {
      ...player,
    };

    // Handle skill effect
    switch (skill.id) {
      case SKILL_ID.FLY: {
        // Teleport player to empty tile
        // Set player's position in the entity positions map
        setRoomEntityPositions(
          updateRoomEntityPositions(
            [row, col],
            playerPosition,
            roomEntityPositions
          )
        );
        break;
      }
      default:
        break;
    }

    if (!newPlayer) {
      addLog({ message: 'Skill did not return anything!', type: 'error' });
      return;
    }

    if (!isPlayer(newPlayer)) {
      addLog({ message: 'Skill effect did not return player', type: 'error' });
      return;
    }

    setPlayer({
      ...newPlayer,
      actionPoints: player.actionPoints - skill.cost,
      skills: player.skills.map((s) =>
        s.id === skill.id ? { ...s, cooldownCounter: s.cooldown } : s
      ),
    });
    if (skill.id === SKILL_ID.FLY) {
      addLog({
        message: (
          <>
            <span className="text-green-500">{player.name}</span> used{' '}
            <span className="text-green-500">{skill.name}</span> to fly to tile
            ({col}, {row}).
          </>
        ),
        type: 'info',
      });
    } else {
      addLog({
        message: (
          <>
            <span className="text-green-500">{player.name}</span> used{' '}
            <span className="text-green-500">{skill.name}</span>.
          </>
        ),
        type: 'info',
      });
    }
    setPlayerState({
      ...player.state,
      isUsingSkill: false,
    });
  };

  // Handle enemy movement (naive)
  // For now, just move the enemy to a random adjacent tile
  const handleEnemyMovement = (enemy: IEnemy): [number, number] | undefined => {
    console.log('handleEnemyMovement');

    const [enemyRow, enemyCol] = getEntityPosition(enemy, roomEntityPositions);

    if (enemyRow === -1 || enemyCol === -1) {
      addLog({ message: 'Enemy not found in room matrix!', type: 'error' });
      return;
    }

    const possibleMoves: [number, number][] = [
      [enemyRow - 1, enemyCol], // Up
      [enemyRow + 1, enemyCol], // Down
      [enemyRow, enemyCol - 1], // Left
      [enemyRow, enemyCol + 1], // Right
    ];

    const randomMove = possibleMoves[Math.floor(Math.random() * 4)];

    // Check if random move is outside bounds (ie. outside the room matrix bounds and not an empty tile) and also if it doesnt have another entity
    // If so, do nothing
    if (
      randomMove[0] < 0 ||
      randomMove[0] >= roomLength ||
      randomMove[1] < 0 ||
      randomMove[1] >= roomLength ||
      roomTileMatrix[randomMove[0]][randomMove[1]][0] !== TILE_TYPE.EMPTY ||
      roomEntityPositions.get(`${randomMove[0]},${randomMove[1]}`)
    ) {
      // Do nothing if random move is out of bounds or not an empty tile
      return;
    }

    // Update room matrix to move enemy to random adjacent tile
    if (randomMove[0] >= 0 && randomMove[0] < roomLength) {
      if (randomMove[1] >= 0 && randomMove[1] < roomLength) {
        setRoomEntityPositions(
          updateRoomEntityPositions(
            randomMove,
            [enemyRow, enemyCol],
            roomEntityPositions
          )
        );

        addLog({
          message: (
            <>
              <span className="text-red-500">{enemy.name}</span> moved to tile (
              {randomMove[1]}, {randomMove[0]}).
            </>
          ),
          type: 'info',
        });
      }
    }

    return randomMove;
  };

  // Handle enemy attack (naive)
  // For now, just attack the player if they are in range
  const handleEnemyAttack = (
    enemy: IEnemy,
    enemyPosition: [number, number],
    playerPosition: [number, number]
  ) => {
    console.log('handleEnemyAttack');

    const [enemyRow, enemyCol] = enemyPosition;
    const [playerRow, playerCol] = playerPosition;

    if (!enemyRow || !enemyCol || !playerRow || !playerCol) {
      addLog({ message: 'Enemy or player position not found!', type: 'error' });
      return;
    }

    const canAttackPlayer =
      Math.abs(playerRow - enemyRow) <= enemy.range &&
      Math.abs(playerCol - enemyCol) <= enemy.range;

    if (canAttackPlayer) {
      const baseDamage = enemy.damage;

      const statusDamageBonus = enemy.statuses.reduce((acc, status) => {
        return acc + status.effect.damageBonus;
      }, 0);

      const damageMultiplier = enemy.statuses.reduce((acc, status) => {
        if (status.effect.damageMultiplier === 0) return acc;

        if (status.effect.damageMultiplier > 1) {
          return acc + (status.effect.damageMultiplier - 1);
        } else {
          return acc - (1 - status.effect.damageMultiplier);
        }
      }, 1);

      const playerTotalDefense = getPlayerTotalDefense();

      let totalDamage =
        Math.round((baseDamage + statusDamageBonus) * damageMultiplier) -
        playerTotalDefense;

      if (totalDamage <= 0) totalDamage = 0;

      const playerHealth = player.health - totalDamage;

      if (playerHealth <= 0) {
        addLog({
          message: (
            <>
              <span className="text-red-500">{enemy.name}</span> attacked{' '}
              <span className="text-green-500">{player.name}</span> for{' '}
              {totalDamage} damage and defeated them!
            </>
          ),
          type: 'info',
        });
        setPlayer({
          ...player,
          health: 0,
        });
        setIsGameOver(true);
      } else {
        setPlayer({
          ...player,
          health: player.health - totalDamage,
        });

        addLog({
          message: (
            <>
              <span className="text-red-500">{enemy.name}</span> attacked{' '}
              <span className="text-green-500">{player.name}</span> for{' '}
              {totalDamage} damage.
            </>
          ),
          type: 'info',
        });
      }
    }
  };

  return (
    <div
      style={{
        width: roomLength * TILE_SIZE,
        height: roomLength * TILE_SIZE,
        display: 'grid',
        gridTemplateColumns: `repeat(${roomLength}, ${TILE_SIZE}px)`,
        gridTemplateRows: `repeat(${roomLength}, ${TILE_SIZE}px)`,
      }}
    >
      {roomTileMatrix.map((row, rowIndex) => {
        return row.map(([tileType], columnIndex) => {
          // Parse tile type to entity type
          const entityIfExists = roomEntityPositions.get(
            `${rowIndex},${columnIndex}`
          );

          let entityType: ENTITY_TYPE | null = null;
          let entityId: number | null = null;

          if (entityIfExists) {
            entityType = entityIfExists[0];
            entityId = entityIfExists[1];
          }

          // Check if tile is active (i.e. it's the entity's turn)
          let active: boolean = false;
          if (
            (entityType !== null &&
              turnCycle[0] !== null &&
              turnCycle[0].entityType === entityType &&
              turnCycle[0].id === entityId) ||
            (currentHoveredEntity?.entityType === entityType &&
              currentHoveredEntity?.id === entityId)
          ) {
            active = true;
          }

          // Check if tile is an effect zone
          let isEffectZone: boolean = false;
          let isTargetZone: boolean = false;
          if (!playerPosition) {
            addLog({ message: 'Player position not found!', type: 'error' });
            return;
          }

          const [playerRow, playerCol] = playerPosition;

          // Check if player is attacking (basic attack)
          // Highlight tiles that can be attacked by player based on weapon range
          if (player.state.isAttacking && player.equipment.weapon) {
            const range = player.equipment.weapon.range;

            if (
              rowIndex >= playerRow - range &&
              rowIndex <= playerRow + range &&
              columnIndex >= playerCol - range &&
              columnIndex <= playerCol + range
            ) {
              isEffectZone = true;
            }
          }

          // Check if player is moving (move state)
          // Highlight tiles that can be moved to by player (5x5 area around player not including wall or door tiles).
          // If room is over, then the player can move anywhere in the room.
          if (player.state.isMoving) {
            if (isRoomOver) {
              isEffectZone = true;
            } else {
              if (
                rowIndex >= playerRow - 2 &&
                rowIndex <= playerRow + 2 &&
                columnIndex >= playerCol - 2 &&
                columnIndex <= playerCol + 2
              ) {
                isEffectZone = true;
              }
            }
          }

          // Check if player is using a skill (isUsingSkill state)
          // Highlight tiles that can be affected by player's skill
          if (player.state.isUsingSkill && player.state.skillId) {
            const skill = player.skills.find(
              (skill) => skill.id === player.state.skillId
            );

            if (!skill) {
              console.error('Skill not found!');
            } else {
              // Check skill type
              if (skill.skillType === SKILL_TYPE.SELF) {
                // If skill is self-targeted, highlight player's tile
                if (rowIndex === playerRow && columnIndex === playerCol) {
                  isEffectZone = true;
                }
              } else if (skill.skillType === SKILL_TYPE.ST) {
                // If skill is single target, highlight tiles that can be affected by the skill
                let range = skill.range;

                // Check for weapon (range) dependent skills
                if (weaponBasedSkillIDs.includes(skill.id)) {
                  if (player.equipment.weapon) {
                    if (
                      player.equipment.weapon.attackType ===
                      WEAPON_ATTACK_TYPE.MELEE
                    ) {
                      range = player.equipment.weapon.range;
                    }
                  }
                }

                // Check for the specific skill's effect zone
                switch (skill.id) {
                  case SKILL_ID.FLY:
                    // For fly, player can target any empty tile that does not have an entity
                    if (
                      tileType === TILE_TYPE.EMPTY &&
                      !entityIfExists &&
                      rowIndex >= playerRow - range &&
                      rowIndex <= playerRow + range &&
                      columnIndex >= playerCol - range &&
                      columnIndex <= playerCol + range &&
                      !(rowIndex === playerRow && columnIndex === playerCol)
                    ) {
                      isEffectZone = true;
                    }
                    break;
                  default:
                    if (
                      rowIndex >= playerRow - range &&
                      rowIndex <= playerRow + range &&
                      columnIndex >= playerCol - range &&
                      columnIndex <= playerCol + range &&
                      !(rowIndex === playerRow && columnIndex === playerCol)
                    ) {
                      isEffectZone = true;
                    }
                    break;
                }
              } else if (skill.skillType === SKILL_TYPE.AOE) {
                // If skill is AOE, highlight tiles that can be affected by the skill
                // For AOE skills, there are effect zones (which are how far the skill can reach) and target zones (defined above, which are the tiles that are affected by the skill's effect)

                // Compute effect zone based on skill range
                let range = skill.range;

                const weapon = player.equipment.weapon;

                // Range for weapon dependent skills
                if (weapon) {
                  if (weaponBasedSkillIDs.includes(skill.id)) {
                    range = weapon.range;
                  }
                }

                if (
                  rowIndex >= playerRow - range &&
                  rowIndex <= playerRow + range &&
                  columnIndex >= playerCol - range &&
                  columnIndex <= playerCol + range &&
                  (!(rowIndex === playerRow && columnIndex === playerCol) ||
                    skill.id === SKILL_ID.FIREBALL) // For fireball, player can target themselves
                ) {
                  isEffectZone = true;
                }

                // Compute target zone based on the specific skill requirement
                switch (skill.id) {
                  case SKILL_ID.WHIRLWIND:
                  case SKILL_ID.WARCRY: {
                    if (isEffectZone && isEffectZoneHovered) {
                      // Add tiles to target zone to use to compute the effect of the skill

                      const currentTargetZones = targetZones.current;

                      // Check if tile is in target zone
                      let isTileInTargetZone = false;
                      currentTargetZones.forEach(([row, col]) => {
                        if (row === rowIndex && col === columnIndex) {
                          isTileInTargetZone = true;
                        }
                      });

                      if (!isTileInTargetZone) {
                        currentTargetZones.push([rowIndex, columnIndex]);
                        targetZones.current = currentTargetZones;
                      }

                      // For whirlwind, the target zone is the same as the effect zone
                      isTargetZone = true;
                    }
                    break;
                  }
                  case SKILL_ID.FIREBALL: {
                    // For fireball, the target zone is a 3x3 area around the hovered effect zone tile so it could go beyond the effect zone
                    if (isEffectZoneHovered) {
                      // Add tiles to target zone to use to compute the effect of the skill

                      // For fireball, the target zone is a 3x3 area around the hovered effect zone tile
                      if (
                        effectZoneHovered &&
                        rowIndex >= effectZoneHovered[0] - 1 &&
                        rowIndex <= effectZoneHovered[0] + 1 &&
                        columnIndex >= effectZoneHovered[1] - 1 &&
                        columnIndex <= effectZoneHovered[1] + 1
                      ) {
                        const currentTargetZones = targetZones.current;

                        // Check if tile is in target zone
                        const isTileInTargetZone = currentTargetZones.some(
                          ([row, col]) => {
                            return row === rowIndex && col === columnIndex;
                          }
                        );

                        if (!isTileInTargetZone) {
                          currentTargetZones.push([rowIndex, columnIndex]);
                          targetZones.current = currentTargetZones;
                        }

                        isTargetZone = true;
                      }
                    }
                    break;
                  }
                  case SKILL_ID.CLEAVE: {
                    if (isEffectZone && isEffectZoneHovered) {
                      // Add tiles to target zone to use to compute the effect of the skill

                      const currentTargetZones = targetZones.current;

                      // Check if tile is in target zone
                      let isTileInTargetZone = false;
                      currentTargetZones.forEach(([row, col]) => {
                        if (row === rowIndex && col === columnIndex) {
                          isTileInTargetZone = true;
                        }
                      });

                      if (!isTileInTargetZone) {
                        currentTargetZones.push([rowIndex, columnIndex]);
                        targetZones.current = currentTargetZones;
                      }

                      // For cleave, the target zone is in the area in front of the player, depending on the direction of the effect zone hovered
                      if (!effectZoneHovered) {
                        console.error('Effect zone hovered not found!');
                        return;
                      }

                      // Handle north, south, east, west directions
                      // Handle north direction
                      if (effectZoneHovered[0] < playerRow) {
                        if (rowIndex < playerRow) {
                          isTargetZone = true;
                        }
                      } else if (effectZoneHovered[0] > playerRow) {
                        if (rowIndex > playerRow) {
                          isTargetZone = true;
                        }
                      } else if (effectZoneHovered[1] < playerCol) {
                        if (columnIndex < playerCol) {
                          isTargetZone = true;
                        }
                      } else if (effectZoneHovered[1] > playerCol) {
                        if (columnIndex > playerCol) {
                          isTargetZone = true;
                        }
                      }
                    }
                    break;
                  }
                  case SKILL_ID.LEAP_SLAM:
                  case SKILL_ID.FLAME_DIVE: {
                    // For leap slam and flame dive, the target zone is a 3x3 area around the hovered effect zone tile so it could go beyond the effect zone
                    if (isEffectZoneHovered) {
                      // Add tiles to target zone to use to compute the effect of the skill

                      console.log('Effect zone hovered', effectZoneHovered);
                      // For leap slam and flame dive, the target zone is a 3x3 area around the hovered effect zone tile not including the hovered tile
                      if (
                        effectZoneHovered &&
                        rowIndex >= effectZoneHovered[0] - 1 &&
                        rowIndex <= effectZoneHovered[0] + 1 &&
                        columnIndex >= effectZoneHovered[1] - 1 &&
                        columnIndex <= effectZoneHovered[1] + 1
                        // !(
                        //   rowIndex === effectZoneHovered[0] &&
                        //   columnIndex === effectZoneHovered[1]
                        // )
                      ) {
                        const currentTargetZones = targetZones.current;

                        // Check if tile is in target zone
                        const isTileInTargetZone = currentTargetZones.some(
                          ([row, col]) => {
                            return row === rowIndex && col === columnIndex;
                          }
                        );

                        if (!isTileInTargetZone) {
                          currentTargetZones.push([rowIndex, columnIndex]);
                          targetZones.current = currentTargetZones;
                        }

                        isTargetZone = true;
                      }
                    }
                    break;
                  }
                  default:
                    break;
                }
              }
            }
          }

          return (
            <Tile
              tileType={tileType}
              entityIfExist={roomEntityPositions.get(
                `${rowIndex},${columnIndex}`
              )}
              key={`${rowIndex}-${columnIndex}`}
              playerState={player.state}
              active={active}
              isEffectZone={isEffectZone}
              isRoomOver={isRoomOver}
              isTargetZone={isTargetZone}
              onClick={() => {
                console.log(
                  'Tile clicked',
                  [rowIndex, columnIndex],
                  entityIfExists,
                  tileType,
                  player.state.isUsingSkill,
                  player.state.skillId
                );
                if (isEffectZone) {
                  if (
                    player.state.isAttacking &&
                    entityIfExists &&
                    entityIfExists[0] === ENTITY_TYPE.ENEMY
                  ) {
                    handleEnemyClick(entityId);
                  } else if (
                    player.state.isMoving &&
                    !entityIfExists &&
                    tileType !== TILE_TYPE.WALL &&
                    tileType !== TILE_TYPE.DOOR
                  ) {
                    handlePlayerMove(rowIndex, columnIndex);
                  } else if (
                    player.state.isMoving &&
                    tileType === TILE_TYPE.DOOR &&
                    isRoomOver
                  ) {
                    addLog({
                      message: 'Player moved to the next room!',
                      type: 'info',
                    });
                    // TODO: Reset room and generate new room matrix
                  } else if (
                    player.state.isUsingSkill &&
                    player.state.skillId
                  ) {
                    // Check tile clicked
                    // If skill is an AOE, then check if the tile is in the target zone
                    if (isTargetZone) {
                      // Check AOE skills that shouldn't target the middle tile AKA middle tile should not have an entity
                      if (
                        [SKILL_ID.LEAP_SLAM, SKILL_ID.FLAME_DIVE].includes(
                          player.state.skillId
                        ) &&
                        entityIfExists
                      ) {
                        return;
                      }
                      handlePlayerUseAOESkill(player.state.skillId, [
                        rowIndex,
                        columnIndex,
                      ]);
                    } else if (
                      entityIfExists &&
                      entityIfExists[0] === ENTITY_TYPE.PLAYER
                    ) {
                      // Skills that targets the player
                      // handlePlayerUseSkill(player.state.skillId);

                      const skill = player.skills.find(
                        (skill) => skill.id === player.state.skillId
                      );

                      if (!skill) {
                        addLog({ message: 'Skill not found!', type: 'error' });
                        return;
                      }

                      if (!isPlayer(player)) {
                        addLog({
                          message: 'onClick: player not a valid player type',
                          type: 'error',
                        });
                        return;
                      }

                      console.log(
                        'pre handleSkill',
                        player,
                        enemies,
                        roomEntityPositions
                      );

                      const { newPlayer, newEnemies, newRoomEntityPositions } =
                        handleSkill(
                          skill,
                          [rowIndex, columnIndex],
                          player,
                          enemies,
                          targetZones.current,
                          roomEntityPositions,
                          addLog
                        );

                      console.log(
                        'post handleSkill',
                        newPlayer,
                        newEnemies,
                        newRoomEntityPositions
                      );

                      setPlayer({
                        ...newPlayer,
                        state: {
                          ...player.state,
                          isUsingSkill: false,
                        },
                        actionPoints: player.actionPoints - skill.cost,
                        skills: player.skills.map((s) =>
                          s.id === skill.id
                            ? { ...s, cooldownCounter: s.cooldown }
                            : s
                        ),
                      });
                    } else if (
                      entityIfExists &&
                      entityIfExists[0] === ENTITY_TYPE.ENEMY
                    ) {
                      // Skills that targets a singular enemy
                      handleEnemyClick(entityId);
                    } else if (
                      tileType === TILE_TYPE.EMPTY &&
                      !entityIfExists
                    ) {
                      // Skills that uses the empty tile
                      handleEmptyTileClick(
                        player.state.skillId,
                        rowIndex,
                        columnIndex
                      );
                    }
                  }
                }
              }}
              onMouseEnter={() => {
                if (
                  isEffectZone &&
                  tileType !== TILE_TYPE.WALL &&
                  tileType !== TILE_TYPE.DOOR
                ) {
                  // Set isEffectZoneHovered to true when mouse enters effect zone
                  setIsEffectZoneHovered(true);

                  // Set target zones for skills that require them
                  setEffectZoneHovered([rowIndex, columnIndex]);
                }

                if (entityIfExists && entityIfExists[0] === ENTITY_TYPE.ENEMY) {
                  // Set currentHoveredEntity to the enemy when mouse enters enemy tile
                  const enemy = enemies.find((enemy) => enemy.id === entityId);
                  if (!enemy) {
                    console.error('Enemy not found!');
                    return;
                  }

                  setCurrentHoveredEntity(enemy);
                } else if (
                  entityIfExists &&
                  entityIfExists[0] === ENTITY_TYPE.PLAYER
                ) {
                  // Set currentHoveredEntity to the player when mouse enters player tile
                  setCurrentHoveredEntity(player);
                }
              }}
              onMouseLeave={() => {
                if (isEffectZone) {
                  // Set isEffectZoneHovered to true when mouse leaves effect zone
                  // and reset saved target zones and effect zone hovered
                  setIsEffectZoneHovered(false);
                  targetZones.current = [];
                  setEffectZoneHovered(null);
                }

                if (entityIfExists) {
                  // Set currentHoveredEntity to null when mouse leaves enemy or player tile
                  setCurrentHoveredEntity(null);
                }
              }}
            />
          );
        });
      })}
    </div>
  );
};
