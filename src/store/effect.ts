import { create } from 'zustand';
import { IEffectAnimation } from '../types';

interface IEffectStore {
  currentEffect: IEffectAnimation | null;
  setCurrentEffect: (currentEffect: IEffectAnimation | null) => void;
}

export const useEffectStore = create<IEffectStore>((set) => ({
  currentEffect: null,
  setCurrentEffect: (currentEffect) => set({ currentEffect }),
}));
