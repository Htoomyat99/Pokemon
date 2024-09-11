import { MMKV } from "react-native-mmkv";
import { AuthStateType, SetType } from "./type";

export const storage = new MMKV();

export const createAuthSlice = (set: SetType): AuthStateType => ({
  user: { userName: "", password: "" },
  setUser: (newUser) =>
    set((state) => ({
      user: { ...state.user, ...newUser },
    })),
});
