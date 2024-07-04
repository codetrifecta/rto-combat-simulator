import { FC } from "react";
import { ROOM_LENGTH, TILE_SIZE } from "../constants";
import { IArmor, IWeapon } from "../types";
import { usePlayerInventoryStore } from "../store/inventory";
import clsx from "clsx";

const cardClasses = "p-3 border border-white min-w-[150px] cursor-pointer";

const cardContainerClasses = "flex gap-3 overflow-y-auto pb-5 p-3";

export const InventoryChooser: FC = () => {
  const { weapons, helmets, chestpieces, leggings } = usePlayerInventoryStore();

  return (
    <div
      className="bg-zinc-900 overflow-auto p-5 border-white border"
      style={{ maxHeight: ROOM_LENGTH * TILE_SIZE }}
    >
      <h2 className="mb-5 pb-3 w-full border-b">Inventory Chooser</h2>
      {/* Weapons */}
      <div className="mb-2">
        <h2 className="mb-3">Weapons</h2>
        <div className={clsx(cardContainerClasses)}>
          {weapons.map((weapon) => (
            <WeaponCard key={weapon.id} weapon={weapon} active={false} />
          ))}
        </div>
      </div>

      {/* Helmets */}
      <div className="mb-2">
        <h2 className="mb-3">Helmets</h2>
        <div className={clsx(cardContainerClasses)}>
          {helmets.map((helmet) => (
            <ArmorCard key={helmet.id} armor={helmet} active={false} />
          ))}
        </div>
      </div>

      {/* Chestpieces */}
      <div className="mb-2">
        <h2 className="mb-3">Chestpieces</h2>
        <div className={clsx(cardContainerClasses)}>
          {chestpieces.map((chestpiece) => (
            <ArmorCard key={chestpiece.id} armor={chestpiece} active={false} />
          ))}
        </div>
      </div>

      {/* Leggings */}
      <div className="mb-2">
        <h2 className="mb-3">Leggings</h2>
        <div className={clsx(cardContainerClasses)}>
          {leggings.map((legging) => (
            <ArmorCard key={legging.id} armor={legging} active={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

const WeaponCard: FC<{ weapon: IWeapon; active: boolean }> = ({
  weapon,
  active,
}) => {
  return (
    <div
      className={clsx(cardClasses, {
        "shadow-intense-white": active,
        "hover:shadow-intense-gray": !active,
      })}
    >
      <h3>{weapon.name}</h3>
      <p>Damage: {weapon.damage}</p>
      <p>Range: {weapon.range}</p>
      <p>Cost: {weapon.cost}</p>
    </div>
  );
};

const ArmorCard: FC<{ armor: IArmor; active: boolean }> = ({
  armor,
  active,
}) => {
  return (
    <div
      className={clsx(cardClasses, {
        "shadow-intense-white": active,
        "hover:shadow-intense-gray": !active,
      })}
    >
      <h3>{armor.name}</h3>
      <p>Defense: {armor.defense}</p>
    </div>
  );
};
