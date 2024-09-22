import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync } from '@angular/router';
import { Store } from '@ngrx/store';
import { TAppStore } from '../store/store.reducer';
import { isUserAuthSelector } from '../store/reducers/user/user.selectors';
import { map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsUserAuthGuard implements CanActivate {
  constructor(private store: Store<TAppStore>) {}
  canActivate(): MaybeAsync<GuardResult> {
    return this.store.select(isUserAuthSelector).pipe(
      take(1),
      map((val) => val)
    );
  }
}
