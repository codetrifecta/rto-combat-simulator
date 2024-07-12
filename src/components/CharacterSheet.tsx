import { FC } from "react";

import { usePlayerStore } from "../store/player";
import { useGameStateStore } from "../store/game";

const equipmentCardClasses =
  "w-28 h-28 bg-zinc-700 mb-5 flex justify-center items-center border border-white";

export const CharacterSheet: FC = () => {
  const { getPlayer, getPlayerTotalStats } = usePlayerStore();
  const player = getPlayer();
  const playerStats = getPlayerTotalStats();

  const { setIsCharacterSheetOpen } = useGameStateStore();

  return (
    <div className="h-full bg-zinc-900 p-5 border-e border-white">
      <div className="relative">
        <div
          className="absolute top-0 right-0 cursor-pointer text-red-500"
          onClick={() => setIsCharacterSheetOpen(false)}
        >
          X
        </div>
        <h2 className="mb-5 pb-3 w-full border-b">Character Sheet</h2>
      </div>
      <div className="text-center flex flex-col justify-start items-center">
        <h3 className="mb-5">Name: {player.name}</h3>

        <div className={equipmentCardClasses}>
          {player.equipment.weapon ? (
            <p>{player.equipment.weapon.name}</p>
          ) : (
            <p>None</p>
          )}
        </div>

        <div className={equipmentCardClasses}>
          {player.equipment.helmet ? (
            <p>{player.equipment.helmet.name}</p>
          ) : (
            <p>None</p>
          )}
        </div>

        <div className={equipmentCardClasses}>
          {player.equipment.chestpiece ? (
            <p>{player.equipment.chestpiece.name}</p>
          ) : (
            <p>None</p>
          )}
        </div>

        <div className={equipmentCardClasses}>
          {player.equipment.legging ? (
            <p>{player.equipment.legging.name}</p>
          ) : (
            <p>None</p>
          )}
        </div>

        <p>Health: {player.health}</p>
        <p>Maximum Health: {player.maxHealth}</p>
        <p>Strength: {playerStats.strength}</p>
        <p>Intelligence: {playerStats.intelligence}</p>
        <p>Defense: {playerStats.defense}</p>
        <p>Constituion: {playerStats.constitution}</p>
      </div>
    </div>
  );
};