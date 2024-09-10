import { SetType, UserType } from "./type";

export const createAuthSlice = (set: SetType): UserType => ({
  userName: "",
  setUserName: (newUserName: string) => {
    set(() => ({ userName: newUserName }));
  },
  password: "",
  setPassword: (newPassword: string) => {
    set(() => ({ password: newPassword }));
  },
});
