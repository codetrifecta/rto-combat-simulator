import basic_attack from "./assets/icon_basic_attack.png";

export enum ICON_ID {
  BASIC_ATTACK = "basic_attack",
  MOVE = "move",
}

const ICONS: Record<ICON_ID, string> = {
  [ICON_ID.BASIC_ATTACK]: basic_attack,
  [ICON_ID.MOVE]: "",
};

export const getIconSrc = (icon: ICON_ID) => ICONS[icon] || "";
