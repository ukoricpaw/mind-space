import { IRole } from '../../../types/role.types';
import { ActionStatus, IError, Paginated } from '../../../types/common.types';

export interface ArticleState {
  tagStatus: ActionStatus | null;
  articleStatus: ActionStatus | null;
  article?: IArticle;
  tags?: Paginated<ITag>;
  tagsError: IError | null;
  articleError: IError | null;
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
  userId: number;
  isPrivate: boolean;
  qtyOfViews: number;
  inviteLink: string;
  articleActiveType: number;
  createdAt: string;
  updatedAt: string;
  articleTypes: IArticleType[];
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
}
