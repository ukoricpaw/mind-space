import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuth } from '../types/auth.types';
import { Observable } from 'rxjs';
import { UserResponse } from '../store/reducers/user/user.constants';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  constructor(private httpClient: HttpClient) {}

  fetchUser(
    authDto: IAuth,
    auth_type: 'auth' | 'reg'
  ): Observable<UserResponse> {
    if (auth_type === 'auth')
      return this.httpClient.post<UserResponse>(
        'http://localhost:8080/user/login',
        authDto,
        { withCredentials: true }
      );
    return this.httpClient.post<UserResponse>(
      'http://localhost:8080/user/registration',
      authDto,
      { withCredentials: true }
    );
  }
}
