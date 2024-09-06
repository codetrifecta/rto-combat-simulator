import { ISkillAnimation } from '../types';
import { SKILL_ID } from './skill';
import { SPRITE_ID } from './sprite';
import { TILE_SIZE } from './tile';

export const BASE_SKILL_ANIMATION: ISkillAnimation = {
  sprite: SPRITE_ID.SKILL_72,
  position: [0, 0],
  duration: 0.5,
  startDelay: 0,
  effectDelay: 30,
  spritesheetRows: 9,
  spritesheetColumns: 10,
  spriteSize: 160,
  animationRow: 0,
};

interface IAnimation {
  sprite: SPRITE_ID;
  spritesheetRows: number;
  spritesheetColumns: number;
}

// @ts-expect-error - SPRITE_ID used for the key is only sprite IDs for skill animations
export const ANIMATION_PRESET: Record<SPRITE_ID, IAnimation> = {
  [SPRITE_ID.SKILL_17]: {
    sprite: SPRITE_ID.SKILL_17,
    spritesheetRows: 9,
    spritesheetColumns: 14,
  },
  [SPRITE_ID.SKILL_21]: {
    sprite: SPRITE_ID.SKILL_21,
    spritesheetRows: 9,
    spritesheetColumns: 14,
  },
  [SPRITE_ID.SKILL_22]: {
    sprite: SPRITE_ID.SKILL_22,
    spritesheetRows: 9,
    spritesheetColumns: 14,
  },
  [SPRITE_ID.SKILL_31]: {
    sprite: SPRITE_ID.SKILL_31,
    spritesheetRows: 9,
    spritesheetColumns: 13,
  },
  [SPRITE_ID.SKILL_34]: {
    sprite: SPRITE_ID.SKILL_34,
    spritesheetRows: 9,
    spritesheetColumns: 16,
  },
  [SPRITE_ID.SKILL_39]: {
    sprite: SPRITE_ID.SKILL_39,
    spritesheetRows: 9,
    spritesheetColumns: 16,
  },
  [SPRITE_ID.SKILL_43]: {
    sprite: SPRITE_ID.SKILL_43,
    spritesheetRows: 9,
    spritesheetColumns: 15,
  },
  [SPRITE_ID.SKILL_48]: {
    sprite: SPRITE_ID.SKILL_48,
    spritesheetRows: 9,
    spritesheetColumns: 16,
  },
  [SPRITE_ID.SKILL_64]: {
    sprite: SPRITE_ID.SKILL_64,
    spritesheetRows: 9,
    spritesheetColumns: 8,
  },
  [SPRITE_ID.SKILL_65]: {
    sprite: SPRITE_ID.SKILL_65,
    spritesheetRows: 9,
    spritesheetColumns: 8,
  },
  [SPRITE_ID.SKILL_72]: {
    sprite: SPRITE_ID.SKILL_72,
    spritesheetRows: 9,
    spritesheetColumns: 10,
  },
  [SPRITE_ID.SKILL_74]: {
    sprite: SPRITE_ID.SKILL_74,
    spritesheetRows: 9,
    spritesheetColumns: 9,
  },
  [SPRITE_ID.SKILL_81]: {
    sprite: SPRITE_ID.SKILL_81,
    spritesheetRows: 9,
    spritesheetColumns: 12,
  },
  [SPRITE_ID.SKILL_86]: {
    sprite: SPRITE_ID.SKILL_86,
    spritesheetRows: 9,
    spritesheetColumns: 12,
  },
  [SPRITE_ID.SKILL_90]: {
    sprite: SPRITE_ID.SKILL_90,
    spritesheetRows: 9,
    spritesheetColumns: 10,
  },
  [SPRITE_ID.SKILL_91]: {
    sprite: SPRITE_ID.SKILL_91,
    spritesheetRows: 9,
    spritesheetColumns: 12,
  },
  [SPRITE_ID.SKILL_92]: {
    sprite: SPRITE_ID.SKILL_92,
    spritesheetRows: 9,
    spritesheetColumns: 11,
  },
  [SPRITE_ID.SKILL_100]: {
    sprite: SPRITE_ID.SKILL_100,
    spritesheetRows: 9,
    spritesheetColumns: 11,
  },
  [SPRITE_ID.SKILL_105]: {
    sprite: SPRITE_ID.SKILL_105,
    spritesheetRows: 9,
    spritesheetColumns: 11,
  },
  [SPRITE_ID.SKILL_111]: {
    sprite: SPRITE_ID.SKILL_111,
    spritesheetRows: 9,
    spritesheetColumns: 12,
  },
  [SPRITE_ID.SKILL_119]: {
    sprite: SPRITE_ID.SKILL_119,
    spritesheetRows: 9,
    spritesheetColumns: 12,
  },
  [SPRITE_ID.SKILL_125]: {
    sprite: SPRITE_ID.SKILL_125,
    spritesheetRows: 9,
    spritesheetColumns: 12,
  },
  [SPRITE_ID.SKILL_128]: {
    sprite: SPRITE_ID.SKILL_128,
    spritesheetRows: 9,
    spritesheetColumns: 12,
  },
  [SPRITE_ID.SKILL_132]: {
    sprite: SPRITE_ID.SKILL_132,
    spritesheetRows: 9,
    spritesheetColumns: 12,
  },
  [SPRITE_ID.SKILL_133]: {
    sprite: SPRITE_ID.SKILL_133,
    spritesheetRows: 9,
    spritesheetColumns: 12,
  },
  [SPRITE_ID.SKILL_135]: {
    sprite: SPRITE_ID.SKILL_135,
    spritesheetRows: 9,
    spritesheetColumns: 12,
  },
  [SPRITE_ID.SKILL_137]: {
    sprite: SPRITE_ID.SKILL_137,
    spritesheetRows: 9,
    spritesheetColumns: 11,
  },
};

