// PLAYER ACTIONS
import basic_attack from '../assets/icons/icon_basic_attack.png';
import move from '../assets/icons/icon_move.png';
import skills from '../assets/icons/icon_skills.png';

// UI
import log from '../assets/icons/icon_log.png';
import character from '../assets/icons/icon_character.png';
import inventory from '../assets/icons/icon_inventory.png';

// WEAPONS
import fist from '../assets/icons/weapons/icon_weapon_fist.png';
import sword from '../assets/icons/weapons/icon_weapon_sword_1.png';
import katana from '../assets/icons/weapons/icon_weapon_katana_1.png';
import greatsword from '../assets/icons/weapons/icon_weapon_greatsword_1.png';
import glaive from '../assets/icons/weapons/icon_weapon_polearm_1.png';
import bow from '../assets/icons/weapons/icon_weapon_bow_1.png';
import magic_wand from '../assets/icons/weapons/icon_weapon_wand_1.png';
import magic_staff from '../assets/icons/weapons/icon_weapon_staff_1.png';

// HELMETS
import helmet_leather_1 from '../assets/icons/helmets/icon_helmet_leather_1.png';
import helmet_leather_2 from '../assets/icons/helmets/icon_helmet_leather_2.png';
import helmet_steel_1 from '../assets/icons/helmets/icon_helmet_steel_1.png';
import helmet_steel_2 from '../assets/icons/helmets/icon_helmet_steel_2.png';
import helmet_gold_1 from '../assets/icons/helmets/icon_helmet_gold_1.png';
import helmet_gold_2 from '../assets/icons/helmets/icon_helmet_gold_2.png';
import helmet_diamond_1 from '../assets/icons/helmets/icon_helmet_diamond_1.png';
import helmet_diamond_2 from '../assets/icons/helmets/icon_helmet_diamond_2.png';

// CHESTPIECES
import chestpiece_leather_1 from '../assets/icons/chestpieces/icon_chestpiece_leather_1.png';
import chestpiece_leather_2 from '../assets/icons/chestpieces/icon_chestpiece_leather_2.png';
import chestpiece_steel_1 from '../assets/icons/chestpieces/icon_chestpiece_steel_1.png';
import chestpiece_steel_2 from '../assets/icons/chestpieces/icon_chestpiece_steel_2.png';
import chestpiece_gold_1 from '../assets/icons/chestpieces/icon_chestpiece_gold_1.png';
import chestpiece_gold_2 from '../assets/icons/chestpieces/icon_chestpiece_gold_2.png';
import chestpiece_diamond_1 from '../assets/icons/chestpieces/icon_chestpiece_diamond_1.png';
import chestpiece_diamond_2 from '../assets/icons/chestpieces/icon_chestpiece_diamond_2.png';

// LEGGINGS
import legging_leather_1 from '../assets/icons/leggings/icon_legging_leather_1.png';
import legging_steel_1 from '../assets/icons/leggings/icon_legging_steel_1.png';
import legging_gold_1 from '../assets/icons/leggings/icon_legging_gold_1.png';
import legging_diamond_1 from '../assets/icons/leggings/icon_legging_diamond_1.png';

// SKILLS
import skill_defense_up from '../assets/icons/skills/icon_skill_defense_up.png';
import skill_petrify from '../assets/icons/skills/icon_skill_petrify.png';
import skill_lightning from '../assets/icons/skills/icon_skill_lightning.png';
import skill_fireball from '../assets/icons/skills/icon_skill_fireball.png';
import skill_whirlwind from '../assets/icons/skills/icon_skill_whirlwind.png';
import skill_teleport from '../assets/icons/skills/icon_skill_teleport.png';
import skill_freeze from '../assets/icons/skills/icon_skill_freeze.png';
import skill_absorb from '../assets/icons/skills/icon_skill_absorb.png';
import skill_execute from '../assets/icons/skills/icon_skill_execute.png';
import skill_cleave from '../assets/icons/skills/icon_skill_cleave.png';

// STATUSES
import status_defense_up from '../assets/icons/statuses/icon_status_defense_up.png';
import status_petrified from '../assets/icons/statuses/icon_status_petrified.png';
import status_attack_up from '../assets/icons/statuses/icon_status_attack_up.png';
import status_burned from '../assets/icons/statuses/icon_status_burned.png';
import status_frozen from '../assets/icons/statuses/icon_status_frozen.png';

export enum ICON_ID {
  //   PLAYER ACTIONS
  BASIC_ATTACK = 'basic_attack',
  MOVE = 'move',
  SKILLS = 'skills',

  // UI
  LOG = 'log',
  CHARACTER = 'character',
  INVENTORY = 'inventory',

  // WEAPONS
  WEAPON_FIST = 'weapon_fist',
  WEAPON_SWORD = 'weapon_sword',
  WEAPON_KATANA = 'weapon_katana',
  WEAPON_GREATSWORD = 'weapon_greatsword',
  WEAPON_GLAIVE = 'weapon_glaive',
  WEAPON_BOW = 'weapon_bow',
  WEAPON_MAGIC_WAND = 'weapon_magic_scepter',
  WEAPON_MAGIC_STAFF = 'weapon_magic_staff',

