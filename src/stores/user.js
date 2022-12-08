import create from "zustand";

export const useUser = create((set) => ({
  login: false,
  userID: "",
  setLogin: (login) =>
    set((state) => ({
      login: login,
    })),
  setUserID: (id) =>
    set(() => ({
      userID: id,
    })),
}));
