import { createReducer, on } from '@ngrx/store';
import { initialState } from './user.constants';
import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
  refreshUser,
} from './user.actions';

export const userReducer = createReducer(
  initialState,
  on(fetchUser, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(fetchUserError, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(fetchUserSuccess, (state, { refreshToken, accessToken, ...data }) => ({
    data,
    error: null,
    isAuth: true,
    isLoading: false,
  })),
  on(refreshUser, (state) => ({ ...state, isLoading: true, error: null }))
);
