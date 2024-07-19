import { FC } from 'react';

import { usePlayerStore } from '../store/player';
import { useGameStateStore } from '../store/game';
import { IconButton } from './IconButton';
import { Icon } from './Icon';
import { Tooltip } from './Tooltip';
import { WEAPONS } from '../constants/weapon';
import { CHESTPIECES, HELMETS } from '../constants/armor';

// const equipmentCardClasses =
//   'w-28 h-28 bg-zinc-700 mb-5 flex justify-center items-center border border-white';

const equipmentCardClasses = 'relative mb-5';

const EQUIPMENT_ICON_SIZE = 96;

export const CharacterSheet: FC = () => {
  const { getPlayer, getPlayerTotalStats } = usePlayerStore();
  const player = getPlayer();
  const { weapon, helmet, chestpiece } = player.equipment;
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
          {/* Weapon will never be done because fists are the default */}
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
            <IconButton>
              <Icon
                icon={WEAPONS[0].icon}
                width={EQUIPMENT_ICON_SIZE}
                height={EQUIPMENT_ICON_SIZE}
                grayscale={true}
              />
            </IconButton>
          )}
        </div>

        <div className={equipmentCardClasses}>
          {helmet !== null ? (
            <>
              <IconButton>
                <Icon
                  icon={helmet.icon}
                  width={EQUIPMENT_ICON_SIZE}
                  height={EQUIPMENT_ICON_SIZE}
                />
              </IconButton>
              <Tooltip>
                <h3>{helmet.name}</h3>
                {helmet.stats.strength > 0 && (
                  <p>Strength: {helmet.stats.strength}</p>
                )}
                {helmet.stats.intelligence > 0 && (
                  <p>Intelligence: {helmet.stats.intelligence}</p>
                )}
                {helmet.stats.defense > 0 && (
                  <p>Defense: {helmet.stats.defense}</p>
                )}
                {helmet.stats.constitution > 0 && (
                  <p>Constitution: {helmet.stats.constitution}</p>
                )}
              </Tooltip>
            </>
          ) : (
            <IconButton disabled={true} grayscale={true}>
              <Icon
                icon={HELMETS[0].icon}
                width={EQUIPMENT_ICON_SIZE}
                height={EQUIPMENT_ICON_SIZE}
              />
            </IconButton>
          )}
        </div>

        <div className={equipmentCardClasses}>
          {chestpiece !== null ? (
            <>
              <IconButton>
                <Icon
                  icon={chestpiece.icon}
                  width={EQUIPMENT_ICON_SIZE}
                  height={EQUIPMENT_ICON_SIZE}
                />
              </IconButton>
              <Tooltip>
                <h3>{chestpiece.name}</h3>
                {chestpiece.stats.strength > 0 && (
                  <p>Strength: {chestpiece.stats.strength}</p>
                )}
                {chestpiece.stats.intelligence > 0 && (
                  <p>Intelligence: {chestpiece.stats.intelligence}</p>
                )}
                {chestpiece.stats.defense > 0 && (
                  <p>Defense: {chestpiece.stats.defense}</p>
                )}
                {chestpiece.stats.constitution > 0 && (
                  <p>Constitution: {chestpiece.stats.constitution}</p>
                )}
              </Tooltip>
            </>
          ) : (
            <IconButton disabled grayscale>
              <Icon
                icon={CHESTPIECES[0].icon}
                width={EQUIPMENT_ICON_SIZE}
                height={EQUIPMENT_ICON_SIZE}
              />
            </IconButton>
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
