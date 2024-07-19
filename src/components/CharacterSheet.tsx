import { FC } from "react";

import { usePlayerStore } from "../store/player";
import { useGameStateStore } from "../store/game";
import { IconButton } from "./IconButton";
import { Icon } from "./Icon";
import { Tooltip } from "./Tooltip";

const equipmentCardClasses =
  "w-28 h-28 bg-zinc-700 mb-5 flex justify-center items-center border border-white";

const EQUIPMENT_ICON_SIZE = 96;

export const CharacterSheet: FC = () => {
  const { getPlayer, getPlayerTotalStats } = usePlayerStore();
  const player = getPlayer();
  const weapon = player.equipment.weapon;
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

        <div className="relative mb-5">
          {weapon !== null ? (
            <>
              <IconButton>
                <Icon
                  icon={weapon.icon}
                  width={EQUIPMENT_ICON_SIZE}
                  height={EQUIPMENT_ICON_SIZE}
                />
              </IconButton>
              <Tooltip>
                <h3>{weapon.name}</h3>
                {weapon.stats.strength > 0 && (
                  <p>Strength: {weapon.stats.strength}</p>
                )}
                {weapon.stats.intelligence > 0 && (
                  <p>Intelligence: {weapon.stats.intelligence}</p>
                )}
                {weapon.stats.defense > 0 && (
                  <p>Defense: {weapon.stats.defense}</p>
                )}
                {weapon.stats.constitution > 0 && (
                  <p>Constitution: {weapon.stats.constitution}</p>
                )}
                <p>Range: {weapon.range}</p>
                <p>Cost: {weapon.cost} AP</p>
              </Tooltip>
            </>
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
