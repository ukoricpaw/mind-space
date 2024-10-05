import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import AuthService from '../../services/auth.service';
import { USER_ACTIONS } from '../reducers/user/user.constants';
import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
  logoutSuccess,
  logoutUser,
  refreshUser,
} from '../reducers/user/user.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class UserEffects {
  $fetchUser = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUser),
      exhaustMap(action => {
        return this.authService.fetchUser(action.authDto, action.auth_type).pipe(
          map(data => fetchUserSuccess(data)),
          catchError((err: any) => of(fetchUserError({ error: err.error.message }))),
        );
      }),
    ),
  );

  $logoutUser = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutUser),
      exhaustMap(action => {
        return this.authService.logoutUser().pipe(
          map(() => logoutSuccess()),
          catchError((err: any) => of(fetchUserError({ error: err.error.message }))),
        );
      }),
    ),
  );

  $refreshToken = createEffect(() =>
    this.actions$.pipe(
      ofType(refreshUser),
      exhaustMap(() =>
        this.authService.refreshUser().pipe(
          map(val => fetchUserSuccess(val)),
          catchError(err => of(fetchUserError({ error: err.error.message }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}
}
