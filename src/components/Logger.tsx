import { FC } from "react";
import { ROOM_LENGTH, TILE_SIZE } from "../constants";

const logs = [
  "Player 1 has moved 3 spaces",
  "Player 2 has attacked Player 1",
  "Player 1 has used a potion",
  "Player 2 has moved 2 spaces",
  "Player 1 has attacked Player 2",
  "Player 2 has used a potion",
  "Player 1 has moved 1 space",
  "Player 2 has attacked Player 1",
  "Player 1 has used a potion",
  "Player 2 has moved 3 spaces",
  "Player 1 has attacked Player 2",
  "Player 2 has used a potion",
  "Player 1 has moved 2 spaces",
  "Player 2 has attacked Player 1",
  "Player 1 has used a potion",
  "Player 2 has moved 1 space",
  "Player 1 has moved 3 spaces",
  "Player 2 has attacked Player 1",
  "Player 1 has used a potion",
  "Player 2 has moved 2 spaces",
  "Player 1 has attacked Player 2",
  "Player 2 has used a potion",
  "Player 1 has moved 1 space",
  "Player 2 has attacked Player 1",
  "Player 1 has used a potion",
  "Player 2 has moved 3 spaces",
  "Player 1 has attacked Player 2",
  "Player 2 has used a potion",
  "Player 1 has moved 2 spaces",
  "Player 2 has attacked Player 1",
  "Player 1 has used a potion",
  "Player 2 has moved 1 space",
];

export const Logger = () => {
  return (
    <div
      className="bg-zinc-900 overflow-auto p-5 border-white border"
      style={{ maxHeight: ROOM_LENGTH * TILE_SIZE }}
    >
      <h2 className="mb-5 pb-3 w-full border-b">Logger</h2>
      {logs.map((log, index) => (
        <LogItem key={index} message={log} />
      ))}
    </div>
  );
};

const LogItem: FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex gap-2 items-center">
      <p>{message}</p>
    </div>
  );
};
