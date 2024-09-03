import { ISkill } from '../types';
import { ICON_ID } from './icon';

export enum SKILL_TYPE {
  SELF = 'self',
  ST = 'st',
  AOE = 'aoe',
}
export enum SKILL_TAG {
  SELF = 'self',
  SINGLE_TARGET = 'single_target',
  AOE = 'aoe',
  DAMAGE = 'damage',
  STATUS = 'status',
  MOVEMENT = 'movement',
  SUMMON = 'summon',
}

let id = 1;

export enum SKILL_ID {
  FLEX = id++,
  GORGONS_GAZE = id++,
  LIGHTNING = id++,
  FLY = id++,
  WHIRLWIND = id++,
  IRONFLESH = id++,
  FIREBALL = id++,
  FREEZE = id++,
  ABSORB = id++,
  EXECUTE = id++,
  CLEAVE = id++,
  ANNIHILATE = id++,
  WARCRY = id++,
  BLOODLUST = id++,
  FOCUS = id++,
  ENLIGHTEN = id++,
  WEAKEN = id++,
  DISABLE = id++,
  ENTANGLE = id++,
  LEAP_SLAM = id++,
  FLAME_DIVE = id++,
  HIDE = id++,
  SHADOW_STRIKE = id++,
  SWIFT_MOVEMENT = id++,
  THROWING_KNIVES = id++,
  BODY_DOUBLE = id++,
  INSTINCTUAL_DODGE = id++,
  BLOODLETTING = id++,
  POISON_STRIKE = id++,
  DISABLING_BLOW = id++,
  PUNCTURE_STRIKE = id++,
  BERSERK = id++,
  FRENZY = id++,
  DEFLECT = id++,
  AIR_SLASH = id++,
  FLYING_KICK = id++,
  FIREBRAND = id++,
  ICEBRAND = id++,
  STORMBRAND = id++,
  WRATH_OF_THE_ANCIENTS = id++,
  SHIELD_OF_THE_ANCIENTS = id++,
  MANA_BURST = id++,
  ARCANE_INTELLECT = id++,
  FLAME_TOUCH = id++,
  SUPERNOVA = id++,
}

export const weaponBasedSkillIDs: SKILL_ID[] = [
  SKILL_ID.WHIRLWIND,
  SKILL_ID.EXECUTE,
  SKILL_ID.CLEAVE,
  SKILL_ID.ANNIHILATE,
  SKILL_ID.SHADOW_STRIKE,
  SKILL_ID.THROWING_KNIVES,
  SKILL_ID.POISON_STRIKE,
  SKILL_ID.DISABLING_BLOW,
  SKILL_ID.PUNCTURE_STRIKE,
  SKILL_ID.AIR_SLASH,
];

export const weaponRangeBasedSkillIDs: SKILL_ID[] = [
  SKILL_ID.WHIRLWIND,
  SKILL_ID.EXECUTE,
  SKILL_ID.CLEAVE,
  SKILL_ID.ANNIHILATE,
  SKILL_ID.SHADOW_STRIKE,
  SKILL_ID.POISON_STRIKE,
  SKILL_ID.DISABLING_BLOW,
  SKILL_ID.PUNCTURE_STRIKE,
];

export const strengthBasedSkillIDs: SKILL_ID[] = [
  SKILL_ID.WHIRLWIND,
  SKILL_ID.EXECUTE,
  SKILL_ID.CLEAVE,
  SKILL_ID.ANNIHILATE,
  SKILL_ID.LEAP_SLAM,
  SKILL_ID.SHADOW_STRIKE,
  SKILL_ID.THROWING_KNIVES,
  SKILL_ID.POISON_STRIKE,
  SKILL_ID.DISABLING_BLOW,
  SKILL_ID.PUNCTURE_STRIKE,
  SKILL_ID.AIR_SLASH,
  SKILL_ID.FLYING_KICK,
  SKILL_ID.WRATH_OF_THE_ANCIENTS,
];

export const intelligenceBasedSkillIDs: SKILL_ID[] = [
  SKILL_ID.LIGHTNING,
  SKILL_ID.FIREBALL,
  SKILL_ID.FREEZE,
  SKILL_ID.ABSORB,
  SKILL_ID.FLAME_DIVE,
];

