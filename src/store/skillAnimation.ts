import { create } from 'zustand';
import { ISkillAnimation } from '../types';

interface ISkillAnimationStore {
  currentSkillAnimation: ISkillAnimation | null;
  setCurrentSkillAnimation: (
    currentSkillAnimation: ISkillAnimation | null
  ) => void;
}

export const useSkillAnimationStore = create<ISkillAnimationStore>((set) => ({
  currentSkillAnimation: null,
  setCurrentSkillAnimation: (currentSkillAnimation) =>
    set({ currentSkillAnimation }),
}));
