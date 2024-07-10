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
      message: "Welcome to the combat simulator!",
    },
    {
      type: "info",
      message:
        "You can move around the battlefield, attack enemies, and use skills to gain the upper hand in combat.",
    },
    {
      type: "info",
      message:
        "Each action you take consumes action points (AP). You can see your remaining health and AP at the bottom of the screen.",
    },
    {
      type: "info",
      message:
        "You can use WASD or scroll to inspect the battlefield and +/= and - to zoom in/out.",
    },
  ],
  addLog: (log) => set({ logs: [...get().logs, log] }),
  clearLogs: () => set({ logs: [] }),
}));
