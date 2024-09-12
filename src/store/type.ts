import { TUser } from "../utils/cardType";

export interface SetType {
  (nextStateOrUpdater: (state: StoreState) => void): void;
}
export interface AuthStateType {
  user: TUser;
  setUser: (newUser: TUser) => void;
}

export type StoreState = AuthStateType;
