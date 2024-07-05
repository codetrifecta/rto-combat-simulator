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
import { IEnemy } from "../types";
import { useGameStateStore } from "../store/game";
import { usePlayerStore } from "../store/player";
import { useEnemyStore } from "../store/enemy";
import { generateRoomMatrix, handlePlayerEndTurn } from "../utils";
import { useLogStore } from "../store/log";

export const Room: FC<{
  currentHoveredEntity: IEnemy | null;
  setCurrentHoveredEntity: (enemy: IEnemy | null) => void;
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

  const playerPosition = useMemo(() => {
    const playerRow = roomMatrix.findIndex(
      (row) => row.findIndex(([type]) => type === TILE_TYPE.PLAYER) !== -1
    );

    if (playerRow === -1) {
      console.error("Player row not found in room matrix!");
      return [ROOM_LENGTH / 2, ROOM_LENGTH / 2];
    }

    const playerCol = roomMatrix[playerRow].findIndex(
      ([type]) => type === TILE_TYPE.PLAYER
    );
    return [playerRow, playerCol];
  }, [roomMatrix]);

  // When an enemy is defeated, remove it from the room matrix and check if the room is over
  useEffect(() => {
    // Update room matrix when an enemy is defeated (i.e. removed from the game)
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

    // Log a message saying the player has completed the room when all enemies are defeated
    if (enemies.length === 0) {
      addLog({
        message: (
          <span className="text-green-500">Player completed the room!</span>
        ),
        type: "info",
      });
      setIsRoomOver(true);
      setPlayerActionPoints(STARTING_ACTION_POINTS);
    }
  }, [enemies.length]);

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
    }
    setPlayerState({
      ...player.state,
      isAttacking: false,
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

  const handlePlayerUseSkill = (skillId: number) => {
    const skill = player.skills.find((skill) => skill.id === skillId);

    if (!skill) {
      addLog({ message: "Skill not found!", type: "error" });
      return;
    }

    const newPlayer = skill.effect(player);
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

  // Automatically end player's turn when action points reach 0
  useEffect(() => {
    if (player.actionPoints === 0) {
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
  }, [
    endTurn,
    getPlayer,
    player.actionPoints,
    setPlayerActionPoints,
    turnCycle,
    addLog,
    player.name,
    setPlayer,
  ]);

  // Handle ending turns
  useEffect(() => {
    // Handle enemy's action
    if (turnCycle.length > 0 && turnCycle[0].entityType === ENTITY_TYPE.ENEMY) {
      // Simulate enemy action with a timeout
      setTimeout(() => {
        // End enemy's turn
        addLog({
          message: (
            <>
              <span className="text-red-500">{turnCycle[0].name}</span> ended
              their turn.
            </>
          ),
          type: "info",
        });
        endTurn();
      }, 1500);
    }
  }, [turnCycle, turnCycle.length]);

  // Remove defeated enemies from the turn cycle when they are no longer in the enemies list
  useEffect(() => {
    if (turnCycle.length > 0) {
      const newTurnCycle = turnCycle.filter((entity) => {
        if (entity.entityType === ENTITY_TYPE.ENEMY) {
          const enemy = enemies.find((e) => e.id === entity.id);
          console.log(enemies.length, enemy, entity.id);
          if (!enemy) {
            return false;
          }
        }
        return true;
      });

      console.log(newTurnCycle);

      // Update game store turn cycle
      setTurnCycle(newTurnCycle);
    }
  }, [enemies.length]);

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
          if (player.state.isUsingSkill) {
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
                    handlePlayerUseSkill(player.state.skillId);
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
