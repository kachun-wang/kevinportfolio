import { create } from "zustand";

interface AppState {
  isLoading: boolean;
  isMenuOpen: boolean;
  currentSection: string;
  setIsLoading: (loading: boolean) => void;
  setIsMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;
  setCurrentSection: (section: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: true,
  isMenuOpen: false,
  currentSection: "hero",
  setIsLoading: (loading) => set({ isLoading: loading }),
  setIsMenuOpen: (open) => set({ isMenuOpen: open }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setCurrentSection: (section) => set({ currentSection: section }),
}));
