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

  const { turnCycle, endTurn, setIsRoomOver } = useGameStateStore();
  const { getPlayer, setPlayerActionPoints, setPlayerState } = usePlayerStore();
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

  // Log a message saying the player has completed the room when all enemies are defeated
  useEffect(() => {
    if (enemies.length === 0) {
      addLog({
        message: (
          <span className="text-green-500">Player completed the room!</span>
        ),
        type: "info",
      });
      setIsRoomOver(true);
      // setPlayerActionPoints()
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
      enemy.health = enemy.health - weaponDamage;

      if (enemy.health <= 0) {
        setEnemies(enemies.filter((e) => e.id !== id));
        addLog({
          message: (
            <>
              <span className="text-red-500">{enemy.name}</span> took{" "}
              {weaponDamage} damage and has been defeated!
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
              {weaponDamage} damage.
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
    setPlayerActionPoints(player.actionPoints - 1);
    setPlayerState({
      ...player.state,
      isMoving: false,
    });
  };

  // console.log("room", player.state);

  // Automatically end player's turn when action points reach 0
  useEffect(() => {
    if (player.actionPoints === 0) {
      handlePlayerEndTurn(turnCycle, getPlayer, setPlayerActionPoints, endTurn);
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

          // Check if player is attacking (basic attack)
          // Highlight tiles that can be attacked by player (3x3 area around player)
          if (player.state.isAttacking && player.equipment.weapon) {
            const [playerRow, playerCol] = playerPosition;

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
            const [playerRow, playerCol] = playerPosition;

            // console.log(
            //   "move zone",
            //   playerRow,
            //   playerCol,
            //   rowIndex,
            //   columnIndex
            // );

            if (
              rowIndex >= playerRow - 2 &&
              rowIndex <= playerRow + 2 &&
              columnIndex >= playerCol - 2 &&
              columnIndex <= playerCol + 2
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
