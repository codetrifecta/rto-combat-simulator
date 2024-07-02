import { FC, useEffect, useMemo, useState } from "react";
import { Tile } from "./Tile";
import { ENTITY_TYPE, TILE_SIZE, TILE_TYPE } from "./constants";
import { IEnemy, IGameState, IPlayer } from "./types";

// Seems like ideal room size is AT LEAST 13x13
const roomLength = 11;
const totalRoomSize = roomLength * TILE_SIZE;

// Initialize room matrix
const initialRoomMatrix: [TILE_TYPE, number][][] = Array.from(
  { length: roomLength },
  () => Array.from({ length: roomLength }, () => [TILE_TYPE.EMPTY, 0])
);

// Generate room layout
for (let row = 0; row < roomLength; row++) {
  for (let col = 0; col < roomLength; col++) {
    // Surround room with walls and place door in the middle of the top wall and bottom wall
    if (
      row === 0 ||
      row === roomLength - 1 ||
      col === 0 ||
      col === roomLength - 1
    ) {
      if (col === Math.floor(roomLength / 2)) {
        initialRoomMatrix[row][col] = [TILE_TYPE.DOOR, 1];
      } else {
        initialRoomMatrix[row][col] = [TILE_TYPE.WALL, 1];
      }
    }
    // Place player in the bottom middle
    else if (
      row === Math.floor((roomLength / 4) * 3) &&
      col === Math.floor(roomLength / 2)
    ) {
      initialRoomMatrix[row][col] = [TILE_TYPE.PLAYER, 1];
    }
    // Place two enemies in quadrant 1 and 2
    else if (
      (row === Math.floor(roomLength / 4) &&
        col === Math.floor(roomLength / 4)) ||
      (row === Math.floor(roomLength / 4) &&
        col === Math.floor((roomLength / 4) * 3))
    ) {
      if (col === Math.floor(roomLength / 4)) {
        // initialRoomMatrix[row][col] = [TILE_TYPE.ENEMY, 1];
      } else {
        initialRoomMatrix[row][col] = [TILE_TYPE.ENEMY, 1];
      }
    } else {
      // Place walls everywhere else
      initialRoomMatrix[row][col] = [TILE_TYPE.EMPTY, 1];
    }
  }
}

// Manually modify room matrix
// initialRoomMatrix[8][5] = [TILE_TYPE.ENEMY, 2]; // Enemy in direct top-left of player in a 13x13 room
initialRoomMatrix[7][4] = [TILE_TYPE.ENEMY, 2]; // Enemy in direct top-left of player in a 11x11 room

export const Room: FC<{
  gameState: IGameState;
  player: IPlayer;
  setPlayer: (player: IPlayer) => void;
  enemies: IEnemy[];
  setEnemies: (enemies: IEnemy[]) => void;
}> = ({ gameState, player, setPlayer, enemies, setEnemies }) => {
  const [roomMatrix, setRoomMatrix] =
    useState<[TILE_TYPE, number][][]>(initialRoomMatrix);

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

  const handleEnemyClick = (id: number) => {
    const enemy = enemies.find((enemy) => enemy.id === id);
    console.log(`Player attacking ${enemy?.name}!`);

    if (!enemy) {
      console.error("Enemy not found!");
      return;
    }

    if (player.state.isAttacking) {
      if (!player.equipment.weapon) {
        console.log("Player has no weapon equipped!");
        return;
      }

      const weaponDamage = player.equipment.weapon.damage;
      enemy.health = enemy.health - weaponDamage;

      if (enemy.health <= 0) {
        setEnemies(enemies.filter((e) => e.id !== id));
        console.log(
          `${enemy.name} took ${weaponDamage} damage and has been defeated!`
        );
      } else {
        setEnemies(
          enemies.map((e) => {
            if (e.id === id) {
              return enemy;
            }
            return e;
          })
        );
        console.log(`${enemy.name} took ${weaponDamage} damage!`);
      }
    }

    setPlayer({
      ...player,
      actionPoints: player.actionPoints - 1,
      state: {
        ...player.state,
        isAttacking: false,
      },
    });
  };

  return (
    <div
      style={{
        width: totalRoomSize,
        height: totalRoomSize,
        display: "grid",
        gridTemplateColumns: `repeat(${roomLength}, ${TILE_SIZE}px)`,
        gridTemplateRows: `repeat(${roomLength}, ${TILE_SIZE}px)`,
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
            entityType !== null &&
            gameState.turnCycle[0].entityType === entityType &&
            gameState.turnCycle[0].id === id
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
            />
          );
        });
      })}
    </div>
  );
};
