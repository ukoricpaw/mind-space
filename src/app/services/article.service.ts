import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleDto, PaginatedReq } from '../types/article.types';
import { API_URL } from '../types/auth.types';
import { Observable } from 'rxjs';
import { Paginated } from '../types/common.types';
import { IArticle, ITag } from '../store/reducers/article/article.constants';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  ARTICLE_API_URL = '/article';

  constructor(private http: HttpClient) {}

  createQueryParameters(req: PaginatedReq) {
    let query = `page=${req.page}&limit=${req.limit}`;
    if (req.isPrivate !== undefined) {
      query += `&is-private=${req.isPrivate}`;
    }
    if (req.search) {
      query += `&search=${req.search}`;
    }
    if (req.tags.length) {
      const tagsQuery = req.tags.join(';');
      query += `&${tagsQuery}`;
    }
    return query;
  }

  createArticle(article: ArticleDto) {
    return this.http.post(`${API_URL}${this.ARTICLE_API_URL}`, article, { withCredentials: true });
  }

  getTags(): Observable<Paginated<ITag>> {
    return this.http.get<Paginated<ITag>>(`${API_URL}${this.ARTICLE_API_URL}/tags`, { withCredentials: true });
  }

  getSingleArticle(articleId: number) {
    return this.http.get<IArticle>(`${API_URL}${this.ARTICLE_API_URL}/${articleId}`, { withCredentials: true });
  }

  getMyArticles(req: PaginatedReq) {
    return this.http.get(`${API_URL}${this.ARTICLE_API_URL}/user?${this.createQueryParameters(req)}`, {
      withCredentials: true,
    });
  }
}
