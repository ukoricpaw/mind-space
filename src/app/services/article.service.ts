import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginatedReq } from '../types/article.types';
import { API_URL } from '../types/auth.types';
import { delay, Observable } from 'rxjs';
import { Paginated } from '../types/common.types';
import {
  CommentRateRequest,
  IComment,
  ICommentRate,
  ISingleArticleDto,
  ITag,
} from '../store/reducers/article/article.constants';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  ARTICLE_API_URL = '/article';
  USER_API_URL = '/user';
  COMMENT_API_URL = '/comment';

  constructor(private http: HttpClient) {}

  getSearchedTitles(search: string, toModerate?: boolean) {
    const searchParams = new URLSearchParams();
    if (toModerate) {
      searchParams.set('to-moderate', 'true');
    }
    searchParams.set('title', search);
    return this.http.get<Paginated<{ title: string; id: number }>>(
      `${API_URL}${this.ARTICLE_API_URL}/search?${searchParams}`,
      {
        withCredentials: true,
      },
    );
  }

  createComment(articleId: number, content: string) {
    return this.http.post(
      `${API_URL}${this.COMMENT_API_URL}/${articleId}`,
      { content },
      {
        withCredentials: true,
      },
    );
  }

  getArticleComments(articleId: number, req: Partial<Pick<PaginatedReq, 'page'>>): Observable<Paginated<IComment>> {
    return this.http
      .get<Paginated<IComment>>(`${API_URL}${this.COMMENT_API_URL}/${articleId}?${this.createQueryParameters(req)}`, {
        withCredentials: true,
      })
      .pipe(delay(500));
  }

  deleteComment(articleId: number, commentId: number) {
    return this.http.delete(`${API_URL}${this.COMMENT_API_URL}/${articleId}/${commentId}`, {
      withCredentials: true,
    });
  }

  rateComment(commentId: number, body: CommentRateRequest): Observable<ICommentRate> {
    return this.http.patch<ICommentRate>(`${API_URL}${this.COMMENT_API_URL}/${commentId}/rate`, body, {
      withCredentials: true,
    });
  }

  updateComment(articleId: number, commentId: number, content: string): Observable<IComment> {
    return this.http.put<IComment>(
      `${API_URL}${this.COMMENT_API_URL}/${articleId}/${commentId}`,
      { content },
      {
        withCredentials: true,
      },
    );
  }

  getModerationArticles = (req: Partial<PaginatedReq>) => {
    return this.http.get(`${API_URL}${this.USER_API_URL}/articles/moderate?${this.createQueryParameters(req)}`, {
      withCredentials: true,
    });
  };

  createQueryParameters(req: Partial<PaginatedReq>) {
    let query = `page=${req.page ?? 1}&limit=${req.limit ?? 10}`;
    if (req.isPrivate !== undefined) {
      query += `&is-private=${req.isPrivate}`;
    }
    if (req.search) {
      query += `&search=${req.search}`;
    }
    if (req.tags?.length) {
      const tagsQuery = req.tags.join(';');
      query += `&tags=${tagsQuery}`;
    }
    if (req.status !== undefined) {
      query += `&status=${req.status}`;
    }
    return query;
  }

  createArticle(formData: FormData) {
    return this.http.post(`${API_URL}${this.ARTICLE_API_URL}`, formData, {
      withCredentials: true,
    });
  }

  getTags(): Observable<Paginated<ITag>> {
    return this.http.get<Paginated<ITag>>(`${API_URL}${this.ARTICLE_API_URL}/tags`, { withCredentials: true });
  }

  getSingleArticle(articleId: number, toEdit?: boolean) {
    return this.http.get<ISingleArticleDto>(
      `${API_URL}${this.ARTICLE_API_URL}/${articleId}${toEdit ? '?to-edit=true' : ''}`,
      {
        withCredentials: true,
      },
    );
  }

  moderateArticle(articleId: number, moderateType: 'CONFIRMED' | 'DENIED') {
    return this.http
      .patch<{ message: string }>(
        `${API_URL}${this.USER_API_URL}/articles/moderate/${articleId}`,
        { action: moderateType },
        {
          withCredentials: true,
        },
      )
      .pipe(delay(1500));
  }

  getArticles = (req: Partial<PaginatedReq>) => {
    return this.http.get(`${API_URL}${this.ARTICLE_API_URL}?${this.createQueryParameters(req)}`, {
      withCredentials: true,
    });
  };

  getUserArticles = (userId: number, req: Partial<PaginatedReq>) => {
    return this.http
      .get(`${API_URL}/user/${userId}/articles?${this.createQueryParameters(req)}`, {
        withCredentials: true,
      })
      .pipe(delay(1000));
  };

  rateArticle(articleId: number, rateRequest: CommentRateRequest) {
    return this.http.post(`${API_URL}${this.ARTICLE_API_URL}/${articleId}/rate`, rateRequest, {
      withCredentials: true,
    });
  }

  getArticleRates(articleId: number) {
    return this.http.get(`${API_URL}${this.ARTICLE_API_URL}/${articleId}/rate`, { withCredentials: true });
  }

  modifyArticle(articleId: number, formData: FormData) {
    return this.http.patch(`${API_URL}${this.ARTICLE_API_URL}/${articleId}`, formData, {
      withCredentials: true,
    });
  }

  addViewToArticle(articleId: number) {
    return this.http.get(`${API_URL}${this.ARTICLE_API_URL}/${articleId}/views`, {
      withCredentials: true,
    });
  }
}
