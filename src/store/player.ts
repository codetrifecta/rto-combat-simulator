import { create } from 'zustand';
import { getDefaultPlayer } from '../constants/entity';
import { WEAPON_TYPE, WEAPON_ATTACK_TYPE } from '../constants/weapon';
import {
  IChestpiece,
  IHelmet,
  ILegging,
  IPlayer,
  IPlayerState,
  ISkill,
  IStats,
  IStatus,
  IWeapon,
} from '../types';
import { getPlayerMaxHealth } from '../utils/entity';

interface IPlayerStore extends IPlayer {
  playerMovementAPCost: number;
  setPlayerMovementAPCost: (playerMovementAPCost: number) => void;
  getPlayer: () => IPlayer;
  getPlayerBaseAttackDamage: () => number;
  getPlayerBonusDamage: () => number;
  getPlayerTotalStats: () => IStats;
  getPlayerTotalStrength: () => number;
  getPlayerTotalIntelligence: () => number;
  getPlayerTotalDefense: () => number;
  getPlayerTotalConstitution: () => number;
  getPlayerLifestealMultiplier: () => number;
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
  ...getDefaultPlayer(),

  playerMovementAPCost: 0,

  setPlayerMovementAPCost: (playerMovementAPCost: number) =>
    set({ playerMovementAPCost }),

  getPlayer: () => {
    const player: IPlayer = {
      id: get().id,
      name: get().name,
      sprite: get().sprite,
      spriteSize: get().spriteSize,
      spritesheetRows: get().spritesheetRows,
      spritesheetColumns: get().spritesheetColumns,
      spritesheetIdleRow: get().spritesheetIdleRow,
      spritesheetMovementRow: get().spritesheetMovementRow,
      spritesheetAttackRow: get().spritesheetAttackRow,
      spritesheetDamagedRow: get().spritesheetDamagedRow,
      spritesheetDefeatRow: get().spritesheetDefeatRow,
      entityType: get().entityType,
      health: get().health,
      maxHealth: get().maxHealth,
      damageBonus: get().damageBonus,
      movementRange: get().movementRange,
      actionPoints: get().actionPoints,
      skills: get().skills,
      statuses: get().statuses,
      state: get().state,
      equipment: get().equipment,
      healthPotions: get().healthPotions,
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
      strength: totalStrength,
      intelligence: totalIntelligence,
      defense: totalDefense,
      constitution: totalConstitution,
    };
  },

  getPlayerTotalStrength: () => {
    const weaponStrength = get().equipment.weapon?.stats.strength || 0;
    const helmetStrength = get().equipment.helmet?.stats.strength || 0;
    const chestpieceStrength = get().equipment.chestpiece?.stats.strength || 0;
    const leggingStrength = get().equipment.legging?.stats.strength || 0;

    const totalStrength =
      weaponStrength + helmetStrength + chestpieceStrength + leggingStrength;

    // 0, 0, 1, 1, 0.6, 1.2 = 0.8

    const strengthMultiplier = get().statuses.reduce((acc, status) => {
      // console.log('status', status);

      if (status.effect.strengthMultiplier === 0) return acc;

      if (status.effect.strengthMultiplier > 1) {
        return acc + (status.effect.strengthMultiplier - 1);
      } else {
        return acc - (1 - status.effect.strengthMultiplier);
      }
    }, 1);

    // console.log('strengthMultiplier', strengthMultiplier);

    return Math.round(totalStrength * strengthMultiplier);
  },

  getPlayerTotalIntelligence: () => {
    const weaponIntelligence = get().equipment.weapon?.stats.intelligence || 0;
    const helmetIntelligence = get().equipment.helmet?.stats.intelligence || 0;
    const chestpieceIntelligence =
      get().equipment.chestpiece?.stats.intelligence || 0;
    const leggingIntelligence =
      get().equipment.legging?.stats.intelligence || 0;

    const intelligenceMultiplier = get().statuses.reduce((acc, status) => {
      if (status.effect.intelligenceMultiplier === 0) return acc;

      if (status.effect.intelligenceMultiplier > 1) {
        return acc + (status.effect.intelligenceMultiplier - 1);
      } else {
        return acc - (1 - status.effect.intelligenceMultiplier);
      }
    }, 1);

    const totalIntelligence =
      weaponIntelligence +
      helmetIntelligence +
      chestpieceIntelligence +
      leggingIntelligence;

    return Math.round(totalIntelligence * intelligenceMultiplier);
  },

