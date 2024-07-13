// PLAYER ACTIONS
import basic_attack from "./assets/icons/icon_basic_attack.png";
import move from "./assets/icons/icon_move.png";
import skills from "./assets/icons/icon_skills.png";

// UI
import log from "./assets/icons/icon_log.png";
import character from "./assets/icons/icon_character.png";
import inventory from "./assets/icons/icon_inventory.png";

// SKILLS
import skill_defense_up from "./assets/icons/icon_skill_defense_up.png";
import skill_petrify from "./assets/icons/icon_skill_petrify.png";
import skill_lightning from "./assets/icons/icon_skill_lightning.png";
import skill_fireball from "./assets/icons/icon_skill_fireball.png";
import skill_whirlwind from "./assets/icons/icon_skill_whirlwind.png";
import skill_teleport from "./assets/icons/icon_skill_teleport.png";

// EFFECTS
import effect_defense_up from "./assets/icons/icon_effect_defense_up.png";
import effect_petrified from "./assets/icons/icon_effect_petrified.png";
import effect_attack_up from "./assets/icons/icon_effect_attack_up.png";
import effect_burned from "./assets/icons/icon_effect_burned.png";

export enum ICON_ID {
  //   PLAYER ACTIONS
  BASIC_ATTACK = "basic_attack",
  MOVE = "move",
  SKILLS = "skills",

  // UI
  LOG = "log",
  CHARACTER = "character",
  INVENTORY = "inventory",

  // SKILLS
  SKILL_DEFENSE_UP = "skill_defense_up",
  SKILL_PETRIFY = "skill_petrify",
  SKILL_LIGHTNING = "skill_lightning",
  SKILL_FIREBALL = "skill_fireball",
  SKILL_WHIRLWIND = "skill_whirlwind",
  SKILL_TELEPORT = "skill_teleport",

  // EFFECTS
  EFFECT_DEFENSE_UP = "effect_defense_up",
  EFFECT_PETRIFIED = "effect_petrified",
  EFFECT_ATTACK_UP = "effect_attack_up",
  EFFECT_BURNED = "effect_burned",
}

const ICONS: Record<ICON_ID, string> = {
  //  PLAYER ACTIONS
  [ICON_ID.BASIC_ATTACK]: basic_attack,
  [ICON_ID.MOVE]: move,
  [ICON_ID.SKILLS]: skills,

  // UI
  [ICON_ID.LOG]: log,
  [ICON_ID.CHARACTER]: character,
  [ICON_ID.INVENTORY]: inventory,

  // SKILLS
  [ICON_ID.SKILL_DEFENSE_UP]: skill_defense_up,
  [ICON_ID.SKILL_PETRIFY]: skill_petrify,
  [ICON_ID.SKILL_LIGHTNING]: skill_lightning,
  [ICON_ID.SKILL_FIREBALL]: skill_fireball,
  [ICON_ID.SKILL_WHIRLWIND]: skill_whirlwind,
  [ICON_ID.SKILL_TELEPORT]: skill_teleport,

  // EFFECTS
  [ICON_ID.EFFECT_DEFENSE_UP]: effect_defense_up,
  [ICON_ID.EFFECT_PETRIFIED]: effect_petrified,
  [ICON_ID.EFFECT_ATTACK_UP]: effect_attack_up,
  [ICON_ID.EFFECT_BURNED]: effect_burned,
};

export const getIconSrc = (icon: ICON_ID) => ICONS[icon] || "";
