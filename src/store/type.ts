import { TCardDetail } from "../utils/cardDetailType";
import { TUser } from "../utils/cardType";

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
}

export type StoreState = AuthStateType & CollectionStateType;