export const SKILL_ANIMATION_PRESET: Record<SKILL_ID, ISkillAnimation> = {
  // Strength skills
  [SKILL_ID.CLEAVE]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_72],
    position: [0, 0],
    duration: 0.7,
    startDelay: 0,
    effectDelay: 50,
    spriteSize: 200,
    animationRow: 7,
    yOffset: -TILE_SIZE / 3,
  },
  [SKILL_ID.WHIRLWIND]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_48],
    position: [0, 0],
    duration: 0.6,
    startDelay: 0,
    effectDelay: 200,
    spriteSize: 200,
    animationRow: 7,
  },
  [SKILL_ID.EXECUTE]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_74],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 50,
    spriteSize: 120,
    animationRow: 7,
  },
  [SKILL_ID.ANNIHILATE]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_17],
    position: [0, 0],
    duration: 0.9,
    startDelay: 0,
    effectDelay: 200,
    spriteSize: 120,
    animationRow: 7,
  },
  [SKILL_ID.WRATH_OF_THE_ANCIENTS]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_125],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 400,
    spriteSize: 350,
    animationRow: 5,
  },
  [SKILL_ID.SHADOW_STRIKE]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_43],
    position: [0, 0],
    duration: 0.5,
    startDelay: 0,
    effectDelay: 100,
    spriteSize: 100,
    animationRow: 1,
    yOffset: -TILE_SIZE / 3,
  },
  [SKILL_ID.KNIFE_BARRAGE]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_91],
    position: [0, 0],
    duration: 0.7,
    startDelay: 0,
    effectDelay: 150,
    spriteSize: 500,
    animationRow: 1,
  },
  [SKILL_ID.POISON_STRIKE]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_43],
    position: [0, 0],
    duration: 0.5,
    startDelay: 0,
    effectDelay: 100,
    spriteSize: 100,
    animationRow: 3,
    yOffset: -TILE_SIZE / 3,
  },
  [SKILL_ID.DISABLING_BLOW]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_91],
    position: [0, 0],
    duration: 0.7,
    startDelay: 0,
    effectDelay: 50,
    spriteSize: 150,
    animationRow: 7,
    yOffset: -TILE_SIZE / 3,
  },
  [SKILL_ID.PUNCTURE_STRIKE]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_31],
    position: [0, 0],
    duration: 0.5,
    startDelay: 0,
    effectDelay: 100,
    spriteSize: 100,
    animationRow: 7,
    yOffset: -TILE_SIZE / 3,
  },
  [SKILL_ID.AIR_SLASH]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_92],
    position: [0, 0],
    duration: 0.7,
    startDelay: 0,
    effectDelay: 100,
    spriteSize: 200,
    animationRow: 7,
    yOffset: -TILE_SIZE / 3,
  },

  // Intelligence skills
  [SKILL_ID.MANA_BURST]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_111],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 150,
    spriteSize: 250,
    animationRow: 2,
  },
  [SKILL_ID.FLAME_TOUCH]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_119],
    position: [0, 0],
    duration: 0.8,
    startDelay: 0,
    effectDelay: 50,
    spriteSize: 80,
    animationRow: 0,
  },
  [SKILL_ID.FIREBALL]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_105],
    position: [0, 0],
    duration: 0.8,
    startDelay: 0,
    effectDelay: 100,
    spriteSize: 200,
    animationRow: 0,
  },
  [SKILL_ID.SUPERNOVA]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_132],
    position: [0, 0],
    duration: 0.7,
    startDelay: 0,
    effectDelay: 150,
    spriteSize: 320,
    animationRow: 0,
  },
  [SKILL_ID.FROST_TOUCH]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_119],
    position: [0, 0],
    duration: 0.8,
    startDelay: 0,
    effectDelay: 50,
    spriteSize: 80,
    animationRow: 2,
  },
  [SKILL_ID.FREEZE]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_128],
    position: [0, 0],
    duration: 1.2,
    startDelay: 0,
    effectDelay: 50,
    spriteSize: 120,
    animationRow: 2,
    yOffset: -TILE_SIZE / 3,
  },
  [SKILL_ID.BLIZZARD]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_105],
    position: [0, 0],
    duration: 0.8,
    startDelay: 0,
    effectDelay: 100,
    spriteSize: 200,
    animationRow: 2,
  },
  [SKILL_ID.SHOCK_TOUCH]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_65],
    position: [0, 0],
    duration: 0.8,
    startDelay: 0,
    effectDelay: 50,
    spriteSize: 80,
    animationRow: 4,
    yOffset: -TILE_SIZE / 3,
  },
  [SKILL_ID.SPARK]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_137],
    position: [0, 0],
    duration: 0.8,
    startDelay: 0,
    effectDelay: 50,
    spriteSize: 80,
    animationRow: 4,
    yOffset: -TILE_SIZE / 3,
  },
  [SKILL_ID.LIGHTNING]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_135],
    position: [0, 0],
    duration: 0.8,
    startDelay: 0,
    effectDelay: 50,
    spriteSize: 100,
    animationRow: 4,
    yOffset: -TILE_SIZE / 3,
  },
  [SKILL_ID.STORM_PULSE]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_133],
    position: [0, 0],
    duration: 0.8,
    startDelay: 0,
    effectDelay: 100,
    spriteSize: 350,
    animationRow: 4,
  },
  [SKILL_ID.ABSORB]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_100],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 50,
    spriteSize: 120,
    animationRow: 1,
    yOffset: -TILE_SIZE / 3,
  },

  // Self targeted skills
  [SKILL_ID.FLEX]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_81],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 50,
    spriteSize: 120,
    animationRow: 7,
  },
  [SKILL_ID.ENLIGHTEN]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_81],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 50,
    spriteSize: 120,
    animationRow: 2,
  },
  [SKILL_ID.FOCUS]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_21],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 50,
    spriteSize: 120,
    animationRow: 5,
  },
  [SKILL_ID.IRONFLESH]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_81],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 50,
    spriteSize: 120,
    animationRow: 6,
  },
  [SKILL_ID.WARCRY]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_22],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 1,
    spriteSize: 250,
    animationRow: 7,
  },
  [SKILL_ID.BLOODLUST]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_21],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 50,
    spriteSize: 120,
    animationRow: 8,
  },
  [SKILL_ID.BERSERK]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_34],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 50,
    spriteSize: 120,
    animationRow: 7,
  },
  [SKILL_ID.FRENZY]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_34],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 1,
    spriteSize: 120,
    animationRow: 1,
  },
  [SKILL_ID.DEFLECT]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_21],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 1,
    spriteSize: 120,
    animationRow: 0,
  },
  [SKILL_ID.ARCANE_INTELLECT]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_22],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 1,
    spriteSize: 200,
    animationRow: 2,
  },
  [SKILL_ID.SWIFT_MOVEMENT]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_21],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 50,
    spriteSize: 120,
    animationRow: 3,
  },
  [SKILL_ID.INSTINCTUAL_DODGE]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_21],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 50,
    spriteSize: 120,
    animationRow: 5,
  },
  [SKILL_ID.HIDE]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_39],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 100,
    spriteSize: 100,
    animationRow: 5,
    yOffset: -TILE_SIZE / 2,
  },
  [SKILL_ID.FIREBRAND]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_64],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 100,
    spriteSize: 120,
    animationRow: 0,
    yOffset: -TILE_SIZE * 1.1,
  },
  [SKILL_ID.ICEBRAND]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_64],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 100,
    spriteSize: 120,
    animationRow: 2,
    yOffset: -TILE_SIZE * 1.1,
  },
  [SKILL_ID.STORMBRAND]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_64],
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 100,
    spriteSize: 120,
    animationRow: 4,
    yOffset: -TILE_SIZE * 1.1,
  },
};
