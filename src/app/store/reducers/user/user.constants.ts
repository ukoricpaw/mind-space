import { USER_ROLES } from '../../../types/role.types';

export interface IUser {
  id: number;
  email: string;
  avatarUrl: string | null;
  roleId: USER_ROLES;
}

export interface UserState {
  data: IUser | null;
  isLoading: boolean;
  isAuth: boolean;
  error: string | null;
}

export interface UserResponse extends Exclude<UserState['data'], null> {
  accessToken: string;
  refreshToken: string;
}

export const initialState: UserState = {
  data: null,
  isAuth: false,
  isLoading: false,
  error: null,
};

export enum USER_ACTIONS {
  SUCCESS = '[userAction] success',
  ERROR = '[userAction] error',
  LOADING = '[userAction] loading',
  REFRESH = '[userAction] refresh',
  CLEAR_ERROR = '[userAction] clear error',
  LOGOUT = '[userAction] logout',
  LOGOUT_SUCCESS = '[logoutSuccess] logoutSuccess',
}
