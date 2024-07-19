// PLAYER ACTIONS
import basic_attack from "../assets/icons/icon_basic_attack.png";
import move from "../assets/icons/icon_move.png";
import skills from "../assets/icons/icon_skills.png";

// UI
import log from "../assets/icons/icon_log.png";
import character from "../assets/icons/icon_character.png";
import inventory from "../assets/icons/icon_inventory.png";

// WEAPONS
import fist from "../assets/icons/icon_weapon_fist.png";
import sword from "../assets/icons/icon_weapon_sword_1.png";
import katana from "../assets/icons/icon_weapon_katana_1.png";
import greatsword from "../assets/icons/icon_weapon_greatsword_1.png";
import glaive from "../assets/icons/icon_weapon_polearm_1.png";
import bow from "../assets/icons/icon_weapon_bow_1.png";
import magic_wand from "../assets/icons/icon_weapon_wand_1.png";
import magic_staff from "../assets/icons/icon_weapon_staff_1.png";

// SKILLS
import skill_defense_up from "../assets/icons/icon_skill_defense_up.png";
import skill_petrify from "../assets/icons/icon_skill_petrify.png";
import skill_lightning from "../assets/icons/icon_skill_lightning.png";
import skill_fireball from "../assets/icons/icon_skill_fireball.png";
import skill_whirlwind from "../assets/icons/icon_skill_whirlwind.png";
import skill_teleport from "../assets/icons/icon_skill_teleport.png";

// EFFECTS
import effect_defense_up from "../assets/icons/icon_effect_defense_up.png";
import effect_petrified from "../assets/icons/icon_effect_petrified.png";
import effect_attack_up from "../assets/icons/icon_effect_attack_up.png";
import effect_burned from "../assets/icons/icon_effect_burned.png";

export enum ICON_ID {
  //   PLAYER ACTIONS
  BASIC_ATTACK = "basic_attack",
  MOVE = "move",
  SKILLS = "skills",

  // UI
  LOG = "log",
  CHARACTER = "character",
  INVENTORY = "inventory",

  // WEAPONS
  WEAPON_FIST = "weapon_fist",
  WEAPON_SWORD = "weapon_sword",
  WEAPON_KATANA = "weapon_katana",
  WEAPON_GREATSWORD = "weapon_greatsword",
  WEAPON_GLAIVE = "weapon_glaive",
  WEAPON_BOW = "weapon_bow",
  WEAPON_MAGIC_WAND = "weapon_magic_scepter",
  WEAPON_MAGIC_STAFF = "weapon_magic_staff",

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

  // WEAPONS
  [ICON_ID.WEAPON_FIST]: fist,
  [ICON_ID.WEAPON_SWORD]: sword,
  [ICON_ID.WEAPON_KATANA]: katana,
  [ICON_ID.WEAPON_GREATSWORD]: greatsword,
  [ICON_ID.WEAPON_GLAIVE]: glaive,
  [ICON_ID.WEAPON_BOW]: bow,
  [ICON_ID.WEAPON_MAGIC_WAND]: magic_wand,
  [ICON_ID.WEAPON_MAGIC_STAFF]: magic_staff,

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
