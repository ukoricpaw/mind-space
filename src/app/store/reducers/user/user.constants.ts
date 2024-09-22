import { USER_ROLES } from '../../../types/role.types';

export interface UserState {
  data: {
    id: number;
    email: string;
    roleId: USER_ROLES;
  } | null;
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
  SUCCESS = '[userAction] login',
  ERROR = '[userAction] error',
  LOADING = '[userAction] loading',
  REFRESH = '[userAction] refresh',
}
