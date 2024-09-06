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

export const SKILL_ANIMATION_PRESET: Record<SKILL_ID, ISkillAnimation> = {
  [SKILL_ID.CLEAVE]: {
    ...BASE_SKILL_ANIMATION,
    sprite: SPRITE_ID.SKILL_72,
    position: [0, 0],
    duration: 0.7,
    startDelay: 0,
    effectDelay: 50,
    spritesheetRows: 9,
    spritesheetColumns: 10,
    spriteSize: 200,
    animationRow: 7,
  },
  [SKILL_ID.WHIRLWIND]: {
    ...BASE_SKILL_ANIMATION,
    sprite: SPRITE_ID.SKILL_48,
    position: [0, 0],
    duration: 0.6,
    startDelay: 0,
    effectDelay: 200,
    spritesheetRows: 9,
    spritesheetColumns: 16,
    spriteSize: 200,
    animationRow: 7,
  },
  [SKILL_ID.EXECUTE]: {
    ...BASE_SKILL_ANIMATION,
    sprite: SPRITE_ID.SKILL_74,
    position: [0, 0],
    duration: 1,
    startDelay: 0,
    effectDelay: 50,
    spritesheetRows: 9,
    spritesheetColumns: 9,
    spriteSize: 120,
    animationRow: 7,
  },
};
