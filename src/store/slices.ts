import { MMKV } from "react-native-mmkv";
import { TCardDetail } from "../type/cardDetailType";
import { AuthStateType, CollectionStateType, SetType } from "./type";

export const storage = new MMKV();

export const createAuthSlice = (set: SetType): AuthStateType => ({
  user: { userName: "", password: "" },
  setUser: (newUser) =>
    set((state) => ({
      user: { ...state.user, ...newUser },
    })),
});

export const createCollectionSlice = (
  set: SetType,
  get: any
): CollectionStateType => ({
  collections: [],
  toggleCollection: (card) =>
    set((state) => {
      const findIndex = state.collections.findIndex(
        (item) => item.id === card.id
      );

      if (findIndex > -1) {
        state.collections.splice(findIndex, 1);
      } else {
        state.collections.push(card);
      }
    }),
  isFavorite: (id) =>
    get().collections.some((item: TCardDetail) => item.id === id),
});
