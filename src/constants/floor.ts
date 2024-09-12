import { IFloor } from '../types';
import { ENEMY_PRESET_ID, ENEMY_PRESETS, ENTITY_TYPE } from './entity';
import { BASE_ROOM, ROOM_TYPE } from './room';

const createTutorialFloor = () => {
  let id = 0;
  const tutorialFloor: IFloor = [];

  for (let row = 0; row < 3; row++) {
    tutorialFloor[row] = [];
    for (let col = 0; col < 3; col++) {
      tutorialFloor[row][col] = {
        ...BASE_ROOM,
        id: id++,
        position: [row, col],
        roomTileMatrix: [
          [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
          [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
          [3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3],
          [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
          [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
          [3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 3],
          [4, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 4],
          [4, 1, 1, 2, 2, 1, 1, 1, 0, 0, 1, 1, 1, 1, 4],
          [4, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 4],
          [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
          [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
          [3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
          [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 3],
          [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
          [3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3],
        ],
      };
    }
  }

  tutorialFloor[0][2] = {
    ...tutorialFloor[0][2],
    type: ROOM_TYPE.BOSS,
    southDoor: true,
    enemies: [
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.INFERNAL_MINOTAUR],
        id: 4,
      },
    ],
    roomEntityPositions: new Map([
      ['5,3', [ENTITY_TYPE.ENEMY, 3]],
      ['3,7', [ENTITY_TYPE.ENEMY, 4]],
    ]),
  };
  tutorialFloor[1][2] = {
    ...tutorialFloor[1][2],
    type: ROOM_TYPE.COMMON,
    northDoor: true,
    southDoor: true,
    enemies: [
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.STYGIAN_WRAITH],
        id: 2,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.ABYSSAL_CYCLOPEAN_WRAITH],
        id: 3,
      },
    ],
    roomEntityPositions: new Map([
      ['8,6', [ENTITY_TYPE.ENEMY, 2]],
      ['5,3', [ENTITY_TYPE.ENEMY, 3]],
    ]),
  };
  tutorialFloor[2][2] = {
    ...tutorialFloor[2][2],
    type: ROOM_TYPE.COMMON,
    westDoor: true,
    northDoor: true,
    enemies: [
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.CERBERUS_PUP],
        id: 1,
      },
    ],
    roomEntityPositions: new Map([['11,12', [ENTITY_TYPE.ENEMY, 1]]]),
  };
  tutorialFloor[2][1] = {
    ...tutorialFloor[2][1],
    type: ROOM_TYPE.START,
    eastDoor: true,
    isCleared: true,
  };

  return tutorialFloor;
};

export const TUTORIAL_FLOOR: IFloor = createTutorialFloor();
