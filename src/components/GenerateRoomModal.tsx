import { FC, useEffect, useState } from "react";
import { useGameStateStore } from "../store/game";
import { Button } from "./Button";
import { ENTITY_TYPE } from "../constants";

const maxRoomLength = 100;

export const GenerateRoomModal: FC = () => {
  const {
    setRoomLength,
    setRoomTileMatrix,
    setRoomEntityPositions,
    setIsGenerateRoomOpen,
  } = useGameStateStore();
  const [roomLengthInput, setRoomLengthInput] = useState<string>("3"); // Default room length
  const [roomMatrix, setRoomMatrix] = useState<string>("[\n[],\n[],\n[]\n]");
  const [playerPosition, setPlayerPosition] = useState<[number, number]>([
    0, 0,
  ]);

  const handleGenerateRoom = () => {
    const parsedRoomMatrix = JSON.parse(roomMatrix);

    const newRoomEntityPositions = new Map(); // Map of entity type and id to position

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

    setRoomLength(parseInt(roomLengthInput));
    setRoomEntityPositions(newRoomEntityPositions);
    setRoomTileMatrix(parsedRoomMatrix);
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

      <div className="flex flex-col">
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
            value={playerPosition[0]}
            onChange={(e) =>
              setPlayerPosition([parseInt(e.target.value), playerPosition[1]])
            }
          ></input>
          <input
            id="playerRowPos"
            className="bg-zinc-700 w-16 px-2"
            placeholder="Column"
            value={playerPosition[1]}
            onChange={(e) =>
              setPlayerPosition([playerPosition[0], parseInt(e.target.value)])
            }
          ></input>
        </div>

        <Button onClick={handleGenerateRoom}>Generate</Button>
      </div>
    </div>
  );
};
