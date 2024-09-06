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
    duration: 0.5,
    startDelay: 0,
    effectDelay: 30,
    spritesheetRows: 9,
    spritesheetColumns: 10,
    spriteSize: 160,
    animationRow: 7,
  },
};
