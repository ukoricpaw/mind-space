import { IRole } from '../../../types/role.types';
import { ActionStatus, IError, Paginated } from '../../../types/common.types';
import { ActiveTypes } from '../../../types/article.types';
import { IUser } from '../user/user.constants';

export interface ArticleState {
  tagStatus: ActionStatus | null;
  articleStatus: ActionStatus | null;
  article?: ISingleArticleDto;
  tags?: Paginated<ITag>;
  tagsError: IError | null;
  articleError: IError | null;
}

export interface IComment {
  id: number;
  articleId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: IUser;
  content: string;
  isLoading?: boolean;
  commentRate: Array<ICommentRate>;
  rateLoading?: boolean;
}

export interface ICommentRate {
  id: number;
  rate: 1 | 0;
  commentId: number;
  userId: number;
}

export interface CommentRateRequest {
  rate: ICommentRate['rate'];
  action: 'ADD' | 'DELETE';
}

export const initialState: ArticleState = {
  articleStatus: null,
  tagStatus: null,
  articleError: null,
  tagsError: null,
};

export interface IArticle {
  id: number;
  thumbnail: string;
  content: string;
  title: string;
  userId: number;
  isPrivate: boolean;
  qtyOfViews: number;
  inviteLink: string;
  articleActiveType: ActiveTypes;
  createdAt: string;
  updatedAt: string;
  articleTypes: IArticleType[];
  role: IRole;
  user: IUser;
}

export type TPaginatedArticles = Paginated<Omit<IArticle, 'inviteLink'>>;

export interface ISingleArticleDto {
  article: IArticle;
  role: IRole;
}

export interface IArticleType {
  id: number;
  articleTypeId: number;
  articleId: number;
  articleType: {
    id: number;
    name: string;
  };
}

export interface ITag {
  id: number;
  name: string;
}

export enum ArticleActions {
  ARTICLE_LOADING = '[Article actions] loading',
  ARTICLE_SUCCESS = '[Article actions] success',
  ARTICLE_FAILED = '[Article actions] failed',
  TAGS_LOADING = '[Article actions] loading tags',
  TAGS_SUCCESS = '[Article actions] success tags',
  TAGS_FAILED = '[Article actions] failed tags',
  COMMENTS_LOADING = '[Comment actions] loading',
  COMMENTS_SUCCESS = '[Comment actions] success',
  COMMENTS_FAILED = '[Comment actions] failed',
  COMMENT_UPDATE_LOADING = '[Comment actions] update loading',
  COMMENTS_UPDATE_SUCCESS = '[Comment actions] update success',
  COMMENTS_UPDATE_FAILED = '[Comment actions] update failed',
  COMMENTS_RATE_LOADING = '[Comment actions] rate loading',
  COMMENTS_RATE_SUCCESS = '[Comment actions] rate success',
  COMMENTS_RATE_FAILED = '[Comment actions] rate failed',
  CLEAR_COMMENTS = '[Comment actions] clear',
}
