import { adapter } from './comments.reducer';
import { TAppStore } from '../../store.reducer';
import { createSelector } from '@ngrx/store';

export const { selectAll } = adapter.getSelectors();

export const commentsCountSelector = (state: TAppStore) => state.commentsReducer.count;

export const commentsLoadingSelector = (state: TAppStore) => state.commentsReducer.commentsLoading;

export const commentsLoadingFailedSelector = (state: TAppStore) => state.commentsReducer.failedMessage;

export const commentsSelector = createSelector((state: TAppStore) => state.commentsReducer, selectAll);
