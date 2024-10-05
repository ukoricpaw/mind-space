import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleDto, PaginatedReq } from '../types/article.types';
import { API_URL } from '../types/auth.types';
import { delay, Observable } from 'rxjs';
import { Paginated } from '../types/common.types';
import { IArticle, ISingleArticleDto, ITag, TPaginatedArticles } from '../store/reducers/article/article.constants';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  ARTICLE_API_URL = '/article';

  constructor(private http: HttpClient) {}

  getSearchedTitles(search: string) {
    return this.http.get<Paginated<{ title: string; id: number }>>(
      `${API_URL}${this.ARTICLE_API_URL}/search?title=${search}`,
      {
        withCredentials: true,
      },
    );
  }

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
    return this.http
      .get<ISingleArticleDto>(`${API_URL}${this.ARTICLE_API_URL}/${articleId}`, {
        withCredentials: true,
      })
      .pipe(delay(1500));
  }

  getArticles(req: Partial<PaginatedReq>) {
    return this.http
      .get(`${API_URL}${this.ARTICLE_API_URL}?${this.createQueryParameters(req)}`, {
        withCredentials: true,
      })
      .pipe(delay(1500));
  }

  getMyArticles(req: Partial<PaginatedReq>) {
    return this.http
      .get(`${API_URL}${this.ARTICLE_API_URL}/user?${this.createQueryParameters(req)}`, {
        withCredentials: true,
      })
      .pipe(delay(1000));
  }
}
