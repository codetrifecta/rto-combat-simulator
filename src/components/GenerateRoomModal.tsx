import { FC, useState } from "react";
import { useGameStateStore } from "../store/game";
import { Button } from "./Button";

export const GenerateRoomModal: FC = () => {
  const { setIsGenerateRoomOpen } = useGameStateStore();
  const [roomMatrix, setRoomMatrix] = useState<string>("");

  const handleGenerateRoom = () => {
    console.log("Generate Room", roomMatrix);
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
        <h2 className="mb-5 pb-3 w-full border-b">Inventory Chooser</h2>
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="roomMatrix">Room 2D Array Matrix</label>
        <textarea
          id="roomMatrix"
          value={roomMatrix}
          onChange={(e) => setRoomMatrix(e.target.value)}
        />
        <Button onClick={handleGenerateRoom}>Generate Room Matrix</Button>
      </div>
    </div>
  );
};