  // HELMETS
  HELMET_LEATHER_1 = 'helmet_leather_1',
  HELMET_LEATHER_2 = 'helmet_leather_2',
  HELMET_STEEL_1 = 'helmet_steel_1',
  HELMET_STEEL_2 = 'helmet_steel_2',
  HELMET_GOLD_1 = 'helmet_gold_1',
  HELMET_GOLD_2 = 'helmet_gold_2',
  HELMET_DIAMOND_1 = 'helmet_diamond_1',
  HELMET_DIAMOND_2 = 'helmet_diamond_2',

  // CHESTPIECES
  CHESTPIECE_LEATHER_1 = 'chestpiece_leather_1',
  CHESTPIECE_LEATHER_2 = 'chestpiece_leather_2',
  CHESTPIECE_STEEL_1 = 'chestpiece_steel_1',
  CHESTPIECE_STEEL_2 = 'chestpiece_steel_2',
  CHESTPIECE_GOLD_1 = 'chestpiece_gold_1',
  CHESTPIECE_GOLD_2 = 'chestpiece_gold_2',
  CHESTPIECE_DIAMOND_1 = 'chestpiece_diamond_1',
  CHESTPIECE_DIAMOND_2 = 'chestpiece_diamond_2',

  // LEGGINGS
  LEGGING_LEATHER_1 = 'legging_leather_1',
  LEGGING_STEEL_1 = 'legging_steel_1',
  LEGGING_GOLD_1 = 'legging_gold_1',
  LEGGING_DIAMOND_1 = 'legging_diamond_1',

  // SKILLS
  SKILL_DEFENSE_UP = 'skill_defense_up',
  SKILL_PETRIFY = 'skill_petrify',
  SKILL_LIGHTNING = 'skill_lightning',
  SKILL_FIREBALL = 'skill_fireball',
  SKILL_WHIRLWIND = 'skill_whirlwind',
  SKILL_TELEPORT = 'skill_teleport',
  SKILL_FREEZE = 'skill_freeze',
  SKILL_ABSORB = 'skill_absorb',
  SKILL_EXECUTE = 'skill_execute',
  SKILL_CLEAVE = 'skill_cleave',

  // STATUSES
  STATUS_DEFENSE_UP = 'status_defense_up',
  STATUS_PETRIFIED = 'status_petrified',
  STATUS_ATTACK_UP = 'status_attack_up',
  STATUS_BURNED = 'status_burned',
  STATUS_FROZEN = 'status_frozen',
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

  // HELMETS
  [ICON_ID.HELMET_LEATHER_1]: helmet_leather_1,
  [ICON_ID.HELMET_LEATHER_2]: helmet_leather_2,
  [ICON_ID.HELMET_STEEL_1]: helmet_steel_1,
  [ICON_ID.HELMET_STEEL_2]: helmet_steel_2,
  [ICON_ID.HELMET_GOLD_1]: helmet_gold_1,
  [ICON_ID.HELMET_GOLD_2]: helmet_gold_2,
  [ICON_ID.HELMET_DIAMOND_1]: helmet_diamond_1,
  [ICON_ID.HELMET_DIAMOND_2]: helmet_diamond_2,

  // CHESTPIECES
  [ICON_ID.CHESTPIECE_LEATHER_1]: chestpiece_leather_1,
  [ICON_ID.CHESTPIECE_LEATHER_2]: chestpiece_leather_2,
  [ICON_ID.CHESTPIECE_STEEL_1]: chestpiece_steel_1,
  [ICON_ID.CHESTPIECE_STEEL_2]: chestpiece_steel_2,
  [ICON_ID.CHESTPIECE_GOLD_1]: chestpiece_gold_1,
  [ICON_ID.CHESTPIECE_GOLD_2]: chestpiece_gold_2,
  [ICON_ID.CHESTPIECE_DIAMOND_1]: chestpiece_diamond_1,
  [ICON_ID.CHESTPIECE_DIAMOND_2]: chestpiece_diamond_2,

  // LEGGINGS
  [ICON_ID.LEGGING_LEATHER_1]: legging_leather_1,
  [ICON_ID.LEGGING_STEEL_1]: legging_steel_1,
  [ICON_ID.LEGGING_GOLD_1]: legging_gold_1,
  [ICON_ID.LEGGING_DIAMOND_1]: legging_diamond_1,

  // SKILLS
  [ICON_ID.SKILL_DEFENSE_UP]: skill_defense_up,
  [ICON_ID.SKILL_PETRIFY]: skill_petrify,
  [ICON_ID.SKILL_LIGHTNING]: skill_lightning,
  [ICON_ID.SKILL_FIREBALL]: skill_fireball,
  [ICON_ID.SKILL_WHIRLWIND]: skill_whirlwind,
  [ICON_ID.SKILL_TELEPORT]: skill_teleport,
  [ICON_ID.SKILL_FREEZE]: skill_freeze,
  [ICON_ID.SKILL_ABSORB]: skill_absorb,
  [ICON_ID.SKILL_EXECUTE]: skill_execute,
  [ICON_ID.SKILL_CLEAVE]: skill_cleave,

  // STATUSES
  [ICON_ID.STATUS_DEFENSE_UP]: status_defense_up,
  [ICON_ID.STATUS_PETRIFIED]: status_petrified,
  [ICON_ID.STATUS_ATTACK_UP]: status_attack_up,
  [ICON_ID.STATUS_BURNED]: status_burned,
  [ICON_ID.STATUS_FROZEN]: status_frozen,
};

export const getIconSrc = (icon: ICON_ID) => ICONS[icon] || '';
