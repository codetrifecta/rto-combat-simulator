import { IHelmet, IChestpiece, ILegging } from '../types';
import { ICON_ID } from './icon';

export const HELMETS: IHelmet[] = [
  {
    id: 1,
    name: 'Leather Helmet',
    icon: ICON_ID.HELMET_LEATHER_1,
    stats: {
      defense: 3,
      strength: 2,
      intelligence: 0,
      constitution: 3,
    },
  },
  {
    id: 2,
    name: 'Leather Wizard Hat',
    icon: ICON_ID.HELMET_LEATHER_2,
    stats: {
      defense: 3,
      strength: 0,
      intelligence: 2,
      constitution: 3,
    },
  },
  {
    id: 3,
    name: 'Steel Helmet',
    icon: ICON_ID.HELMET_STEEL_1,
    stats: {
      defense: 4,
      strength: 3,
      intelligence: 1,
      constitution: 4,
    },
  },
  {
    id: 4,
    name: 'Steel Wizard Hat',
    icon: ICON_ID.HELMET_STEEL_2,
    stats: {
      defense: 4,
      strength: 1,
      intelligence: 3,
      constitution: 1,
    },
  },
  {
    id: 5,
    name: 'Gold Helmet',
    icon: ICON_ID.HELMET_GOLD_1,
    stats: {
      defense: 5,
      strength: 3,
      intelligence: 1,
      constitution: 5,
    },
  },
  {
    id: 6,
    name: 'Gold Wizard Hat',
    icon: ICON_ID.HELMET_GOLD_2,
    stats: {
      defense: 5,
      strength: 1,
      intelligence: 3,
      constitution: 5,
    },
  },
  {
    id: 7,
    name: 'Diamond Helmet',
    icon: ICON_ID.HELMET_DIAMOND_1,
    stats: {
      defense: 6,
      strength: 4,
      intelligence: 1,
      constitution: 6,
    },
  },
  {
    id: 8,
    name: 'Diamond Wizard Hat',
    icon: ICON_ID.HELMET_DIAMOND_2,
    stats: {
      defense: 6,
      strength: 1,
      intelligence: 4,
      constitution: 6,
    },
  },
];

export const CHESTPIECES: IChestpiece[] = [
  {
    id: 1,
    name: 'Leather Chestpiece',
    icon: ICON_ID.CHESTPIECE_LEATHER_1,
    stats: {
      defense: 5,
      strength: 3,
      intelligence: 0,
      constitution: 5,
    },
  },
  {
    id: 2,
    name: 'Leather Wizard Robes',
    icon: ICON_ID.CHESTPIECE_LEATHER_2,
    stats: {
      defense: 5,
      strength: 0,
      intelligence: 3,
      constitution: 5,
    },
  },
  {
    id: 3,
    name: 'Steel Chestpiece',
    icon: ICON_ID.CHESTPIECE_STEEL_1,
    stats: {
      defense: 6,
      strength: 4,
      intelligence: 1,
      constitution: 6,
    },
  },
  {
    id: 4,
    name: 'Steel Wizard Robes',
    icon: ICON_ID.CHESTPIECE_STEEL_2,
    stats: {
      defense: 6,
      strength: 1,
      intelligence: 4,
      constitution: 6,
    },
  },
  {
    id: 5,
    name: 'Gold Chestpiece',
    icon: ICON_ID.CHESTPIECE_GOLD_1,
    stats: {
      defense: 7,
      strength: 5,
      intelligence: 1,
      constitution: 7,
    },
  },
  {
    id: 6,
    name: 'Gold Wizard Robes',
    icon: ICON_ID.CHESTPIECE_GOLD_2,
    stats: {
      defense: 7,
      strength: 1,
      intelligence: 5,
      constitution: 7,
    },
  },
  {
    id: 7,
    name: 'Diamond Chestpiece',
    icon: ICON_ID.CHESTPIECE_DIAMOND_1,
    stats: {
      defense: 8,
      strength: 6,
      intelligence: 1,
      constitution: 8,
    },
  },
  {
    id: 8,
    name: 'Diamond Wizard Robes',
    icon: ICON_ID.CHESTPIECE_DIAMOND_2,
    stats: {
      defense: 8,
      strength: 1,
      intelligence: 6,
      constitution: 8,
    },
  },
];

export const LEGGINGS: ILegging[] = [
  {
    id: 1,
    name: 'Leather Pants',
    icon: ICON_ID.LEGGING_LEATHER_1,
    stats: {
      defense: 5,
      strength: 0,
      intelligence: 0,
      constitution: 5,
    },
  },
  {
    id: 2,
    name: 'Steel Leggings',
    icon: ICON_ID.LEGGING_STEEL_1,
    stats: {
      defense: 7,
      strength: 1,
      intelligence: 1,
      constitution: 7,
    },
  },
  {
    id: 3,
    name: 'Gold Leggings',
    icon: ICON_ID.LEGGING_GOLD_1,
    stats: {
      defense: 9,
      strength: 1,
      intelligence: 1,
      constitution: 9,
    },
  },
  {
    id: 4,
    name: 'Diamond Leggings',
    icon: ICON_ID.LEGGING_DIAMOND_1,
    stats: {
      defense: 11,
      strength: 1,
      intelligence: 1,
      constitution: 11,
    },
  },
];