export const SKILLS: ISkill[] = [
  // Strength-based skills
  {
    id: SKILL_ID.CLEAVE,
    name: 'Cleave',
    icon: ICON_ID.SKILL_CLEAVE,
    skillType: SKILL_TYPE.AOE,
    tags: [SKILL_TAG.AOE, SKILL_TAG.DAMAGE],
    description:
      "Cleave through enemies in front of you. Range is dependent on the player's current weapon.",
    damageMultiplier: 1.5,
    range: 1,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.WHIRLWIND,
    name: 'Whirlwind',
    icon: ICON_ID.SKILL_WHIRLWIND,
    skillType: SKILL_TYPE.AOE,
    tags: [SKILL_TAG.AOE, SKILL_TAG.DAMAGE],
    description:
      "Spin around dealing damage to all adjacent enemies. Range is dependent on the player's current weapon.",
    damageMultiplier: 1,
    range: 1,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.EXECUTE,
    name: 'Execute',
    icon: ICON_ID.SKILL_EXECUTE,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.DAMAGE],
    description:
      "Execute an enemy with low health. Deals 2x damage to enemies with less than 25% health. If the enemy is executed, the player gains 2 AP. Range is dependent on the player's current weapon.",
    damageMultiplier: 1,
    range: 1,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.ANNIHILATE,
    name: 'Annihilate',
    icon: ICON_ID.SKILL_ANNIHILATE,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.DAMAGE],
    description:
      'As you brace yourself, swing with all your might to deal a devastating blow to an enemy. Range is dependent on the player’s current weapon.',
    damageMultiplier: 3.5,
    range: 1,
    cooldown: 4,
    cooldownCounter: 0,
    cost: 5,
  },
  {
    id: SKILL_ID.SHADOW_STRIKE,
    name: 'Shadow Strike',
    icon: ICON_ID.SKILL_SHADOW_STRIKE,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.DAMAGE, SKILL_TAG.STATUS],
    description:
      'Deal critical damage to an enemy. Damage is doubled if used when hidden. Deal bleeding to an enemy for 1 turns.',
    damageMultiplier: 1.5,
    range: 1,
    cooldown: 2,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.THROWING_KNIVES,
    name: 'Knife Barrage',
    icon: ICON_ID.SKILL_THROWING_KNIVES,
    skillType: SKILL_TYPE.AOE,
    tags: [SKILL_TAG.AOE, SKILL_TAG.DAMAGE, SKILL_TAG.STATUS],
    description:
      'Throw a barrage of knives in all directions, dealing your normal amount of damage. 15% chance of dealing 100% more of base damage (critical hit) for each enemy. And deal bleeding to them for 1 turn.',
    damageMultiplier: 1,
    range: 4,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 3,
  },
  {
    id: SKILL_ID.POISON_STRIKE,
    name: 'Poison Strike',
    icon: ICON_ID.SKILL_POISON_STRIKE,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.DAMAGE, SKILL_TAG.STATUS],
    description:
      'Coat your weapon with poison. Deal increased damage and inflict poisoned for 3 turns.',
    damageMultiplier: 1.2,
    range: 1,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 3,
  },
  {
    id: SKILL_ID.DISABLING_BLOW,
    name: 'Disabling Blow',
    icon: ICON_ID.SKILL_DISABLING_BLOW,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.DAMAGE, SKILL_TAG.STATUS],
    description: 'Strike a target, applying disabled on them for 1 turns.',
    damageMultiplier: 1.2,
    range: 1,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.PUNCTURE_STRIKE,
    name: 'Puncture Strike',
    icon: ICON_ID.SKILL_PUNCTURE_STRIKE,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.DAMAGE, SKILL_TAG.STATUS],
    description:
      'Puncture a target with a strike that wounds them. Applies wounded to a target for 2 turns.',
    damageMultiplier: 1.2,
    range: 1,
    cooldown: 4,
    cooldownCounter: 0,
    cost: 3,
  },
  {
    id: SKILL_ID.AIR_SLASH,
    name: 'Air Slash',
    icon: ICON_ID.SKILL_AIR_SLASH,
    skillType: SKILL_TYPE.AOE,
    tags: [SKILL_TAG.AOE, SKILL_TAG.DAMAGE],
    description:
      'Slash the air in front of you, dealing damage to enemies at further range.',
    damageMultiplier: 1.3,
    range: 4,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.WRATH_OF_THE_ANCIENTS,
    name: 'Wrath of the Ancients',
    icon: ICON_ID.SKILL_WRATH_OF_THE_ANCIENTS,
    skillType: SKILL_TYPE.AOE,
    tags: [SKILL_TAG.AOE, SKILL_TAG.DAMAGE, SKILL_TAG.STATUS],
    description:
      'Channel the wrath of the ancients, dealing damage to all enemies in an area around you. Has a 50% chance to apply weakened to enemies hit for 3 turns.',
    damageMultiplier: 3,
    range: 3,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 6,
  },

  // Defense-based skills
  // {
  //   id: SKILL_ID.SHIELD_OF_THE_ANCIENTS,
  //   name: 'Shield of the Ancients',
  //   icon: ICON_ID.SKILL_SHIELD_OF_THE_ANCIENTS,
  //   skillType: SKILL_TYPE.SELF,
  //   tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
  //   description:
  //     'Channel the shield of the ancients, gaining a shield that absorbs all of incoming damage for 5 turns.',
  //   damageMultiplier: 0,
  //   range: 0,
  //   cooldown: 5,
  //   cooldownCounter: 0,
  //   cost: 6,
  // },

  // Intelligence-based skills
  {
    id: SKILL_ID.LIGHTNING,
    name: 'Spark',
    icon: ICON_ID.SKILL_LIGHTNING,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.DAMAGE],
    description:
      'Strike a target with lighning sparks. Has a 40% chance to shock target for 2 turn.',
    damageMultiplier: 2,
    range: 4,
    cooldown: 1,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.FIREBALL,
    name: 'Fireball',
    icon: ICON_ID.SKILL_FIREBALL,
    skillType: SKILL_TYPE.AOE,
    tags: [SKILL_TAG.AOE, SKILL_TAG.DAMAGE, SKILL_TAG.STATUS],
    description:
      'Launch a fireball at a target area. Has a 50% chance to burn targets hit for 3 turns.',
    damageMultiplier: 1.5,
    range: 4,
    cooldown: 2,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.ABSORB,
    name: 'Absorb',
    icon: ICON_ID.SKILL_ABSORB,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.DAMAGE],
    description:
      "Absorb an enemy's life force. Enemy health lost is converted to caster's health.",
    damageMultiplier: 0.5,
    range: 3,
    cooldown: 2,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.MANA_BURST,
    name: 'Mana Burst',
    icon: ICON_ID.SKILL_MANA_BURST,
    skillType: SKILL_TYPE.AOE,
    tags: [SKILL_TAG.AOE, SKILL_TAG.DAMAGE],
    description:
      'A powerful burst of energy that damages all enemies in a target area. Deals heavy AoE damage.',
    damageMultiplier: 2.7,
    range: 2,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 3,
  },
  {
    id: SKILL_ID.ARCANE_INTELLECT,
    name: 'Arcane Intellect',
    icon: ICON_ID.SKILL_ARCANE_INTELLECT,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description:
      'Increases intelligence and AP cost regeneration, enhancing spellcasting abilities.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.FLAME_TOUCH,
    name: 'Flame Touch',
    icon: ICON_ID.SKILL_FLAME_TOUCH,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.DAMAGE, SKILL_TAG.STATUS],
    description:
      "The caster's hand ignites with fire, allowing them to deal fire damage to a single target within melee range. The target also receives a guaranteed burn status, dealing additional damage over 4 turns.",
    damageMultiplier: 2,
    range: 1,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.SUPERNOVA,
    name: 'Supernova',
    icon: ICON_ID.SKILL_SUPERNOVA,
    skillType: SKILL_TYPE.AOE,
    tags: [SKILL_TAG.AOE, SKILL_TAG.DAMAGE, SKILL_TAG.STATUS],
    description:
      'Explode immediate surroundings,dealing fire damage and has a high chance to inflict burn status to enemies.',
    damageMultiplier: 2.5,
    range: 2,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 3,
  },

  // Self-targeted skills
  {
    id: SKILL_ID.FLEX,
    name: 'Flex',
    icon: ICON_ID.SKILL_FLEX,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description:
      'Applies Flexed on self for 3 turns. Flexed increases strength by 30%.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 1,
  },
  {
    id: SKILL_ID.IRONFLESH,
    name: 'Ironflesh',
    icon: ICON_ID.SKILL_DEFENSE_UP,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description:
      'Applies Stone Skin on self for 3 turns. Stone Skin increases defense by 30%.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 1,
  },
  {
    id: SKILL_ID.WARCRY,
    name: 'Warcry',
    icon: ICON_ID.SKILL_WARCRY,
    skillType: SKILL_TYPE.AOE,
    tags: [SKILL_TAG.AOE, SKILL_TAG.STATUS],
    description:
      "Unleash a warcry to boost your courage. Gain Battle Fury for 3 turns. Battle Fury's efffects stacks with the amount of enemies in range",
    damageMultiplier: 0,
    range: 3,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.BLOODLUST,
    name: 'Bloodlust',
    icon: ICON_ID.SKILL_BLOODLUST,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description: 'Enter a state of Bloodlust for 3 turns.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.FOCUS,
    name: 'Focus',
    icon: ICON_ID.SKILL_FOCUS,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description:
      'Gain Focused for 3 turns. Focused increases strength and intelligence by 15%.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 1,
  },
  {
    id: SKILL_ID.ENLIGHTEN,
    name: 'Enlighten',
    icon: ICON_ID.SKILL_ENLIGHTEN,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description:
      'Gain Enlightened for 3 turns. Enlightened increases intelligence by 30%.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 1,
  },
  {
    id: SKILL_ID.HIDE,
    name: 'Hide',
    icon: ICON_ID.SKILL_HIDE,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description:
      'Become hidden to enemies, stopping them from seeing and attacking you for 2 turns.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 4,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.SWIFT_MOVEMENT,
    name: 'Swift Movement',
    icon: ICON_ID.SKILL_SWIFT_MOVEMENT,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description:
      'Gain swiftness for 2 turns. Use 1 AP to move 3 tiles instead of 2. Gain 1 additional AP per turn for the duration',
    damageMultiplier: 0,
    range: 0,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 1,
  },
  {
    id: SKILL_ID.INSTINCTUAL_DODGE,
    name: 'Instinctual Dodge',
    icon: ICON_ID.SKILL_INSTINCTUAL_DODGE,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description: 'Gain dodging for 3 turns, increasing dodge chance by 50%.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 4,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.BERSERK,
    name: 'Berserk',
    icon: ICON_ID.SKILL_BERSERK,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description:
      'Enter a state of Berserk for 3 turns. Berserk increases strength based off missing health.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 4,
    cooldownCounter: 0,
    cost: 1,
  },
  {
    id: SKILL_ID.FRENZY,
    name: 'Frenzy',
    icon: ICON_ID.SKILL_FRENZY,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description:
      'Enter a state of Frenzy for 3 turns. Frenzy sharply increases strength for reduced defense.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 4,
    cooldownCounter: 0,
    cost: 1,
  },
  {
    id: SKILL_ID.DEFLECT,
    name: 'Deflect',
    icon: ICON_ID.SKILL_DEFLECT,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description:
      'Gain Deflect for 3 turns. Deflect reduces and reflects incoming damage back to the attacker.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.FIREBRAND,
    name: 'Firebrand',
    icon: ICON_ID.SKILL_FIREBRAND,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description:
      'Ignite your weapon with fire for 5 turns and gain firebranded. Damaging skills and attacks has a chance to ignite targets. You deal more damage to burning targets.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 5,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.ICEBRAND,
    name: 'Icebrand',
    icon: ICON_ID.SKILL_ICEBRAND,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description:
      'Frost your weapon with ice for 5 turns and gain icebranded. Damaging skills and attacks has a chance to freeze targets. You deal more damage to frozen targets.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 5,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.STORMBRAND,
    name: 'Stormbrand',
    icon: ICON_ID.SKILL_STORMBRAND,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description:
      'Charge your weapon with lightning for 5 turns and gain stormbranded. Damaging skills and attacks has a chance to shock targets. You deal more damage to shocked targets.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 5,
    cooldownCounter: 0,
    cost: 2,
  },

  // Debuff skills
  {
    id: SKILL_ID.GORGONS_GAZE,
    name: "Gorgon's Gaze",
    icon: ICON_ID.SKILL_PETRIFY,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.STATUS],
    description:
      'Petrify an enemy for 3 turns. Petrified enemies cannot move or attack.',
    damageMultiplier: 0,
    range: 4,
    cooldown: 4,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.FREEZE,
    name: 'Freeze',
    icon: ICON_ID.SKILL_FREEZE,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.STATUS],
    description:
      'Freeze an enemy for 2 turns. Frozen enemies cannot move or attack.',
    damageMultiplier: 0,
    range: 3,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.WEAKEN,
    name: 'Weaken',
    icon: ICON_ID.SKILL_WEAKEN,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.STATUS],
    description:
      'Weaken an enemy for 3 turns. Weakened enemies deal 30% less damage.',
    damageMultiplier: 0,
    range: 3,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.DISABLE,
    name: 'Disable',
    icon: ICON_ID.SKILL_DISABLE,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.STATUS],
    description:
      'Disable an enemy for 3 turns. Disabled enemies cannot attack.',
    damageMultiplier: 0,
    range: 3,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.ENTANGLE,
    name: 'Entangle',
    icon: ICON_ID.SKILL_ENTANGLE,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.STATUS],
    description:
      'Entangle an enemy for 3 turns. Entangled enemies cannot move.',
    damageMultiplier: 0,
    range: 3,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  // {
  //   id: SKILL_ID.BLOODLETTING,
  //   name: 'Bloodletting',
  //   icon: ICON_ID.SKILL_BLOODLETTING,
  //   skillType: SKILL_TYPE.ST,
  //   tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.STATUS],
  //   description: 'Apply bloodletting to an enemy for 2 turns.',
  //   damageMultiplier: 0,
  //   range: 1,
  //   cooldown: 4,
  //   cooldownCounter: 0,
  //   cost: 3,
  // },

  // Movement skills
  {
    id: SKILL_ID.FLY,
    name: 'Fly',
    icon: ICON_ID.SKILL_FLY,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.MOVEMENT],
    description: 'Fly to an empty tile in the room.',
    damageMultiplier: 0,
    range: 6,
    cooldown: 4,
    cooldownCounter: 0,
    cost: 1,
  },
  {
    id: SKILL_ID.LEAP_SLAM,
    name: 'Leap Slam',
    icon: ICON_ID.SKILL_LEAP_SLAM,
    skillType: SKILL_TYPE.AOE,
    tags: [SKILL_TAG.AOE, SKILL_TAG.DAMAGE, SKILL_TAG.MOVEMENT],
    description:
      'Leap slam to a location and deal damage around your landing position.',
    damageMultiplier: 1,
    range: 4,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.FLAME_DIVE,
    name: 'Flame Dive',
    icon: ICON_ID.SKILL_FLAME_DIVE,
    skillType: SKILL_TYPE.AOE,
    tags: [
      SKILL_TAG.AOE,
      SKILL_TAG.DAMAGE,
      SKILL_TAG.STATUS,
      SKILL_TAG.MOVEMENT,
    ],
    description:
      'Dive to a location and deal damage to enemies around your landing position. Additionally applies Burned to enemies hit for 3 turns.',
    damageMultiplier: 0.5,
    range: 5,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.FLYING_KICK,
    name: 'Flying Kick',
    icon: ICON_ID.SKILL_FLYING_KICK,
    skillType: SKILL_TYPE.AOE,
    tags: [SKILL_TAG.AOE, SKILL_TAG.DAMAGE, SKILL_TAG.MOVEMENT],
    description: 'Leap to a target and deal damage.',
    damageMultiplier: 1,
    range: 3,
    cooldown: 2,
    cooldownCounter: 0,
    cost: 2,
  },

  // Summon skills
  // Post MVP
  // {
  //   id: SKILL_ID.BODY_DOUBLE,
  //   name: 'Body Double',
  //   icon: ICON_ID.SKILL_BODY_DOUBLE,
  //   skillType: SKILL_TYPE.ST,
  //   tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.SUMMON],
  //   description:
  //     'Create a body double of yourself that enemies can target for 3 turns. The double has 50% of your health and does no action.',
  //   damageMultiplier: 0,
  //   range: 5,
  //   cooldown: 4,
  //   cooldownCounter: 0,
  //   cost: 3,
  // },
];

export const selfTargetedSkillIDs: SKILL_ID[] = SKILLS.filter((skill) =>
  skill.tags.some((tag) => tag === SKILL_TAG.SELF)
).map((skill) => skill.id);

export const singleTargetSkillIDs: SKILL_ID[] = SKILLS.filter((skill) =>
  skill.tags.some((tag) => tag === SKILL_TAG.SINGLE_TARGET)
).map((skill) => skill.id);

export const aoeSkillIDs: SKILL_ID[] = SKILLS.filter((skill) =>
  skill.tags.some((tag) => tag === SKILL_TAG.AOE)
).map((skill) => skill.id);
