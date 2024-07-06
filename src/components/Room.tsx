import { FC, useEffect, useMemo, useState } from "react";
import { Tile } from "./Tile";
import {
  ENTITY_TYPE,
  ROOM_LENGTH,
  SKILL_TYPE,
  STARTING_ACTION_POINTS,
  TILE_SIZE,
  TILE_TYPE,
} from "../constants";
import { IEnemy, IEntity } from "../types";
import { useGameStateStore } from "../store/game";
import { usePlayerStore } from "../store/player";
import { useEnemyStore } from "../store/enemy";
import {
  generateRoomMatrix,
  getEntityPosition,
  handlePlayerEndTurn,
  isEnemy,
  isPlayer,
} from "../utils";
import { useLogStore } from "../store/log";

export const Room: FC<{
  currentHoveredEntity: IEntity | null;
  setCurrentHoveredEntity: (enemy: IEntity | null) => void;
}> = ({ currentHoveredEntity, setCurrentHoveredEntity }) => {
  const [roomMatrix, setRoomMatrix] = useState<[TILE_TYPE, number][][]>(
    generateRoomMatrix(ROOM_LENGTH)
  );

  const { turnCycle, setTurnCycle, endTurn, isRoomOver, setIsRoomOver } =
    useGameStateStore();
  const { getPlayer, setPlayer, setPlayerActionPoints, setPlayerState } =
    usePlayerStore();
  const player = getPlayer();

  const { enemies, setEnemies } = useEnemyStore();

  const { addLog } = useLogStore();

  // Get player's position in the room matrix
  const playerPosition = useMemo(() => {
    return getEntityPosition(player, roomMatrix);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomMatrix]);

  // When an enemy is defeated (i.e. removed from the game),
  // remove it from the room matrix,
  // remove it from the turn cycle and,
  // check if the room is over and log a message if it is.
  useEffect(() => {
    // Update room matrix to remove defeated enemy tiles
    const updateRoomMatrixWhenEnemyDefeated = () => {
      setRoomMatrix((prevRoomMatrix) => {
        return prevRoomMatrix.map((row) => {
          return row.map(([tileType, id]) => {
            if (tileType === TILE_TYPE.ENEMY) {
              const enemy = enemies.find((enemy) => enemy.id === id);
              if (!enemy) {
                return [TILE_TYPE.EMPTY, 0];
              }
            }
            return [tileType, id];
          });
        });
      });
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
          type: "info",
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

    updateRoomMatrixWhenEnemyDefeated();
    updateTurnCycleWhenEnemyDefeated();
    logRoomCompletion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enemies.length]);

  // When player's action points reach 0 and there are still enemies in the room (room is not over),
  // Automatically end player's turn
  useEffect(() => {
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
          type: "info",
        });
      }
    };
    automaticallyEndPlayerTurn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.actionPoints, isRoomOver, enemies.length]);

  // When turn cycle changes,
  // Handle enemy turn (for now, just end their turn after a timeout)
  useEffect(() => {
    // Handle enemy's action and end turn
    const handleEnemyEndTurn = () => {
      if (
        turnCycle.length > 0 &&
        turnCycle[0].entityType === ENTITY_TYPE.ENEMY &&
        isEnemy(turnCycle[0])
      ) {
        // Simulate enemy action with a timeout
        const enemy = enemies.find((e) => e.id === turnCycle[0].id);

        if (!enemy) {
          addLog({ message: "Enemy not found!", type: "error" });
          return;
        }

        let totalTime = 0;

        // For now, end enemy's turn after moving once to a random adjacent tile and attacking the player if they are in range

        // Check if enemy has a status effect that prevents them from moving
        const cannotMove = enemy.statuses.find(
          (status) => status.effect.canMove === false
        );

        // Move enemy if they can move
        totalTime += 1500;
        if (!cannotMove) {
          setTimeout(() => {
            handleEnemyMovement(enemy);
          }, totalTime);
        } else {
          setTimeout(() => {
            addLog({
              message: (
                <>
                  <span className="text-red-500">{enemy.name}</span> is unable
                  to move.
                </>
              ),
              type: "info",
            });
          }, totalTime);
        }

        // Check if enemy is in range to attack player
        const [playerRow, playerCol] = playerPosition;
        const [enemyRow, enemyCol] = getEntityPosition(enemy, roomMatrix);

        const canAttackPlayer =
          Math.abs(playerRow - enemyRow) <= enemy.range &&
          Math.abs(playerCol - enemyCol) <= enemy.range;

        // Attack player if they are in enemy's range
        if (canAttackPlayer) {
          totalTime += 1500;
          setTimeout(() => {
            const baseDamage = enemy.damage;

            const statusDamageBonus = enemy.statuses.reduce((acc, status) => {
              return acc + status.effect.damageBonus;
            }, 0);

            const totalDamage = baseDamage + statusDamageBonus;

            setPlayer({
              ...player,
              health: player.health - totalDamage,
            });

            addLog({
              message: (
                <>
                  <span className="text-red-500">{enemy.name}</span> attacked{" "}
                  <span className="text-green-500">{player.name}</span> for{" "}
                  {totalDamage} damage.
                </>
              ),
              type: "info",
            });
          }, totalTime);
        }

        // End enemy's turn after moving and attacking (if they can)
        setTimeout(() => {
          addLog({
            message: (
              <>
                <span className="text-red-500">{enemy.name}</span> ended their
                turn.
              </>
            ),
            type: "info",
          });
          endTurn();
        }, totalTime + 1000);
      }
    };
    handleEnemyEndTurn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turnCycle, turnCycle.length]);

  // Handle player attacking an enemy
  const handleEnemyClick = (id: number) => {
    const enemy = enemies.find((enemy) => enemy.id === id);

    if (!enemy) {
      addLog({ message: "Enemy not found!", type: "error" });
      return;
    }

    if (player.state.isAttacking) {
      if (!player.equipment.weapon) {
        addLog({ message: "Player has no weapon equipped!", type: "error" });
        return;
      }

      const weaponDamage = player.equipment.weapon.damage;

      const statusDamageBonus = player.statuses.reduce((acc, status) => {
        return acc + status.effect.damageBonus;
      }, 0);

      const totalDamage = weaponDamage + statusDamageBonus;

      enemy.health = enemy.health - totalDamage;

      if (enemy.health <= 0) {
        setEnemies(enemies.filter((e) => e.id !== id));
        addLog({
          message: (
            <>
              <span className="text-red-500">{enemy.name}</span> took{" "}
              {totalDamage} damage and has been defeated!
            </>
          ),
          type: "info",
        });
      } else {
        setEnemies(
          enemies.map((e) => {
            if (e.id === id) {
              return enemy;
            }
            return e;
          })
        );
        addLog({
          message: (
            <>
              <span className="text-red-500">{enemy.name}</span> took{" "}
              {totalDamage} damage.
            </>
          ),
          type: "info",
        });
      }
      setPlayerActionPoints(player.actionPoints - player.equipment.weapon.cost);
    } else if (player.state.isUsingSkill && player.state.skillId) {
      const skill = player.skills.find(
        (skill) => skill.id === player.state.skillId
      );

      if (!skill) {
        addLog({ message: "Skill not found!", type: "error" });
        return;
      }

      const affectedEnemy = skill.effect(enemy);

      if (!affectedEnemy) {
        addLog({ message: "Skill did not return anything!", type: "error" });
        return;
      }

      if (!isEnemy(affectedEnemy)) {
        addLog({ message: "Skill effect did not return enemy", type: "error" });
        return;
      }

      setEnemies(
        enemies.map((e) => {
          if (e.id === id) {
            return affectedEnemy;
          }
          return e;
        })
      );
      addLog({
        message: (
          <>
            <span className="text-green-500">{player.name}</span> used{" "}
            <span className="text-green-500">{skill.name}</span> on{" "}
            <span className="text-red-500">{enemy.name}</span>.
          </>
        ),
        type: "info",
      });
      setPlayer({
        ...player,
        actionPoints: player.actionPoints - skill.cost,
        skills: player.skills.map((s) =>
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
  const handlePlayerMove = (x: number, y: number) => {
    setRoomMatrix((prevRoomMatrix) => {
      const [playerRow, playerCol] = playerPosition;
      const newRoomMatrix: [TILE_TYPE, number][][] = prevRoomMatrix.map(
        (row, rowIndex) => {
          return row.map(([tileType, id], columnIndex) => {
            if (rowIndex === playerRow && columnIndex === playerCol) {
              // Set player's current tile to empty
              return [TILE_TYPE.EMPTY, 0];
            } else if (rowIndex === y && columnIndex === x) {
              // Set player's new tile to player
              return [TILE_TYPE.PLAYER, player.id];
            }
            return [tileType, id];
          });
        }
      );
      return newRoomMatrix;
    });
    addLog({
      message: (
        <>
          <span className="text-green-500">{player.name}</span> moved to tile (
          {x}, {y}).
        </>
      ),
      type: "info",
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
  const handlePlayerUseSkill = (skillId: number) => {
    const skill = player.skills.find((skill) => skill.id === skillId);

    if (!skill) {
      addLog({ message: "Skill not found!", type: "error" });
      return;
    }

    const newPlayer = skill.effect(player);

    if (!newPlayer) {
      addLog({ message: "Skill did not return anything!", type: "error" });
      return;
    }

    if (!isPlayer(newPlayer)) {
      addLog({ message: "Skill effect did not return player", type: "error" });
      return;
    }

    setPlayer({
      ...newPlayer,
      actionPoints: player.actionPoints - skill.cost,
      skills: player.skills.map((s) =>
        s.id === skill.id ? { ...s, cooldownCounter: s.cooldown } : s
      ),
    });
    addLog({
      message: (
        <>
          <span className="text-green-500">{player.name}</span> used{" "}
          <span className="text-green-500">{skill.name}</span>.
        </>
      ),
      type: "info",
    });
    setPlayerState({
      ...player.state,
      isUsingSkill: false,
    });
  };

  // Handle enemy movement (naive)
  // For now, just move the enemy to a random adjacent tile
  const handleEnemyMovement = (enemy: IEnemy) => {
    const [enemyRow, enemyCol] = roomMatrix.reduce(
      (acc, row, rowIndex) => {
        const colIndex = row.findIndex(([tileType, id]) => {
          if (tileType === TILE_TYPE.ENEMY && id === enemy.id) {
            return true;
          }
          return false;
        });
        if (colIndex !== -1) {
          return [rowIndex, colIndex];
        }
        return acc;
      },
      [-1, -1]
    );

    if (enemyRow === -1 || enemyCol === -1) {
      addLog({ message: "Enemy not found in room matrix!", type: "error" });
      return;
    }

    const possibleMoves = [
      [enemyRow - 1, enemyCol], // Up
      [enemyRow + 1, enemyCol], // Down
      [enemyRow, enemyCol - 1], // Left
      [enemyRow, enemyCol + 1], // Right
    ];

    let randomMove = possibleMoves[Math.floor(Math.random() * 4)];

    console.log(enemy, [enemyRow, enemyCol], randomMove);

    // Check if random move is outside bounds (ie. outside the room matrix bounds and not an empty tile)
    // If so, do nothing
    if (
      randomMove[0] < 0 ||
      randomMove[0] >= ROOM_LENGTH ||
      randomMove[1] < 0 ||
      randomMove[1] >= ROOM_LENGTH ||
      roomMatrix[randomMove[0]][randomMove[1]][0] !== TILE_TYPE.EMPTY
    ) {
      // Do nothing if random move is out of bounds or not an empty tile
      randomMove = [enemyRow, enemyCol];
      return;
    }

    // Update room matrix to move enemy to random adjacent tile
    if (randomMove[0] >= 0 && randomMove[0] < ROOM_LENGTH) {
      if (randomMove[1] >= 0 && randomMove[1] < ROOM_LENGTH) {
        setRoomMatrix((prevRoomMatrix) => {
          const newRoomMatrix: [TILE_TYPE, number][][] = prevRoomMatrix.map(
            (row, rowIndex) => {
              return row.map(([tileType, id], columnIndex) => {
                if (rowIndex === enemyRow && columnIndex === enemyCol) {
                  return [TILE_TYPE.EMPTY, 0];
                } else if (
                  rowIndex === randomMove[0] &&
                  columnIndex === randomMove[1]
                ) {
                  return [TILE_TYPE.ENEMY, enemy.id];
                }
                return [tileType, id];
              });
            }
          );
          return newRoomMatrix;
        });
        addLog({
          message: (
            <>
              <span className="text-red-500">{enemy.name}</span> moved to tile (
              {randomMove[1]}, {randomMove[0]}).
            </>
          ),
          type: "info",
        });
      }
    }
  };

  return (
    <div
      style={{
        width: ROOM_LENGTH * TILE_SIZE,
        height: ROOM_LENGTH * TILE_SIZE,
        display: "grid",
        gridTemplateColumns: `repeat(${ROOM_LENGTH}, ${TILE_SIZE}px)`,
        gridTemplateRows: `repeat(${ROOM_LENGTH}, ${TILE_SIZE}px)`,
      }}
    >
      {roomMatrix.map((row, rowIndex) => {
        return row.map(([tileType, id], columnIndex) => {
          // Parse tile type to entity type
          let entityType: ENTITY_TYPE | null;
          if (tileType === TILE_TYPE.PLAYER) {
            entityType = ENTITY_TYPE.PLAYER;
          } else if (tileType === TILE_TYPE.ENEMY) {
            entityType = ENTITY_TYPE.ENEMY;
          } else {
            entityType = null;
          }

          // Check if tile is active (i.e. it's the entity's turn)
          let active: boolean = false;
          if (
            (entityType !== null &&
              turnCycle[0] !== null &&
              turnCycle[0].entityType === entityType &&
              turnCycle[0].id === id) ||
            (currentHoveredEntity?.entityType === entityType &&
              currentHoveredEntity?.id === id)
          ) {
            active = true;
          }

          let isEffectZone: boolean = false;
          const [playerRow, playerCol] = playerPosition;

          // Check if player is attacking (basic attack)
          // Highlight tiles that can be attacked by player (3x3 area around player)
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

          // Check if player is (in the process of) moving
          // Highlight tiles that can be moved to by player (5x5 area around player not including wall or door tiles)
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

          // Check if player is using a skill
          // Highlight tiles that can be affected by player's skill
          if (player.state.isUsingSkill && player.state.skillId) {
            const skill = player.skills.find(
              (skill) => skill.id === player.state.skillId
            );

            if (!skill) {
              console.error("Skill not found!");
            } else {
              // Check skill type
              if (skill.skillType === SKILL_TYPE.SELF) {
                // If skill is self-targeted, highlight player's tile
                if (rowIndex === playerRow && columnIndex === playerCol) {
                  isEffectZone = true;
                }
              } else if (skill.skillType === SKILL_TYPE.ST) {
                // If skill is single target, highlight tiles that can be affected by the skill
                const range = skill.range;

                if (
                  rowIndex >= playerRow - range &&
                  rowIndex <= playerRow + range &&
                  columnIndex >= playerCol - range &&
                  columnIndex <= playerCol + range
                ) {
                  isEffectZone = true;
                }
              }
            }
          }

          return (
            <Tile
              tileType={tileType}
              key={`${rowIndex}-${columnIndex}`}
              playerState={player.state}
              active={active}
              isEffectZone={isEffectZone}
              isRoomOver={isRoomOver}
              onClick={() => {
                if (isEffectZone) {
                  if (
                    player.state.isAttacking &&
                    tileType === TILE_TYPE.ENEMY
                  ) {
                    handleEnemyClick(id);
                  } else if (
                    player.state.isMoving &&
                    tileType === TILE_TYPE.EMPTY
                  ) {
                    handlePlayerMove(
                      columnIndex, // x
                      rowIndex // y
                    );
                  } else if (
                    player.state.isMoving &&
                    tileType === TILE_TYPE.DOOR
                  ) {
                    addLog({
                      message: "Player moved to the next room!",
                      type: "info",
                    });
                    // TODO: Reset room and generate new room matrix
                  } else if (
                    player.state.isUsingSkill &&
                    player.state.skillId
                  ) {
                    // Check if skill is self-targeted or single target
                    if (tileType === TILE_TYPE.PLAYER) {
                      // Self-targeted skill
                      handlePlayerUseSkill(player.state.skillId);
                    } else if (tileType === TILE_TYPE.ENEMY) {
                      // Single target skill
                      handleEnemyClick(id);
                    }
                  }
                }
              }}
              onMouseEnter={() => {
                if (tileType === TILE_TYPE.ENEMY) {
                  const enemy = enemies.find((enemy) => enemy.id === id);
                  if (!enemy) {
                    console.error("Enemy not found!");
                    return;
                  }

                  setCurrentHoveredEntity(enemy);
                } else if (tileType === TILE_TYPE.PLAYER) {
                  setCurrentHoveredEntity(player);
                }
              }}
              onMouseLeave={() => {
                setCurrentHoveredEntity(null);
              }}
            />
          );
        });
      })}
    </div>
  );
};
