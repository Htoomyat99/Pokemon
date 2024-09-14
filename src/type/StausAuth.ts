export interface TUser {
  userName: string;
  password: string;
}

export interface TAuthError {
  status: boolean;
  errMsg?: string;
}
