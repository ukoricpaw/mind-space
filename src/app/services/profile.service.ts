import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { API_URL } from '../types/auth.types';
import { IUser } from '../store/reducers/user/user.constants';
import { Observable } from 'rxjs';
import { PaginatedReq } from '../types/article.types';
import { ArticleService } from './article.service';
import { Paginated } from '../types/common.types';
import { IArticle } from '../store/reducers/article/article.constants';

@Injectable({ providedIn: 'root' })
export default class ProfileService {
  private http!: HttpClient;
  constructor(
    private handler: HttpBackend,
    private articleService: ArticleService,
  ) {
    this.http = new HttpClient(this.handler);
  }

  getProfile(id: number): Observable<IUser | { message: string }> {
    return this.http.get<IUser>(`${API_URL}/user/${id}`);
  }

  getProfileArticles(profileId: number, req: Partial<PaginatedReq>): Observable<Paginated<IArticle>> {
    return this.http.get<Paginated<IArticle>>(
      `${API_URL}/user/${profileId}/articles?${this.articleService.createQueryParameters(req)}`,
    );
  }
}
