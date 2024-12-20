import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuth } from '../../types/auth.types';
import { Store } from '@ngrx/store';
import { TAppStore } from '../../store/store.reducer';
import { clearError, fetchUser } from '../../store/reducers/user/user.actions';
import { map, Observable } from 'rxjs';
import { isUserAuthSelector, userErrorSelector, userLoadingSelector } from '../../store/reducers/user/user.selectors';
import { NavigationService } from '../../services/navigation.service';

@Component({
  templateUrl: 'auth.component.html',
  styleUrl: 'auth.component.less',
  selector: 'auth-page',
})
export class AuthPageComponent implements OnInit, OnDestroy {
  isLogin = true;

  $authError!: Observable<string | null>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<TAppStore>,
    private navigationService: NavigationService,
  ) {
    this.store.select(isUserAuthSelector).subscribe(val => {
      if (val) {
        router.navigate(['/']);
      }
    });
    this.$authError = this.store.select(userErrorSelector);
    this.navigationService.$navSubject.next([{ name: 'login', action: 'disable' }]);
  }

  authForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(8), Validators.required]),
  });

  ngOnInit(): void {
    this.store.dispatch(clearError());
    this.activatedRoute.paramMap.subscribe(map => {
      const authType = map.get('auth-type');
      if (authType !== 'login' && authType !== 'registration') {
        this.router.navigate(['not-found']);
      }
      if (authType === 'registration') {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    });
  }

  onSubmit() {
    if (this.isLogin) {
      this.store.dispatch(fetchUser({ auth_type: 'auth', authDto: this.authForm.value as IAuth }));
    } else {
      this.store.dispatch(fetchUser({ auth_type: 'reg', authDto: this.authForm.value as IAuth }));
    }
  }

  ngOnDestroy(): void {
    this.navigationService.$navSubject.next([{ name: 'login', action: 'enable' }]);
  }
}
