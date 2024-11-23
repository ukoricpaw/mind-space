import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { TAppStore } from '../store/store.reducer';
import { Injectable } from '@angular/core';
import { userDataSelector } from '../store/reducers/user/user.selectors';
import { map, take } from 'rxjs';
import { USER_ROLES } from '../types/role.types';

@Injectable({ providedIn: 'root' })
export class IsUserModeratorGuard implements CanActivate {
  constructor(private store: Store<TAppStore>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.store.select(userDataSelector).pipe(
      take(1),
      map(val => val?.roleId === USER_ROLES.MODERATOR),
    );
  }
}
