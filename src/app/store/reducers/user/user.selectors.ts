import { createSelector } from '@ngrx/store';
import { TAppStore } from '../../store.reducer';

export const userReducerSelector = (state: TAppStore) => state.userReducer;

export const userLoadingSelector = createSelector(
  userReducerSelector,
  (data) => data.isLoading
);

export const userErrorSelector = createSelector(
  userReducerSelector,
  (data) => data.error
);

export const userDataSelector = createSelector(
  userReducerSelector,
  (data) => data.data
);

export const isUserAuthSelector = createSelector(
  userReducerSelector,
  (data) => data.isAuth
);
