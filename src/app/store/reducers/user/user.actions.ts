import { createAction, props } from '@ngrx/store';
import { USER_ACTIONS, UserResponse } from './user.constants';
import { IAuth } from '../../../types/auth.types';

export const fetchUserSuccess = createAction(USER_ACTIONS.SUCCESS, props<UserResponse>());

export const fetchUserError = createAction(USER_ACTIONS.ERROR, props<{ error: string }>());

export const fetchUser = createAction(USER_ACTIONS.LOADING, props<{ auth_type: 'auth' | 'reg'; authDto: IAuth }>());

export const refreshUser = createAction(USER_ACTIONS.REFRESH);

export const clearError = createAction(USER_ACTIONS.CLEAR_ERROR);
