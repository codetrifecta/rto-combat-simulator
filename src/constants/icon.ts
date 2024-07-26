// PLAYER ACTIONS
import basic_attack from '../assets/icons/icon_basic_attack.png';
import move from '../assets/icons/icon_move.png';
import skills from '../assets/icons/icon_skills.png';
import end_turn from '../assets/icons/icon_end_turn.png';

// UI
import log from '../assets/icons/icon_log.png';
import character from '../assets/icons/icon_character.png';
import inventory from '../assets/icons/icon_inventory.png';
import generate_room from '../assets/icons/icon_generate_room.png';

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
import skill_flex from '../assets/icons/skills/icon_skill_flex.png';
import skill_defense_up from '../assets/icons/skills/icon_skill_defense_up.png';
import skill_petrify from '../assets/icons/skills/icon_skill_petrify.png';
import skill_lightning from '../assets/icons/skills/icon_skill_lightning.png';
import skill_fireball from '../assets/icons/skills/icon_skill_fireball.png';
import skill_whirlwind from '../assets/icons/skills/icon_skill_whirlwind.png';
import skill_fly from '../assets/icons/skills/icon_skill_fly.png';
import skill_freeze from '../assets/icons/skills/icon_skill_freeze.png';
import skill_absorb from '../assets/icons/skills/icon_skill_absorb.png';
import skill_execute from '../assets/icons/skills/icon_skill_execute.png';
import skill_cleave from '../assets/icons/skills/icon_skill_cleave.png';
import skill_annihilate from '../assets/icons/skills/icon_skill_annihilate.png';
import skill_warcry from '../assets/icons/skills/icon_skill_warcry.png';
import skill_bloodlust from '../assets/icons/skills/icon_skill_bloodlust.png';
import skill_focus from '../assets/icons/skills/icon_skill_focus.png';
import skill_enlighten from '../assets/icons/skills/icon_skill_enlighten.png';
import skill_weaken from '../assets/icons/skills/icon_skill_weaken.png';
import skill_disable from '../assets/icons/skills/icon_skill_disable.png';
import skill_entangle from '../assets/icons/skills/icon_skill_entangle.png';
import skill_leap_slam from '../assets/icons/skills/icon_skill_leap_slam.png';
import skill_flame_dive from '../assets/icons/skills/icon_skill_flame_dive.png';

// STATUSES
import status_defense_up from '../assets/icons/statuses/icon_status_defense_up.png';
import status_petrified from '../assets/icons/statuses/icon_status_petrified.png';
import status_attack_up from '../assets/icons/statuses/icon_status_attack_up.png';
import status_burned from '../assets/icons/statuses/icon_status_burned.png';
import status_frozen from '../assets/icons/statuses/icon_status_frozen.png';
import status_battle_fury from '../assets/icons/statuses/icon_status_battle_fury.png';
import status_bloodlust from '../assets/icons/statuses/icon_status_bloodlust.png';
import status_focused from '../assets/icons/statuses/icon_status_focused.png';
import status_enlightened from '../assets/icons/statuses/icon_status_enlightened.png';
import status_weakened from '../assets/icons/statuses/icon_status_weakened.png';
import status_disabled from '../assets/icons/statuses/icon_status_disabled.png';
import status_entangled from '../assets/icons/statuses/icon_status_entangled.png';

export enum ICON_ID {
  //   PLAYER ACTIONS
  BASIC_ATTACK = 'basic_attack',
  MOVE = 'move',
  SKILLS = 'skills',
  END_TURN = 'end_turn',

  // UI
  LOG = 'log',
  CHARACTER = 'character',
  INVENTORY = 'inventory',
  GENERATE_ROOM = 'generate_room',

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
  SKILL_FLEX = 'skill_flex',
  SKILL_DEFENSE_UP = 'skill_defense_up',
  SKILL_PETRIFY = 'skill_petrify',
  SKILL_LIGHTNING = 'skill_lightning',
  SKILL_FIREBALL = 'skill_fireball',
  SKILL_WHIRLWIND = 'skill_whirlwind',
  SKILL_FLY = 'skill_fly',
  SKILL_FREEZE = 'skill_freeze',
  SKILL_ABSORB = 'skill_absorb',
  SKILL_EXECUTE = 'skill_execute',
  SKILL_CLEAVE = 'skill_cleave',
  SKILL_ANNIHILATE = 'skill_annihilate',
  SKILL_WARCRY = 'skill_warcry',
  SKILL_BLOODLUST = 'skill_bloodlust',
  SKILL_FOCUS = 'skill_focus',
  SKILL_ENLIGHTEN = 'skill_enlighten',
  SKILL_WEAKEN = 'skill_weaken',
  SKILL_DISABLE = 'skill_disable',
  SKILL_ENTANGLE = 'skill_entangle',
  SKILL_LEAP_SLAM = 'skill_leap_slam',
  SKILL_FLAME_DIVE = 'skill_flame_dive',

