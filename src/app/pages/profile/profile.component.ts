import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TAppStore } from '../../store/store.reducer';
import { IUser } from '../../store/reducers/user/user.constants';
import { userDataSelector } from '../../store/reducers/user/user.selectors';
import { catchError, tap, throwError } from 'rxjs';
import AuthService from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.less',
})
export class ProfileComponent {
  user: IUser | null = null;
  ownUser: IUser | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<TAppStore>,
    private authService: AuthService,
  ) {
    this.activatedRoute.paramMap
      .pipe(
        tap(params => {
          this.store.select(userDataSelector).subscribe(user => {
            this.ownUser = user;
            const profileId = Number(params.get('profileId'));
            if (profileId === user?.id) {
              this.user = this.ownUser;
            } else {
              this.authService
                .getUser(profileId)
                .pipe(
                  catchError(err => {
                    this.router.navigate(['']);
                    return throwError(err);
                  }),
                )
                .subscribe(data => {
                  this.user = data as IUser;
                });
            }
          });
        }),
      )
      .subscribe();
  }

  protected readonly Boolean = Boolean;
}
