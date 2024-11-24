import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IComment } from '../article/article.constants';
import {
  clearCommentsStateAction,
  commentRateFailedAction,
  commentRateLoadingAction,
  commentRateSuccessAction,
  commentsFailedAction,
  commentsLoadingAction,
  commentsSuccessAction,
  commentUpdateFailedAction,
  commentUpdateLoadingAction,
  commentUpdateSuccessAction,
} from '../article/article.actions';

export interface ICommentState extends EntityState<IComment> {
  commentsLoading: boolean;
  count: null | number;
  failedMessage: null | string;
}

export const adapter: EntityAdapter<IComment> = createEntityAdapter<IComment>();

export const initialState: ICommentState = adapter.getInitialState({
  commentsLoading: false,
  count: null,
  failedMessage: null,
});

export const commentsReducer = createReducer(
  initialState,
  on(commentsLoadingAction, state => ({
    ...state,
    commentsLoading: true,
  })),
  on(commentsSuccessAction, (state, { comments }) => {
    const { rows, count } = comments;
    return adapter.setAll(rows, { ...state, commentsLoading: false, count });
  }),
  on(commentsFailedAction, (state, { error }) => {
    return { ...state, failedMessage: error.message };
  }),
  on(commentUpdateLoadingAction, (state, { commentId }) => {
    const comments = { ...state.entities };
    const comment = comments[commentId];
    return adapter.updateOne({ changes: { ...comment, isLoading: true }, id: commentId }, state);
  }),
  on(commentUpdateSuccessAction, (state, { comment }) => {
    return adapter.updateOne({ changes: { ...comment, isLoading: false }, id: comment.id }, state);
  }),
  on(commentUpdateFailedAction, (state, { commentId }) => {
    const comments = { ...state.entities };
    const comment = comments[commentId];
    return adapter.updateOne({ changes: { ...comment, isLoading: false }, id: commentId }, state);
  }),
  on(commentRateLoadingAction, (state, { commentId }) => {
    const comments = { ...state.entities };
    const comment = comments[commentId];
    return adapter.updateOne({ changes: { ...comment, rateLoading: true }, id: commentId }, state);
  }),
  on(commentRateSuccessAction, (state, { rate, commentId }) => {
    const comment = state.entities[commentId] || {};
    return adapter.updateOne(
      {
        changes: { ...(comment as any), rateLoading: false, commentRate: rate?.message === 'DELETE' ? [] : [rate] },
        id: commentId,
      },
      state,
    );
  }),
  on(commentRateFailedAction, (state, { commentId }) => {
    const comments = { ...state.entities };
    const comment = comments[commentId];
    return adapter.updateOne({ changes: { ...comment, rateLoading: false }, id: commentId }, state);
  }),
  on(clearCommentsStateAction, state => {
    return adapter.removeAll({ ...state, count: 0, commentsLoading: false, failedMessage: null });
  }),
);
