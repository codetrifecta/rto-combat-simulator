import basic_attack from "./assets/icons/icon_basic_attack.png";
import move from "./assets/icons/icon_move.png";
import log from "./assets/icons/icon_log.png";
import character from "./assets/icons/icon_character.png";
import inventory from "./assets/icons/icon_inventory.png";

export enum ICON_ID {
  //   PLAYER ACTIONS
  BASIC_ATTACK = "basic_attack",
  MOVE = "move",

  // UI
  LOG = "log",
  CHARACTER = "character",
  INVENTORY = "inventory",
}

const ICONS: Record<ICON_ID, string> = {
  [ICON_ID.BASIC_ATTACK]: basic_attack,
  [ICON_ID.MOVE]: move,
  [ICON_ID.LOG]: log,
  [ICON_ID.CHARACTER]: character,
  [ICON_ID.INVENTORY]: inventory,
};

export const getIconSrc = (icon: ICON_ID) => ICONS[icon] || "";
