import enemy_demon_02 from '../assets/sprites/enemies/sprite_enemy_demon_02.png';
import enemy_demon_10 from '../assets/sprites/enemies/sprite_enemy_demon_10.png';
import enemy_demon_12 from '../assets/sprites/enemies/sprite_enemy_demon_12.png';
import enemy_demon_13 from '../assets/sprites/enemies/sprite_enemy_demon_13.png';

export const SPRITE_SIZE = 64;

export enum SPRITE_ID {
  DEMON_02 = 'DEMON_02',
  DEMON_10 = 'DEMON_10',
  DEMON_12 = 'DEMON_12',
  DEMON_13 = 'DEMON_13',
}

export const SPRITES: Record<SPRITE_ID, string> = {
  [SPRITE_ID.DEMON_02]: enemy_demon_02,
  [SPRITE_ID.DEMON_10]: enemy_demon_10,
  [SPRITE_ID.DEMON_12]: enemy_demon_12,
  [SPRITE_ID.DEMON_13]: enemy_demon_13,
};

export const getSpriteSrc = (sprite: SPRITE_ID) => SPRITES[sprite] || '';
