import { create } from "zustand";
import {
  ENTITY_TYPE,
  SKILLS,
  STARTING_ACTION_POINTS,
  WEAPON_ATTACK_TYPE,
  WEAPON_TYPE,
} from "../constants";
import {
  IChestpiece,
  IHelmet,
  ILegging,
  IPlayer,
  IPlayerState,
  ISkill,
  IStatus,
  IWeapon,
} from "../types";

interface IPlayerStore extends IPlayer {
  getPlayer: () => IPlayer;
  getPlayerBaseAttackDamage: () => number;
  getPlayerBonusDamage: () => number;
  getPlayerTotalStats: () => Record<string, number>;
  getPlayerTotalStrength: () => number;
  getPlayerTotalIntelligence: () => number;
  getPlayerTotalDefense: () => number;
  getPlayerTotalConstitution: () => number;
  setPlayer: (player: IPlayer) => void;
  setPlayerActionPoints: (actionPoints: number) => void;
  setPlayerSkills: (skills: ISkill[]) => void;
  setPlayerStatuses: (statuses: IStatus[]) => void;
  setPlayerState: (state: IPlayerState) => void;
  setPlayerWeapon: (weapon: IWeapon | null) => void;
  setPlayerHelmet: (helmet: IHelmet | null) => void;
  setPlayerChestpiece: (chestpiece: IChestpiece | null) => void;
  setPlayerLegging: (legging: ILegging | null) => void;
}

export const usePlayerStore = create<IPlayerStore>((set, get) => ({
  id: 1,
  name: "Kratos",
  entityType: ENTITY_TYPE.PLAYER,
  health: 10,
  maxHealth: 10,
  damageBonus: 0,
  actionPoints: STARTING_ACTION_POINTS,
  skills: SKILLS,
  statuses: [],
  state: {
    isAttacking: false,
    isMoving: false,
    isUsingSkill: false,
  },

  equipment: {
    weapon: {
      id: 1,
      name: "Fists",
      attackType: WEAPON_ATTACK_TYPE.MELEE,
      type: WEAPON_TYPE.ONE_HANDED,
      stats: {
        strength: 1,
        intelligence: 0,
        defense: 0,
        constitution: 0,
      },
      range: 1,
      cost: 1,
    },
    helmet: null,
    chestpiece: null,
    legging: null,
  },

  getPlayer: () => {
    const player: IPlayer = {
      id: get().id,
      name: get().name,
      entityType: get().entityType,
      health: get().health,
      maxHealth: get().maxHealth,
      damageBonus: get().damageBonus,
      actionPoints: get().actionPoints,
      skills: get().skills,
      statuses: get().statuses,
      state: get().state,
      equipment: get().equipment,
    };
    return player;
  },

  getPlayerBaseAttackDamage: () => {
    const totalStrength = get().getPlayerTotalStrength();
    const totalIntelligence = get().getPlayerTotalIntelligence();
    const weapon = get().equipment.weapon;

    if (weapon === null) {
      return 0;
    }

    if (weapon.attackType === WEAPON_ATTACK_TYPE.MELEE) {
      return totalStrength;
    } else if (weapon.attackType === WEAPON_ATTACK_TYPE.RANGED) {
      if (weapon.type === WEAPON_TYPE.BOW) {
        return totalStrength;
      }
    }

    return totalIntelligence;
  },

  getPlayerBonusDamage: () => {
    const bonusDamage = get().statuses.reduce(
      (acc, status) => acc + status.effect.damageBonus,
      0
    );
    return bonusDamage;
  },

  getPlayerTotalStats: () => {
    const totalStrength = get().getPlayerTotalStrength();
    const totalIntelligence = get().getPlayerTotalIntelligence();
    const totalDefense = get().getPlayerTotalDefense();
    const totalConstitution = get().getPlayerTotalConstitution();

    return {
      totalStrength,
      totalIntelligence,
      totalDefense,
      totalConstitution,
    };
  },

  getPlayerTotalStrength: () => {
    const weaponStrength = get().equipment.weapon?.stats.strength || 0;
    const helmetStrength = get().equipment.helmet?.stats.strength || 0;
    const chestpieceStrength = get().equipment.chestpiece?.stats.strength || 0;
    const leggingStrength = get().equipment.legging?.stats.strength || 0;

    const totalStrength =
      weaponStrength + helmetStrength + chestpieceStrength + leggingStrength;

    return totalStrength;
  },

  getPlayerTotalIntelligence: () => {
    const weaponIntelligence = get().equipment.weapon?.stats.intelligence || 0;
    const helmetIntelligence = get().equipment.helmet?.stats.intelligence || 0;
    const chestpieceIntelligence =
      get().equipment.chestpiece?.stats.intelligence || 0;
    const leggingIntelligence =
      get().equipment.legging?.stats.intelligence || 0;

    const totalIntelligence =
      weaponIntelligence +
      helmetIntelligence +
      chestpieceIntelligence +
      leggingIntelligence;

    return totalIntelligence;
  },

  getPlayerTotalDefense: () => {
    const helmetDefense = get().equipment.helmet?.stats.defense || 0;
    const chestpieceDefense = get().equipment.chestpiece?.stats.defense || 0;
    const leggingDefense = get().equipment.legging?.stats.defense || 0;

    const totalDefense = helmetDefense + chestpieceDefense + leggingDefense;

    return totalDefense;
  },

  getPlayerTotalConstitution: () => {
    const helmetConstitution = get().equipment.helmet?.stats.constitution || 0;
    const chestpieceConstitution =
      get().equipment.chestpiece?.stats.constitution || 0;
    const leggingConstitution =
      get().equipment.legging?.stats.constitution || 0;

    const totalConstitution =
      helmetConstitution + chestpieceConstitution + leggingConstitution;

    return totalConstitution;
  },

  setPlayer: (player: IPlayer) => set({ ...player }),

  setPlayerActionPoints: (actionPoints: number) => set({ actionPoints }),

  setPlayerSkills: (skills: ISkill[]) => set({ skills }),

  setPlayerStatuses: (statuses: IStatus[]) => set({ statuses }),

  setPlayerState: (state: IPlayerState) => set({ state }),

  setPlayerWeapon: (weapon: IWeapon | null) =>
    set({ equipment: { ...get().equipment, weapon } }),
  setPlayerHelmet: (helmet: IHelmet | null) =>
    set({ equipment: { ...get().equipment, helmet } }),
  setPlayerChestpiece: (chestpiece: IChestpiece | null) =>
    set({ equipment: { ...get().equipment, chestpiece } }),
  setPlayerLegging: (legging: ILegging | null) =>
    set({ equipment: { ...get().equipment, legging } }),
}));
