import { create } from "zustand";
import { ILog } from "../types";

interface ILogStore {
  logs: ILog[];
  addLog: (log: ILog) => void;
  clearLogs: () => void;
}

export const useLogStore = create<ILogStore>((set, get) => ({
  logs: [
    {
      type: "info",
      message: "Welcome to the game!",
    },
  ],
  addLog: (log) => set({ logs: [...get().logs, log] }),
  clearLogs: () => set({ logs: [] }),
}));
