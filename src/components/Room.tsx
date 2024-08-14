import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Tile } from './Tile';
import { ENTITY_TYPE, STARTING_ACTION_POINTS } from '../constants/entity';
import { DOORS, FLOORS, TILE_SIZE, TILE_TYPE, WALLS } from '../constants/tile';
import {
  aoeSkillIDs,
  selfTargetedSkillIDs,
  singleTargetSkillIDs,
  SKILL_ID,
  SKILL_TYPE,
  weaponBasedSkillIDs,
} from '../constants/skill';
import { STATUS_ID } from '../constants/status';
import { WEAPON_ATTACK_TYPE } from '../constants/weapon';
import { IEnemy, IEntity } from '../types';
import { useGameStateStore } from '../store/game';
import { usePlayerStore } from '../store/player';
import { useEnemyStore } from '../store/enemy';
import {
  damageEntity,
  displayStatusEffect,
  getEntityPosition,
  getPlayerTotalDefense,
  handlePlayerEndTurn,
  healEntity,
  isEnemy,
  isPlayer,
  updateRoomEntityPositions,
} from '../utils';
import { useLogStore } from '../store/log';
import { handleSkill } from '../skill_utils';
import { SPRITE_ID } from '../constants/sprite';
import {
  findPathsFromCurrentLocation,
  getApCostForPath,
} from '../utils/pathfinding';

