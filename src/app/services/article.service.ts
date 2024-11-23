import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginatedReq } from '../types/article.types';
import { API_URL } from '../types/auth.types';
import { delay, Observable, timeout } from 'rxjs';
import { Paginated } from '../types/common.types';
import { ISingleArticleDto, ITag } from '../store/reducers/article/article.constants';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  ARTICLE_API_URL = '/article';
  USER_API_URL = '/user';

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

  getSingleArticle(articleId: number) {
    return this.http.get<ISingleArticleDto>(`${API_URL}${this.ARTICLE_API_URL}/${articleId}`, {
      withCredentials: true,
    });
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
}
