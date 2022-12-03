import create from "zustand";

export const useUser = create((set) => ({
  login: false,
  setLogin: () =>
    set((login) => ({
      login: login,
    })),
}));
