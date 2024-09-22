import { createReducer, on } from '@ngrx/store';
import { initialState } from './user.constants';
import { someAction } from './user.actions';

export const userReducer = createReducer(
  initialState
  //   on(someAction)
);
