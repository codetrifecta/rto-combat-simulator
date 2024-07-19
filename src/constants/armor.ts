import { IHelmet } from '../types';
import { ICON_ID } from './icons';

export const HELMETS: IHelmet[] = [
  {
    id: 1,
    name: 'Leather Helmet',
    icon: ICON_ID.HELMET_LEATHER_1,
    stats: {
      defense: 1,
      strength: 1,
      intelligence: 0,
      constitution: 1,
    },
  },
  {
    id: 2,
    name: 'Leather Wizard Hat',
    icon: ICON_ID.HELMET_LEATHER_2,
    stats: {
      defense: 1,
      strength: 0,
      intelligence: 1,
      constitution: 1,
    },
  },
  {
    id: 3,
    name: 'Steel Helmet',
    icon: ICON_ID.HELMET_STEEL_1,
    stats: {
      defense: 2,
      strength: 2,
      intelligence: 1,
      constitution: 1,
    },
  },
  {
    id: 4,
    name: 'Steel Wizard Hat',
    icon: ICON_ID.HELMET_STEEL_2,
    stats: {
      defense: 2,
      strength: 1,
      intelligence: 2,
      constitution: 1,
    },
  },
  {
    id: 5,
    name: 'Gold Helmet',
    icon: ICON_ID.HELMET_GOLD_1,
    stats: {
      defense: 3,
      strength: 2,
      intelligence: 1,
      constitution: 1,
    },
  },
  {
    id: 6,
    name: 'Gold Wizard Hat',
    icon: ICON_ID.HELMET_GOLD_2,
    stats: {
      defense: 3,
      strength: 1,
      intelligence: 2,
      constitution: 1,
    },
  },
  {
    id: 7,
    name: 'Diamond Helmet',
    icon: ICON_ID.HELMET_DIAMOND_1,
    stats: {
      defense: 4,
      strength: 3,
      intelligence: 1,
      constitution: 1,
    },
  },
  {
    id: 8,
    name: 'Diamond Wizard Hat',
    icon: ICON_ID.HELMET_DIAMOND_2,
    stats: {
      defense: 4,
      strength: 1,
      intelligence: 3,
      constitution: 1,
    },
  },
];
