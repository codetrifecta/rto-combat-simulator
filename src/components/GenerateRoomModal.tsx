import { FC, useEffect, useState } from "react";
import { useGameStateStore } from "../store/game";
import { Button } from "./Button";
import {
  ENEMY_PRESET_ID,
  ENEMY_PRESETS,
  ENTITY_TYPE,
} from "../constants/entity";
import { IEnemy } from "../types";
import { useEnemyStore } from "../store/enemy";
import { usePlayerStore } from "../store/player";

const maxRoomLength = 100;

export const GenerateRoomModal: FC = () => {
  const {
    setRoomLength,
    setRoomTileMatrix,
    setRoomEntityPositions,
    setTurnCycle,
    setIsGameOver,
    setIsGenerateRoomOpen,
  } = useGameStateStore();

  const { setEnemies } = useEnemyStore();

  const { getPlayer } = usePlayerStore();
  const player = getPlayer();

  const [roomLengthInput, setRoomLengthInput] = useState<string>("11"); // Default room length
  const [roomMatrix, setRoomMatrix] = useState<string>("[\n[],\n[],\n[]\n]");
  const [playerPositionInput, setPlayerPositionInput] = useState<
    [string, string]
  >(["9", "5"]);
  const [enemyPositionsInput, setEnemyPositionsInput] = useState<
    [string, string, ENEMY_PRESET_ID][]
  >([
    ["7", "4", ENEMY_PRESET_ID.SHADE],
    ["6", "6", ENEMY_PRESET_ID.SHADE],
    ["2", "8", ENEMY_PRESET_ID.GORGON],
    ["2", "2", ENEMY_PRESET_ID.CYCLOPS],
  ]);

  const handleGenerateRoom = () => {
    const parsedRoomMatrix = JSON.parse(roomMatrix);

    const newRoomEntityPositions = new Map(); // Map of entity type and id to position
    const newEnemies: IEnemy[] = [];

    // Validate player position
    const playerPosition: [number, number] = [
      parseInt(playerPositionInput[0]),
      parseInt(playerPositionInput[1]),
    ];

    if (playerPosition.some((pos) => isNaN(pos))) {
      console.error("Player position is invalid!");
      return;
    }

    if (
      playerPosition[0] < 0 ||
      playerPosition[1] < 0 ||
      playerPosition[0] >= parsedRoomMatrix.length ||
      playerPosition[1] >= parsedRoomMatrix[0].length
    ) {
      console.error("Player position is out of bounds!");
      return;
    }

    // Place player
    newRoomEntityPositions.set(`${playerPosition[0]},${playerPosition[1]}`, [
      ENTITY_TYPE.PLAYER,
      1,
    ]);

    // Place enemies
    enemyPositionsInput.forEach((enemyPositionInput, index) => {
      const enemyPosition: [number, number] = [
        parseInt(enemyPositionInput[0]),
        parseInt(enemyPositionInput[1]),
      ];

      if (enemyPosition.some((pos) => isNaN(pos))) {
        console.error("Enemy position is invalid!");
        return;
      }

      if (
        enemyPosition[0] < 0 ||
        enemyPosition[1] < 0 ||
        enemyPosition[0] >= parsedRoomMatrix.length ||
        enemyPosition[1] >= parsedRoomMatrix[0].length
      ) {
        console.error(`Enemy ${index + 1} position is out of bounds!`);
        return;
      }

      newRoomEntityPositions.set(`${enemyPosition[0]},${enemyPosition[1]}`, [
        ENTITY_TYPE.ENEMY,
        index + 1,
      ]);

      const enemyPreset = ENEMY_PRESETS[enemyPositionInput[2]];

      newEnemies.push({
        ...enemyPreset,
        id: index + 1,
      });
    });

    // Set room length, room entity positions, enemies, and room tile matrix
    setRoomLength(parseInt(roomLengthInput));
    setEnemies(newEnemies);
    setTurnCycle([player, ...newEnemies]);
    setRoomEntityPositions(newRoomEntityPositions);
    setRoomTileMatrix(parsedRoomMatrix);
    setIsGameOver(false);
    setIsGenerateRoomOpen(false);
  };

  // When room length input changes, generate default room matrix
  useEffect(() => {
    const roomLength = parseInt(roomLengthInput);

    let roomMatrixString = "[\n";
    for (let i = 0; i < roomLength; i++) {
      roomMatrixString += "[";
      for (let j = 0; j < roomLength; j++) {
        // Surround room with walls and place door in the middle of the top wall and bottom wall
        if (
          i === 0 ||
          i === roomLength - 1 ||
          j === 0 ||
          j === roomLength - 1
        ) {
          if (j === Math.floor(roomLength / 2)) {
            // Place door in the middle of the top wall and bottom wall
            roomMatrixString += "[2,1]";
          } else {
            // Place walls everywhere else
            roomMatrixString += "[1,1]";
          }
        } else {
          // Place empty tiles everywhere else
          roomMatrixString += "[0,1]";
        }

        if (j !== roomLength - 1) {
          roomMatrixString += ", ";
        }
      }
      roomMatrixString += "]";
      if (i !== roomLength - 1) {
        roomMatrixString += ",\n";
      }
    }

    roomMatrixString += "\n]";

    setRoomMatrix(roomMatrixString);
  }, [roomLengthInput]);

  return (
    <div className="bg-zinc-900 p-5 border border-white h-full">
      <div className="relative">
        <div
          className="absolute top-0 right-0 cursor-pointer text-red-500"
          onClick={() => setIsGenerateRoomOpen(false)}
        >
          X
        </div>
        <h2 className="mb-5 pb-3 w-full border-b">Generate Room Matrix</h2>
      </div>

      <div
        className="flex flex-col overflow-auto"
        style={{ maxHeight: "calc(100% - 70px)" }}
      >
        <div className="mb-5 flex items-center justify-center">
          <div className="mr-3">
            <label htmlFor="roomLength ">Room Length</label>
          </div>
          <input
            id="roomLength"
            className="bg-zinc-700 w-[70px] px-2"
            value={roomLengthInput}
            onChange={(e) => {
              if (/\D/.test(e.target.value)) {
                console.log("Only allow numbers (no decimals)", e.target.value);
                // Only allow numbers (no decimals)
                // setRoomLengthInput(roomLengthInput);
              } else {
                if (parseInt(e.target.value) >= maxRoomLength) {
                  setRoomLengthInput(maxRoomLength + "");
                } else {
                  setRoomLengthInput(e.target.value);
                }
              }
            }}
          ></input>
        </div>

        <div className="mb-5">
          <div className="mb-3">
            <label htmlFor="roomMatrix">Input room 2D array matrix</label>
          </div>
          <textarea
            id="roomMatrix"
            value={roomMatrix}
            onChange={(e) => setRoomMatrix(e.target.value)}
            className="p-2 bg-zinc-700 text-white border border-white rounded w-full h-48"
          />
        </div>

        <div className="mb-5 flex justify-center items-center">
          <p className="mr-3">Player Position (0-indexed)</p>
          <input
            id="playerRowPos"
            className="bg-zinc-700 w-16 px-2 mr-3"
            placeholder="Row"
            value={playerPositionInput[0]}
            onChange={(e) =>
              setPlayerPositionInput([e.target.value, playerPositionInput[1]])
            }
          ></input>
          <input
            id="playerRowPos"
            className="bg-zinc-700 w-16 px-2"
            placeholder="Column"
            value={playerPositionInput[1]}
            onChange={(e) =>
              setPlayerPositionInput([playerPositionInput[0], e.target.value])
            }
          ></input>
        </div>

        <div className="mb-5">
          <p className="mb-3">Enemy Position(s) (0-indexed)</p>
          {enemyPositionsInput.map((enemyPosition, index) => (
            <div className="flex justify-center items-center mb-3" key={index}>
              <p className="mr-3">Enemy {index + 1}</p>
              <input
                className="bg-zinc-700 w-16 px-2 mr-3"
                placeholder="Row"
                value={enemyPosition[0]}
                onChange={(e) =>
                  setEnemyPositionsInput((prevEnemyPositions) => {
                    const newEnemyPositions = [...prevEnemyPositions];
                    newEnemyPositions[index] = [
                      e.target.value,
                      enemyPosition[1],
                      enemyPosition[2],
                    ];
                    return newEnemyPositions;
                  })
                }
              ></input>
              <input
                className="bg-zinc-700 w-16 px-2 mr-3"
                placeholder="Column"
                value={enemyPosition[1]}
                onChange={(e) =>
                  setEnemyPositionsInput((prevEnemyPositions) => {
                    const newEnemyPositions = [...prevEnemyPositions];
                    newEnemyPositions[index] = [
                      enemyPosition[0],
                      e.target.value,
                      enemyPosition[2],
                    ];
                    return newEnemyPositions;
                  })
                }
              ></input>
              <select
                name="enemyPreset"
                id="enemyPreset-select"
                className="bg-zinc-700 h-6"
                value={enemyPosition[2]}
                onChange={(e) =>
                  setEnemyPositionsInput((prevEnemyPositions) => {
                    const newEnemyPositions = [...prevEnemyPositions];
                    newEnemyPositions[index] = [
                      enemyPosition[0],
                      enemyPosition[1],
                      parseInt(e.target.value) as ENEMY_PRESET_ID,
                    ];
                    return newEnemyPositions;
                  })
                }
              >
                {Object.entries(ENEMY_PRESETS).map((enemyPreset, index) => {
                  return (
                    <option key={index} value={enemyPreset[0]}>
                      {enemyPreset[1].name}
                    </option>
                  );
                })}
              </select>
              <div
                className="cursor-pointer text-red-500 ml-3"
                onClick={() =>
                  setEnemyPositionsInput((prevEnemyPositions) => {
                    const newEnemyPositions = [...prevEnemyPositions];
                    newEnemyPositions.splice(index, 1);
                    return newEnemyPositions;
                  })
                }
              >
                X
              </div>
            </div>
          ))}
          <Button
            onClick={() =>
              setEnemyPositionsInput((prevEnemyPositions) => [
                ...prevEnemyPositions,
                [
                  prevEnemyPositions.length.toString(),
                  prevEnemyPositions.length.toString(),
                  ENEMY_PRESET_ID.SHADE,
                ],
              ])
            }
          >
            Add More Enemies
          </Button>
        </div>

        <Button onClick={handleGenerateRoom}>Generate</Button>
      </div>
    </div>
  );
};
