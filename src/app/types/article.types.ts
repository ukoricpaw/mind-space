export interface ArticleDto {
  title: string;
  content: string;
  isPrivate: boolean;
  tags: string;
}

export interface PaginatedReq {
  page: number;
  limit: number;
  tags: string[];
  search: string;
  isPrivate?: boolean;
  sort: 'desc' | 'asc';
  status: number;
}

export enum ActiveTypes {
  MODERATION = 0,
  ACTIVE = 1,
  BANNED = 2,
}
