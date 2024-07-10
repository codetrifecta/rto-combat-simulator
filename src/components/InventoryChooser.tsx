import { FC } from "react";
// import { ROOM_LENGTH, TILE_SIZE } from "../constants";
import { IArmor, IWeapon } from "../types";
import { usePlayerInventoryStore } from "../store/inventory";
import clsx from "clsx";
import { usePlayerStore } from "../store/player";
import { useGameStateStore } from "../store/game";

const equipmentTypeClasses = "mb-4";
const equipmentTitleClasses = "mb-0";
const cardContainerClasses = "flex gap-3 overflow-y-auto pb-5 p-3";
const cardClasses = "p-3 border border-white min-w-[175px] cursor-pointer";
const cardParagraphClasses = "text-base";

export const InventoryChooser: FC = () => {
  const { weapons, helmets, chestpieces, leggings } = usePlayerInventoryStore();

  const { setIsInventoryOpen } = useGameStateStore();

  const {
    getPlayer,
    setPlayerWeapon,
    setPlayerHelmet,
    setPlayerChestpiece,
    setPlayerLegging,
  } = usePlayerStore();

  const player = getPlayer();

  return (
    <div
      className="bg-zinc-900 overflow-auto p-5 border-l border-white h-full"
      // onClick={(e) => e.stopPropagation()}
    >
      <div className="relative">
        <div
          className="absolute top-0 right-0 cursor-pointer text-red-500"
          onClick={() => setIsInventoryOpen(false)}
        >
          X
        </div>
        <h2 className="mb-5 pb-3 w-full border-b">Inventory Chooser</h2>
      </div>
      {/* Weapons */}
      <div className={clsx(equipmentTypeClasses)}>
        <h2 className={clsx(equipmentTitleClasses)}>Weapons</h2>
        <div className={clsx(cardContainerClasses)}>
          {weapons.map((weapon) => {
            if (player.equipment.weapon?.id === weapon.id) {
              return (
                <WeaponCard
                  key={weapon.id}
                  weapon={weapon}
                  active
                  onClick={() => {
                    if (player.state.isAttacking === false) {
                      setPlayerWeapon(null);
                    }
                  }}
                />
              );
            } else {
              return (
                <WeaponCard
                  key={weapon.id}
                  weapon={weapon}
                  active={false}
                  onClick={() => {
                    if (player.state.isAttacking === false) {
                      setPlayerWeapon(weapon);
                    }
                  }}
                />
              );
            }
          })}
        </div>
      </div>

      {/* Helmets */}
      <div className={clsx(equipmentTypeClasses)}>
        <h2 className={clsx(equipmentTitleClasses)}>Helmets</h2>
        <div className={clsx(cardContainerClasses)}>
          {helmets.map((helmet) => {
            if (player.equipment.helmet?.id === helmet.id) {
              return (
                <ArmorCard
                  key={helmet.id}
                  armor={helmet}
                  active
                  onClick={() => setPlayerWeapon(null)}
                />
              );
            } else {
              return (
                <ArmorCard
                  key={helmet.id}
                  armor={helmet}
                  active={false}
                  onClick={() => setPlayerHelmet(helmet)}
                />
              );
            }
          })}
        </div>
      </div>

      {/* Chestpieces */}
      <div className={clsx(equipmentTypeClasses)}>
        <h2 className={clsx(equipmentTitleClasses)}>Chestpieces</h2>
        <div className={clsx(cardContainerClasses)}>
          {chestpieces.map((chestpiece) => {
            if (player.equipment.chestpiece?.id === chestpiece.id) {
              return (
                <ArmorCard
                  key={chestpiece.id}
                  armor={chestpiece}
                  active
                  onClick={() => setPlayerWeapon(null)}
                />
              );
            } else {
              return (
                <ArmorCard
                  key={chestpiece.id}
                  armor={chestpiece}
                  active={false}
                  onClick={() => setPlayerChestpiece(chestpiece)}
                />
              );
            }
          })}
        </div>
      </div>

      {/* Leggings */}
      <div className="mb-2">
        <h2 className={clsx(equipmentTitleClasses)}>Leggings</h2>
        <div className={clsx(cardContainerClasses)}>
          {leggings.map((legging) => {
            if (player.equipment.legging?.id === legging.id) {
              return (
                <ArmorCard
                  key={legging.id}
                  armor={legging}
                  active
                  onClick={() => setPlayerWeapon(null)}
                />
              );
            } else {
              return (
                <ArmorCard
                  key={legging.id}
                  armor={legging}
                  active={false}
                  onClick={() => setPlayerLegging(legging)}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

const WeaponCard: FC<{
  weapon: IWeapon;
  active: boolean;
  onClick?: () => void;
}> = ({ weapon, active, onClick }) => {
  return (
    <div
      className={clsx(cardClasses, {
        "shadow-intense-white": active,
        "hover:shadow-intense-gray": !active,
      })}
      onClick={onClick}
    >
      <h3>{weapon.name}</h3>
      {weapon.stats.strength > 0 && (
        <p className={clsx(cardParagraphClasses)}>
          Strength: {weapon.stats.strength}
        </p>
      )}
      {weapon.stats.intelligence > 0 && (
        <p className={clsx(cardParagraphClasses)}>
          Intelligence: {weapon.stats.intelligence}
        </p>
      )}
      {weapon.stats.defense > 0 && (
        <p className={clsx(cardParagraphClasses)}>
          Defense: {weapon.stats.defense}
        </p>
      )}
      {weapon.stats.constitution > 0 && (
        <p className={clsx(cardParagraphClasses)}>
          Constitution: {weapon.stats.constitution}
        </p>
      )}
      <p className={clsx(cardParagraphClasses)}>Range: {weapon.range}</p>
      <p className={clsx(cardParagraphClasses)}>Cost: {weapon.cost}</p>
    </div>
  );
};

const ArmorCard: FC<{
  armor: IArmor;
  active: boolean;
  onClick?: () => void;
}> = ({ armor, active, onClick }) => {
  return (
    <div
      className={clsx(cardClasses, {
        "shadow-intense-white": active,
        "hover:shadow-intense-gray": !active,
      })}
      onClick={onClick}
    >
      <h3>{armor.name}</h3>
      {armor.stats.strength > 0 && (
        <p className={clsx(cardParagraphClasses)}>
          Strength: {armor.stats.strength}
        </p>
      )}
      {armor.stats.intelligence > 0 && (
        <p className={clsx(cardParagraphClasses)}>
          Intelligence: {armor.stats.intelligence}
        </p>
      )}
      {armor.stats.defense > 0 && (
        <p className={clsx(cardParagraphClasses)}>
          Defense: {armor.stats.defense}
        </p>
      )}
      {armor.stats.constitution > 0 && (
        <p className={clsx(cardParagraphClasses)}>
          Constitution: {armor.stats.constitution}
        </p>
      )}
    </div>
  );
};
