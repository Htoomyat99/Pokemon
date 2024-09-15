import { TCardDetail } from "../type/cardDetailType";
import { TUser } from "../type/StausAuth";

export interface SetType {
  (nextStateOrUpdater: (state: StoreState) => void): void;
}
export interface AuthStateType {
  user: TUser;
  setUser: (newUser: TUser) => void;
}

export interface CollectionStateType {
  collections: TCardDetail[];
  toggleCollection: (card: TCardDetail) => void;
  isFavorite: (id: string) => boolean;
  resetCollection: () => void;
}

export type StoreState = AuthStateType & CollectionStateType;