export const Room: FC<{
  currentHoveredEntity: IEntity | null;
  setCurrentHoveredEntity: (enemy: IEntity | null) => void;
}> = ({ currentHoveredEntity, setCurrentHoveredEntity }) => {
  // For handling AOE skill effects
  const [isEffectZoneHovered, setIsEffectZoneHovered] = useState(false);
  const [effectZoneHovered, setEffectZoneHovered] = useState<
    [number, number] | null
  >(null);

  // For handling player movement
  const [playerMovementPath, setPlayerMovementPath] = useState<
    [number, number][]
  >([]);

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
    playerMovementAPCost,
    setPlayerMovementAPCost,
    getPlayer,
    getPlayerBaseAttackDamage,
    getPlayerLifestealMultiplier,
    setPlayer,
    setPlayerActionPoints,
    setPlayerState,
  } = usePlayerStore();
  const player = getPlayer();
  const playerBaseAttackDamage = getPlayerBaseAttackDamage();
  const playerLifestealMultiplier = getPlayerLifestealMultiplier();

  const { enemies, setEnemies, setEnemy } = useEnemyStore();

  const { addLog } = useLogStore();

  // When player movement path changes,
  // Handle player movement
  useEffect(() => {
    // When player finishes moving, set player's animation back to idle
    const playerSpriteSheetContainer = document.getElementById(
      `spritesheet_container_${player.entityType}_${player.id}`
    );

    if (!playerSpriteSheetContainer) {
      console.error('Player spritesheet container not found!');
      return;
    }

    const handlePlayerPathMovement = () => {
      console.log('handlePlayerMovement');
      if (playerMovementPath.length > 0) {
        const [row, col] = playerMovementPath[0];

        // Update player walking animation direction based on movement path
        if (col < playerPosition[1]) {
          playerSpriteSheetContainer.classList.remove(
            'animate-entityAnimate08'
          );
          playerSpriteSheetContainer.classList.remove(
            'animate-entityAnimateLeft08'
          );
          playerSpriteSheetContainer.style.left = player.sprite_size + 'px';
          playerSpriteSheetContainer.classList.add(
            'animate-entityAnimateLeft08'
          );
        } else {
          playerSpriteSheetContainer.classList.remove(
            'animate-entityAnimate08'
          );
          playerSpriteSheetContainer.classList.remove(
            'animate-entityAnimateLeft08'
          );
          playerSpriteSheetContainer.style.left = '0px';
          playerSpriteSheetContainer.classList.add('animate-entityAnimate08');
        }

        // Update player's position in the entity positions map
        setRoomEntityPositions(
          updateRoomEntityPositions(
            [row, col],
            playerPosition,
            roomEntityPositions
          )
        );

        addLog({
          message: (
            <>
              <span className="text-green-500">{player.name}</span> moved to
              tile ({col}, {row})
            </>
          ),
          type: 'info',
        });

        // Delete the first element in the path array
        setTimeout(() => {
          setPlayerMovementPath(playerMovementPath.slice(1));
        }, 500);
      } else {
        // Remove walking animation and set player back to idle depending on direction (left or right)
        playerSpriteSheetContainer.style.top = '0px';
        if (
          playerSpriteSheetContainer.classList.contains(
            'animate-entityAnimateLeft08'
          )
        ) {
          playerSpriteSheetContainer.classList.remove(
            'animate-entityAnimateLeft08'
          );
          playerSpriteSheetContainer.style.left = player.sprite_size + 'px';
          playerSpriteSheetContainer.classList.add(
            'animate-entityAnimateLeft20'
          );
        } else {
          playerSpriteSheetContainer.classList.remove(
            'animate-entityAnimate08'
          );
          playerSpriteSheetContainer.style.left = '0px';
          playerSpriteSheetContainer.classList.add('animate-entityAnimate20');
        }
      }
    };

    handlePlayerPathMovement();
  }, [playerMovementPath.length]);

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
      if (
        player.actionPoints === 0 &&
        playerMovementPath.length === 0 &&
        !isRoomOver &&
        enemies.length > 0
      ) {
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
  }, [
    player.actionPoints,
    playerMovementPath.length,
    isRoomOver,
    enemies.length,
  ]);

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

            affectedEnemy.health = damageEntity(
              affectedEnemy,
              totalDamage,
              `tile_${enemy.entityType}_${enemy.id}`
            );

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

              handleEnemyTurn(damagedEnemy);
            }
          }, 1000);
        } else {
          handleEnemyTurn(affectedEnemy);
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

          affectedPlayer.health = damageEntity(
            affectedPlayer,
            totalDamage,
            `tile_${player.entityType}_${player.id}`
          );
          // affectedPlayer.health -= totalDamage;

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
    const handleEnemyTurn = (affectedEnemy: IEnemy) => {
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

              // Remove walking animation and set enemy back to idle depending on direction (left or right)
              setTimeout(() => {
                const enemySpriteSheetContainer = document.getElementById(
                  `spritesheet_container_${enemy.entityType}_${enemy.id}`
                );
                if (!enemySpriteSheetContainer) {
                  console.error('Enemy spritesheet container not found!');
                  return;
                }

                enemySpriteSheetContainer.style.top = '0px';
              }, 500);

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
          const filteredStatuses = decreasedStatuses.filter((status) => {
            if (status.durationCounter <= 0) {
              displayStatusEffect(
                status,
                false,
                `tile_${enemy.entityType}_${enemy.id}`
              );
              return false;
            }
            return true;
          });

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

  // Get player's available movement possibilities (based on player's action points)
  const playerMovementPossibilities: [
    Map<string, [number, number][]>,
    Map<string, number>,
  ] = useMemo(() => {
    // console.log('playerMovementPossibilities');
    const movementPossibilities = findPathsFromCurrentLocation(
      playerPosition,
      roomTileMatrix,
      player.actionPoints,
      roomEntityPositions
    );

    const apCostForMovementPossibilities = getApCostForPath(
      movementPossibilities
    );

    return [movementPossibilities, apCostForMovementPossibilities];
  }, [player.actionPoints, playerPosition, roomTileMatrix.length]);

  // Handle player attacking an enemy
  const handleEnemyClick = (entityId: number | null) => {
    console.log('handleEnemyClick');

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
      newEnemy.health = damageEntity(
        newEnemy,
        totalDamage,
        `tile_${enemy.entityType}_${enemy.id}`
      );
      // newEnemy.health = newEnemy.health - totalDamage;

      if (playerLifestealMultiplier > 0) {
        // Limit lifesteal to the enemy's remaining health
        let lifestealAmount = Math.round(
          (totalDamage > enemy.health ? enemy.health : totalDamage) *
            playerLifestealMultiplier
        );

        if (newPlayer.health + lifestealAmount > newPlayer.maxHealth) {
          lifestealAmount = newPlayer.maxHealth - newPlayer.health;
        }

        newPlayer.health = healEntity(
          newPlayer,
          lifestealAmount,
          `tile_${player.entityType}_${player.id}`
        );
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

    // Do nothing if player is already in the tile they are trying to move to
    if (playerPosition[0] === row && playerPosition[1] === col) {
      return;
    }

    if (playerMovementPossibilities[0].size === 0) {
      addLog({
        message: 'No available movement possibilities!',
        type: 'error',
      });
      return;
    }

    const path = playerMovementPossibilities[0].get(`${row},${col}`);

    if (!path) {
      addLog({ message: 'Invalid movement!', type: 'error' });
      return;
    }

    // Set player animation to walking animation

    // Get spritesheet container
    const playerSpriteSheetContainer = document.getElementById(
      `spritesheet_container_${player.entityType}_${player.id}`
    );

    if (!playerSpriteSheetContainer) {
      console.error('Player spritesheet container not found!');
      return;
    }

    // console.log('playerSpriteSheetContainer', playerSpriteSheetContainer);

    // Set player animation to walking by increasing animtions sprite x axis change speed and shifting position downwards on the spritesheet
    playerSpriteSheetContainer.classList.remove('animate-entityAnimate20');
    playerSpriteSheetContainer.classList.remove('animate-entityAnimateLeft20');

    playerSpriteSheetContainer.style.top = '-' + player.sprite_size + 'px';

    setPlayerMovementPath(path);
    setPlayerState({
      ...player.state,
      isMoving: false,
    });

    setPlayerActionPoints(player.actionPoints - playerMovementAPCost);
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
      roomTileMatrix[randomMove[0]][randomMove[1]][0] !== TILE_TYPE.FLOOR ||
      roomEntityPositions.get(`${randomMove[0]},${randomMove[1]}`)
    ) {
      // Do nothing if random move is out of bounds or not an empty tile
      return;
    }

    // Change class of enemy sprite to animate movement
    const enemySpriteSheetContainer = document.getElementById(
      `spritesheet_container_${enemy.entityType}_${enemy.id}`
    );

    if (!enemySpriteSheetContainer) {
      console.error('Enemy spritesheet container not found!');
      return;
    }

    // Update enemy walking animation direction based on movement path
    if (randomMove[1] < enemyCol) {
      enemySpriteSheetContainer.classList.remove('animate-entityAnimate08');
      enemySpriteSheetContainer.classList.remove('animate-entityAnimateLeft08');
      enemySpriteSheetContainer.classList.add('animate-entityAnimateLeft08');
    } else {
      enemySpriteSheetContainer.classList.remove('animate-entityAnimate08');
      enemySpriteSheetContainer.classList.remove('animate-entityAnimateLeft08');
      enemySpriteSheetContainer.classList.add('animate-entityAnimate08');
    }

    // Change spritesheet position to animate movement
    enemySpriteSheetContainer.style.top = '-' + enemy.sprite_size + 'px';

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

      const playerTotalDefense = getPlayerTotalDefense(player);

      // If player has 10 DEF, then player takes 10% less damage
      const playerDamageTakenMultiplier = 1 - playerTotalDefense / 100;

      let totalDamage = Math.round(
        (baseDamage + statusDamageBonus) *
          damageMultiplier *
          playerDamageTakenMultiplier
      );

      if (totalDamage <= 0) totalDamage = 0;

      const playerHealth = damageEntity(
        player,
        totalDamage,
        `tile_${player.entityType}_${player.id}`
      );

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
        display: 'grid',
        gridTemplateColumns: `repeat(${roomLength}, ${TILE_SIZE}px)`,
        gridTemplateRows: `repeat(${roomLength}, ${TILE_SIZE}px)`,
      }}
    >
      {roomTileMatrix.map((row, rowIndex) => {
        return row.map(([tileType, tileID], columnIndex) => {
          let sprite: SPRITE_ID | null | undefined = null;

          switch (tileType) {
            case TILE_TYPE.FLOOR:
              sprite = FLOORS.find((floor) => floor.id === tileID)?.sprite;
              break;
            case TILE_TYPE.WALL:
              sprite = WALLS.find((wall) => wall.id === tileID)?.sprite;
              break;
            case TILE_TYPE.DOOR:
              sprite = DOORS.find((door) => door.id === tileID)?.sprite;
              break;
            case TILE_TYPE.NULL:
              sprite = null;
              break;
            default:
              break;
          }

          // Render closed door sprite when room is not over
          if ([397, 366].includes(tileID) && !isRoomOver) {
            switch (tileID) {
              case 397: // Get closed door
                sprite = DOORS.find((door) => door.id === 282)?.sprite;
                break;
              case 366:
                sprite = WALLS.find((door) => door.id === 253)?.sprite;
                break;
              default:
                break;
            }
          }

          if (sprite === undefined) {
            console.error('Sprite not found!', sprite, tileType, tileID);
            return null;
          }

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
            entityType !== null &&
            turnCycle[0] !== null &&
            turnCycle[0].entityType === entityType &&
            turnCycle[0].id === entityId
          ) {
            active = true;
          }

          // Check if tile (entity) is hovered
          let hovered: boolean = false;
          if (
            currentHoveredEntity?.entityType === entityType &&
            currentHoveredEntity?.id === entityId
          ) {
            hovered = true;
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
          // Excluding wall and door tiles and floor tiles that have entities on them
          // If room is over, then the player can move anywhere in the room.
          if (player.state.isMoving) {
            if (isRoomOver) {
              isEffectZone = true;
            } else {
              const possibleMove = playerMovementPossibilities[0].get(
                `${rowIndex},${columnIndex}`
              );

              if (possibleMove) {
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
                    // For movement skills like fly, leap slam, and flame dive, player can target any empty tile that does not have an entity
                    // Leap Slam and Flame Dive handled in the AOE case
                    if (
                      tileType === TILE_TYPE.FLOOR &&
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

                // Determine if tile is in effect zone
                switch (skill.id) {
                  case SKILL_ID.FIREBALL:
                    if (
                      rowIndex >= playerRow - range &&
                      rowIndex <= playerRow + range &&
                      columnIndex >= playerCol - range &&
                      columnIndex <= playerCol + range
                    ) {
                      isEffectZone = true;
                    }
                    break;
                  case SKILL_ID.LEAP_SLAM:
                  case SKILL_ID.FLAME_DIVE:
                    if (
                      tileType === TILE_TYPE.FLOOR &&
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
                      !(rowIndex === playerRow && columnIndex === playerCol) // For fireball, player can target themselves
                    ) {
                      isEffectZone = true;
                    }
                    break;
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

                      // console.log('Effect zone hovered', effectZoneHovered);
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
              hovered={hovered}
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

                // If room is over, player can move to any valid tile (floor, door)
                if (isRoomOver) {
                  if (tileType === TILE_TYPE.DOOR) {
                    addLog({
                      message: (
                        <>
                          <span className="text-green-500">{player.name}</span>{' '}
                          moved to the next room.
                        </>
                      ),
                      type: 'info',
                    });
                  } else if (tileType === TILE_TYPE.FLOOR) {
                    handlePlayerMove(rowIndex, columnIndex);
                  }

                  return;
                }

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
                    player.state.isUsingSkill &&
                    player.state.skillId
                  ) {
                    // Check tile clicked
                    // Defensive programming: Check if the tile clicked is valid for the specific skill. Prevents player from using skills on invalid tiles.
                    let isValid = false;

                    if (selfTargetedSkillIDs.includes(player.state.skillId)) {
                      // Check for self targeted skills
                      if (rowIndex === playerRow && columnIndex === playerCol) {
                        isValid = true;
                      }
                    } else if (
                      singleTargetSkillIDs.includes(player.state.skillId)
                    ) {
                      // Check for self targeted skills
                      if (
                        entityIfExists &&
                        entityIfExists[0] === ENTITY_TYPE.ENEMY
                      ) {
                        // Check if tile has an enemy
                        isValid = true;
                      }
                    } else if (aoeSkillIDs.includes(player.state.skillId)) {
                      // Check for AOE skills
                      if (isTargetZone) {
                        // Check if tile is in the target zone
                        if (
                          [SKILL_ID.LEAP_SLAM, SKILL_ID.FLAME_DIVE].includes(
                            player.state.skillId
                          ) &&
                          entityIfExists
                        ) {
                          // For the above skills, check if the clicked tile is not an entity
                          return;
                        } else {
                          isValid = true;
                        }
                      }
                    } else {
                      // Default to true for movement skills
                      isValid = true;
                    }

                    // If tile-skill click is not valid, do nothing.
                    // else handle skill effect
                    if (isValid === false) {
                      return;
                    }

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

                    setRoomEntityPositions(newRoomEntityPositions);
                    setEnemies([...newEnemies]);
                    setPlayer({
                      ...newPlayer,
                      state: {
                        ...newPlayer.state,
                        isUsingSkill: false,
                      },
                      actionPoints: newPlayer.actionPoints - skill.cost,
                      skills: newPlayer.skills.map((s) =>
                        s.id === skill.id
                          ? { ...s, cooldownCounter: s.cooldown }
                          : s
                      ),
                    });
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

                // Update ap cost for movement possibilities
                if (player.state.isMoving) {
                  const APCost = playerMovementPossibilities[1].get(
                    `${rowIndex},${columnIndex}`
                  );
                  if (APCost !== undefined) {
                    // console.log(APCost);
                    setPlayerMovementAPCost(APCost);
                  }
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
