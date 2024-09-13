import { MMKV } from "react-native-mmkv";
import { TCardDetail } from "../utils/cardDetailType";
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
  collection: [],
  toggleCollection: (card) =>
    set((state) => {
      const findIndex = state.collection.findIndex(
        (item) => item.id === card.id
      );

      if (findIndex > -1) {
        state.collection.splice(findIndex, 1);
      } else {
        state.collection.push(card);
      }
    }),
  isFavorite: (id) =>
    get().collection.some((item: TCardDetail) => item.id === id),
});
