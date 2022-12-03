import create from "zustand";

export const useVideo = create((set) => ({
  videoID: 0,
  setVideo: () =>
    set((videoID) => ({
      videoID: videoID,
    })),
}));
