import { TAppStore } from '../../store.reducer';
import { ActionStatus } from '../../../types/common.types';

export const articleLoadingSelector = (state: TAppStore) =>
  state.articleReducer.articleStatus === ActionStatus.IN_PROGRESS;

export const articleSuccessSelector = (state: TAppStore) => state.articleReducer.articleStatus === ActionStatus.SUCCESS;

export const articleFailedSelector = (state: TAppStore) => state.articleReducer.articleStatus === ActionStatus.FAILED;

export const articleSelector = (state: TAppStore) => state.articleReducer.article;

export const tagsLoadingSelector = (state: TAppStore) => state.articleReducer.tagStatus === ActionStatus.IN_PROGRESS;

export const tagsFailedSelector = (state: TAppStore) => state.articleReducer.tagStatus === ActionStatus.FAILED;

export const tagsSuccessSelector = (state: TAppStore) => state.articleReducer.tagStatus === ActionStatus.SUCCESS;

export const tagsSelector = (state: TAppStore) => state.articleReducer.tags;
