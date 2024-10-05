import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, IAuth } from '../types/auth.types';
import { delay, Observable } from 'rxjs';
import { UserResponse } from '../store/reducers/user/user.constants';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  private httpClient!: HttpClient;
  constructor(handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  logoutUser() {
    return this.httpClient.get<{ message: string }>(`${API_URL}/user/logout`, { withCredentials: true });
  }

  fetchUser(authDto: IAuth, auth_type: 'auth' | 'reg'): Observable<UserResponse> {
    if (auth_type === 'auth')
      return this.httpClient.post<UserResponse>(`${API_URL}/user/login`, authDto, { withCredentials: true });
    return this.httpClient.post<UserResponse>(`${API_URL}/user/registration`, authDto, { withCredentials: true });
  }

  refreshUser() {
    return this.httpClient
      .get<UserResponse>(`${API_URL}/user/refresh`, {
        withCredentials: true,
      })
      .pipe(delay(1000));
  }
}
