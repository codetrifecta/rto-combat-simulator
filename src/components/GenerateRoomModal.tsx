import { FC, useState } from "react";
import { useGameStateStore } from "../store/game";
import { Button } from "./Button";

export const GenerateRoomModal: FC = () => {
  const { setIsGenerateRoomOpen } = useGameStateStore();
  const [roomMatrix, setRoomMatrix] = useState<string>("[\n[],\n[],\n[]\n]");

  const handleGenerateRoom = () => {
    console.log("Room Raw", roomMatrix);
    const parsedRoomMatrix = JSON.parse(roomMatrix);
    console.log("Room Parsed", parsedRoomMatrix);
    // generateRoom(roomMatrix, roomDifficulty);
  };

  return (
    <div className="bg-zinc-900 p-5 border border-white ">
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
        <label htmlFor="roomMatrix" className="mb-3">
          Input room 2D array matrix
        </label>
        <textarea
          id="roomMatrix"
          value={roomMatrix}
          onChange={(e) => setRoomMatrix(e.target.value)}
          className="p-2 mb-3 bg-zinc-800 text-white border border-white rounded w-full h-48 max-h-80"
        />

        <Button onClick={handleGenerateRoom}>Generate</Button>
      </div>
    </div>
  );
};
