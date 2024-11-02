import { createReducer, on } from '@ngrx/store';
import { initialState } from './profile.constants';
import {
  articlesFailedAction,
  articlesLoadingAction,
  articlesSuccessAction,
  profileFailedAction,
  profileLoadingAction,
  profileSuccessAction,
} from './profile.actions';

export const profileReducer = createReducer(
  initialState,
  on(profileLoadingAction, state => ({ ...state, profileIsLoading: true, profileError: null })),
  on(profileSuccessAction, (state, { profile }) => ({ ...state, profile, profileIsLoading: false })),
  on(profileFailedAction, (state, { error }) => ({ ...state, profileError: error.message, profileIsLoading: false })),
  on(articlesLoadingAction, state => ({ ...state, articlesIsLoading: true, articlesError: null })),
  on(articlesSuccessAction, (state, { articles }) => ({ ...state, articles, articlesIsLoading: false })),
  on(articlesFailedAction, (state, { error }) => ({
    ...state,
    articlesError: error.message,
    articlesIsLoading: false,
  })),
);
