import { FC, useMemo, useState } from "react";
import { Tile } from "./Tile";
import { ENTITY_TYPE, TILE_SIZE, TILE_TYPE } from "./constants";
import { IEnemy, IGameState, IPlayer } from "./types";

// Seems like ideal room size is AT LEAST 9x9
const roomLength = 9;
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
initialRoomMatrix[5][3] = [TILE_TYPE.ENEMY, 2];
// initialRoomMatrix[2][4] = [TILE_TYPE.ENEMY, 2];

export const Room: FC<{
  gameState: IGameState;
  player: IPlayer;
  setPlayer: (player: IPlayer) => void;
  enemies: IEnemy[];
}> = ({ gameState, player, setPlayer, enemies }) => {
  const [roomMatrix] = useState<[TILE_TYPE, number][][]>(initialRoomMatrix);

  const playerPosition = useMemo(() => {
    const playerRow = roomMatrix.findIndex(
      (row) => row.findIndex(([type]) => type === TILE_TYPE.PLAYER) !== -1
    );
    const playerCol = roomMatrix[playerRow].findIndex(
      ([type]) => type === TILE_TYPE.PLAYER
    );
    return [playerRow, playerCol];
  }, [roomMatrix]);

  // console.log("roomMatrix", roomMatrix);

  const handleEnemyClick = (id: number) => {
    const enemy = enemies.find((enemy) => enemy.id === id);
    console.log(`Player attacking ${enemy?.name}!`);
    setPlayer({
      ...player,
      actionPoints: player.actionPoints - 1,
      state: {
        ...player.state,
        isAttacking: false,
      },
    });
    // Simulate attack
    setTimeout(() => {
      console.log(`${enemy?.name} took 5 damage!`);
    }, 1000);
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
          if (player.state.isAttacking) {
            const [playerRow, playerCol] = playerPosition;
            effectColor = "red";

            if (
              rowIndex >= playerRow - 1 &&
              rowIndex <= playerRow + 1 &&
              columnIndex >= playerCol - 1 &&
              columnIndex <= playerCol + 1
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