  // STATUSES
  STATUS_DEFENSE_UP = 'status_defense_up',
  STATUS_PETRIFIED = 'status_petrified',
  STATUS_ATTACK_UP = 'status_attack_up',
  STATUS_BURNED = 'status_burned',
  STATUS_FROZEN = 'status_frozen',
  STATUS_BATTLE_FURY = 'status_battle_fury',
  STATUS_BLOODLUST = 'status_bloodlust',
  STATUS_FOCUSED = 'status_focused',
  STATUS_ENLIGHTENED = 'status_enlightened',
  STATUS_WEAKENED = 'status_weakened',
  STATUS_DISABLED = 'status_disabled',
  STATUS_ENTANGLED = 'status_entangled',
}

const ICONS: Record<ICON_ID, string> = {
  //  PLAYER ACTIONS
  [ICON_ID.BASIC_ATTACK]: basic_attack,
  [ICON_ID.MOVE]: move,
  [ICON_ID.SKILLS]: skills,
  [ICON_ID.END_TURN]: end_turn,

  // UI
  [ICON_ID.LOG]: log,
  [ICON_ID.CHARACTER]: character,
  [ICON_ID.INVENTORY]: inventory,
  [ICON_ID.GENERATE_ROOM]: generate_room,

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
  [ICON_ID.SKILL_FLEX]: skill_flex,
  [ICON_ID.SKILL_DEFENSE_UP]: skill_defense_up,
  [ICON_ID.SKILL_PETRIFY]: skill_petrify,
  [ICON_ID.SKILL_LIGHTNING]: skill_lightning,
  [ICON_ID.SKILL_FIREBALL]: skill_fireball,
  [ICON_ID.SKILL_WHIRLWIND]: skill_whirlwind,
  [ICON_ID.SKILL_FLY]: skill_fly,
  [ICON_ID.SKILL_FREEZE]: skill_freeze,
  [ICON_ID.SKILL_ABSORB]: skill_absorb,
  [ICON_ID.SKILL_EXECUTE]: skill_execute,
  [ICON_ID.SKILL_CLEAVE]: skill_cleave,
  [ICON_ID.SKILL_ANNIHILATE]: skill_annihilate,
  [ICON_ID.SKILL_WARCRY]: skill_warcry,
  [ICON_ID.SKILL_BLOODLUST]: skill_bloodlust,
  [ICON_ID.SKILL_FOCUS]: skill_focus,
  [ICON_ID.SKILL_ENLIGHTEN]: skill_enlighten,
  [ICON_ID.SKILL_WEAKEN]: skill_weaken,
  [ICON_ID.SKILL_DISABLE]: skill_disable,
  [ICON_ID.SKILL_ENTANGLE]: skill_entangle,
  [ICON_ID.SKILL_LEAP_SLAM]: skill_leap_slam,
  [ICON_ID.SKILL_FLAME_DIVE]: skill_flame_dive,

  // STATUSES
  [ICON_ID.STATUS_DEFENSE_UP]: status_defense_up,
  [ICON_ID.STATUS_PETRIFIED]: status_petrified,
  [ICON_ID.STATUS_ATTACK_UP]: status_attack_up,
  [ICON_ID.STATUS_BURNED]: status_burned,
  [ICON_ID.STATUS_FROZEN]: status_frozen,
  [ICON_ID.STATUS_BATTLE_FURY]: status_battle_fury,
  [ICON_ID.STATUS_BLOODLUST]: status_bloodlust,
  [ICON_ID.STATUS_FOCUSED]: status_focused,
  [ICON_ID.STATUS_ENLIGHTENED]: status_enlightened,
  [ICON_ID.STATUS_WEAKENED]: status_weakened,
  [ICON_ID.STATUS_DISABLED]: status_disabled,
  [ICON_ID.STATUS_ENTANGLED]: status_entangled,
};

export const getIconSrc = (icon: ICON_ID) => ICONS[icon] || '';