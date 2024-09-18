import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  createAuthSlice,
  createCollectionSlice,
  createFilterSlice,
} from "@/src/store/slices";
import { StoreState } from "./type";

export const storage = new MMKV();

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};

export const useStore = create<StoreState>()(
  persist(
    immer((set, get) => ({
      ...createAuthSlice(set),
      ...createCollectionSlice(set, get),
      ...createFilterSlice(set),
    })),
    {
      name: "store",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
