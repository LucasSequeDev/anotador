import { Game } from "@/types/game";
import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

interface GameState {
  games: Game[];
  setGames: (games: Game[]) => void;
  currentGame: undefined | Game;
  saveCurrentGame: (game: Game) => void;
  resetGames: () => void;
  resetCurrentGame: () => void;
}

const storage: PersistStorage<GameState> = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return JSON.parse(str);
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => localStorage.removeItem(name),
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      games: [],
      setGames: (games: Game[]) => set(() => ({ games })),
      currentGame: undefined,
      saveCurrentGame: (game: Game) => set(() => ({ currentGame: game })),
      resetGames: () => set(() => ({ games: [] })),
      resetCurrentGame: () => set(() => ({ currentGame: undefined })),
    }),
    {
      name: "games-anotador",
      storage,
    }
  )
);
