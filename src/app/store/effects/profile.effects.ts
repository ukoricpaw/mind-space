import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TAppStore } from '../store.reducer';
import { catchError, exhaustMap, map, of } from 'rxjs';
import ProfileService from '../../services/profile.service';
import {
  articlesFailedAction,
  articlesLoadingAction,
  articlesSuccessAction,
  profileFailedAction,
  profileLoadingAction,
  profileSuccessAction,
} from '../reducers/profile/profile.actions';
import { IUser } from '../reducers/user/user.constants';

@Injectable({ providedIn: 'root' })
export class ProfileEffects {
  constructor(
    private $actions: Actions,
    private profileService: ProfileService,
  ) {}

  $fetchProfile = createEffect(() =>
    this.$actions.pipe(
      ofType(profileLoadingAction),
      exhaustMap(action =>
        this.profileService.getProfile(action.profileId).pipe(
          map(data => profileSuccessAction({ profile: data as IUser })),
          catchError(error => of(profileFailedAction({ error }))),
        ),
      ),
    ),
  );

  $fetchProfileArticles = createEffect(() =>
    this.$actions.pipe(
      ofType(articlesLoadingAction),
      exhaustMap(action =>
        this.profileService.getProfileArticles(action.profileId, action.params).pipe(
          map(data => articlesSuccessAction({ articles: data })),
          catchError(error => of(articlesFailedAction({ error }))),
        ),
      ),
    ),
  );
}