  getPlayerTotalDefense: () => {
    const weaponDefense = get().equipment.weapon?.stats.defense || 0;
    const helmetDefense = get().equipment.helmet?.stats.defense || 0;
    const chestpieceDefense = get().equipment.chestpiece?.stats.defense || 0;
    const leggingDefense = get().equipment.legging?.stats.defense || 0;

    // Get defense from status effects
    const totalDefenseFromStatuses = get().statuses.reduce(
      (acc, status) => acc + status.effect.incomingDamageReduction,
      0
    );

    const defenseMultiplier = get().statuses.reduce((acc, status) => {
      if (status.effect.defenseMultiplier === 0) return acc;

      if (status.effect.defenseMultiplier > 1) {
        return acc + (status.effect.defenseMultiplier - 1);
      } else {
        return acc - (1 - status.effect.defenseMultiplier);
      }
    }, 1);

    const equipmentDefense =
      weaponDefense + helmetDefense + chestpieceDefense + leggingDefense;

    return (
      Math.round(equipmentDefense * defenseMultiplier) +
      totalDefenseFromStatuses
    );
  },

  getPlayerTotalConstitution: () => {
    const weaponConstitution = get().equipment.weapon?.stats.constitution || 0;
    const helmetConstitution = get().equipment.helmet?.stats.constitution || 0;
    const chestpieceConstitution =
      get().equipment.chestpiece?.stats.constitution || 0;
    const leggingConstitution =
      get().equipment.legging?.stats.constitution || 0;

    const totalConstitution =
      weaponConstitution +
      helmetConstitution +
      chestpieceConstitution +
      leggingConstitution;

    return totalConstitution;
  },

  getPlayerLifestealMultiplier: () => {
    const lifestealMultiplier = get().statuses.reduce(
      (acc, status) => acc + status.effect.lifesteal,
      0
    );

    return lifestealMultiplier;
  },

  setPlayer: (player: IPlayer) => set({ ...player }),

  setPlayerActionPoints: (actionPoints: number) => set({ actionPoints }),

  setPlayerSkills: (skills: ISkill[]) => set({ skills }),

  setPlayerStatuses: (statuses: IStatus[]) => set({ statuses }),

  setPlayerState: (state: IPlayerState) => set({ state }),

  setPlayerWeapon: (weapon: IWeapon | null) => {
    const newEquipment = { ...get().equipment, weapon };
    const newPlayer = { ...get().getPlayer(), equipment: newEquipment };
    const maxHealth = getPlayerMaxHealth(newPlayer);
    set({ maxHealth, equipment: { ...get().equipment, weapon } });
  },
  setPlayerHelmet: (helmet: IHelmet | null) => {
    const newEquipment = { ...get().equipment, helmet };
    const newPlayer = { ...get().getPlayer(), equipment: newEquipment };
    const maxHealth = getPlayerMaxHealth(newPlayer);
    set({ maxHealth, equipment: { ...get().equipment, helmet } });
  },
  setPlayerChestpiece: (chestpiece: IChestpiece | null) => {
    const newEquipment = { ...get().equipment, chestpiece };
    const newPlayer = { ...get().getPlayer(), equipment: newEquipment };
    const maxHealth = getPlayerMaxHealth(newPlayer);
    set({ maxHealth, equipment: { ...get().equipment, chestpiece } });
  },
  setPlayerLegging: (legging: ILegging | null) => {
    const newEquipment = { ...get().equipment, legging };
    const newPlayer = { ...get().getPlayer(), equipment: newEquipment };
    const maxHealth = getPlayerMaxHealth(newPlayer);
    set({ maxHealth, equipment: { ...get().equipment, legging } });
  },
}));
