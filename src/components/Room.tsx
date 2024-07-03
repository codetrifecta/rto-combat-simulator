import { FC, useEffect, useMemo, useState } from "react";
import { Tile } from "./Tile";
import { ENTITY_TYPE, ROOM_LENGTH, TILE_SIZE, TILE_TYPE } from "../constants";
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

  const { turnCycle, endTurn } = useGameStateStore();
  const { getPlayer, setPlayerActionPoints, setPlayerState } = usePlayerStore();
  const player = getPlayer();

  const { enemies, setEnemies } = useEnemyStore();

  const { addLog } = useLogStore();

  const playerPosition = useMemo(() => {
    const playerRow = roomMatrix.findIndex(
      (row) => row.findIndex(([type]) => type === TILE_TYPE.PLAYER) !== -1
    );
    const playerCol = roomMatrix[playerRow].findIndex(
      ([type]) => type === TILE_TYPE.PLAYER
    );
    return [playerRow, playerCol];
  }, [roomMatrix]);

  // Update room matrix when an enemy is defeated (i.e. removed from the game)
  useEffect(() => {
    console.log("room turn cycle:", turnCycle);
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
  }, [enemies.length]);

  // Handle player attacking an enemy
  const handleEnemyClick = (id: number) => {
    const enemy = enemies.find((enemy) => enemy.id === id);
    console.log(`Player attacking ${enemy?.name}!`);

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
      enemy.health = enemy.health - weaponDamage;

      if (enemy.health <= 0) {
        setEnemies(enemies.filter((e) => e.id !== id));
        addLog({
          message: `${enemy.name} took ${weaponDamage} damage and has been defeated!`,
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
          message: `${enemy.name} took ${weaponDamage} damage!`,
          type: "info",
        });
      }
    }
    setPlayerActionPoints(player.actionPoints - 1);
    setPlayerState({
      ...player.state,
      isAttacking: false,
    });
  };

  // Automatically end player's turn when action points reach 0
  useEffect(() => {
    if (player.actionPoints === 0) {
      handlePlayerEndTurn(
        turnCycle,
        getPlayer,
        setPlayerActionPoints,
        endTurn,
        addLog
      );
    }
  }, [
    endTurn,
    getPlayer,
    player.actionPoints,
    setPlayerActionPoints,
    turnCycle,
    addLog,
  ]);

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
          let effectColor: string = "red";

          // Check if player is attacking (basic attack)
          // Highlight tiles that can be attacked by player (3x3 area around player)
          if (player.state.isAttacking && player.equipment.weapon) {
            const [playerRow, playerCol] = playerPosition;
            effectColor = "red";

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

          return (
            <Tile
              tileType={tileType}
              key={`${rowIndex}-${columnIndex}`}
              playerState={player.state}
              active={active}
              isEffectZone={isEffectZone}
              effectColor={effectColor}
              onClick={() => {
                if (isEffectZone && tileType === TILE_TYPE.ENEMY) {
                  handleEnemyClick(id);
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
