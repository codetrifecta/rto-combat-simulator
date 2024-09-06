import { ISkillAnimation } from '../types';
import { SKILL_ID } from './skill';
import { SPRITE_ID } from './sprite';

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
  [SPRITE_ID.SKILL_31]: {
    sprite: SPRITE_ID.SKILL_31,
    spritesheetRows: 9,
    spritesheetColumns: 13,
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
  [SPRITE_ID.SKILL_125]: {
    sprite: SPRITE_ID.SKILL_125,
    spritesheetRows: 9,
    spritesheetColumns: 12,
  },
};

export const SKILL_ANIMATION_PRESET: Record<SKILL_ID, ISkillAnimation> = {
  [SKILL_ID.CLEAVE]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_72],
    position: [0, 0],
    duration: 0.7,
    startDelay: 0,
    effectDelay: 50,
    spriteSize: 200,
    animationRow: 7,
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
    effectDelay: 150,
    spriteSize: 100,
    animationRow: 1,
  },
  [SKILL_ID.KNIFE_BARRAGE]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_43],
    position: [0, 0],
    duration: 0.6,
    startDelay: 0,
    effectDelay: 200,
    spriteSize: 500,
    animationRow: 1,
  },
  [SKILL_ID.POISON_STRIKE]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_43],
    position: [0, 0],
    duration: 0.5,
    startDelay: 0,
    effectDelay: 150,
    spriteSize: 100,
    animationRow: 3,
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
  },
  [SKILL_ID.AIR_SLASH]: {
    ...BASE_SKILL_ANIMATION,
    ...ANIMATION_PRESET[SPRITE_ID.SKILL_92],
    position: [0, 0],
    duration: 0.7,
    startDelay: 0,
    effectDelay: 100,
    spriteSize: 170,
    animationRow: 7,
  },
};
