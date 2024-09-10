export interface SetType {
  (nextStateOrUpdater: (state: StoreState) => void): void;
}
export interface UserType {
  userName: string;
  setUserName: (data: string) => void;
  password: string;
  setPassword: (data: string) => void;
}

export type StoreState = UserType;
