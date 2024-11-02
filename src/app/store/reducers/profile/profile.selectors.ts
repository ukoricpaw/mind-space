import { TAppStore } from '../../store.reducer';

export const profileLoadingSelector = (state: TAppStore) => state.profileReducer.profileIsLoading;

export const profileFailedSelector = (state: TAppStore) => state.profileReducer.profileError;

export const profileSelector = (state: TAppStore) => state.profileReducer.profile;

export const articlesLoadingSelector = (state: TAppStore) => state.profileReducer.articlesIsLoading;

export const articlesFailedSelector = (state: TAppStore) => state.profileReducer.articlesError;

export const articlesSelector = (state: TAppStore) => state.profileReducer.articles;
