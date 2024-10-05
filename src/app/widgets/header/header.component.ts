import { Component, OnDestroy, TrackByFunction } from '@angular/core';
import { NavItem } from './header.constants';
import { getNavList } from './header.helpers';
import { USER_ROLES } from '../../types/role.types';
import { Store } from '@ngrx/store';
import { TAppStore } from '../../store/store.reducer';
import { isUserAuthSelector, userDataSelector, userLoadingSelector } from '../../store/reducers/user/user.selectors';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from '../../store/reducers/user/user.constants';
import { logoutUser } from '../../store/reducers/user/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.less'],
})
export class Header implements OnDestroy {
  $userLoading = this.store.select(userLoadingSelector);
  $userData = new Subject<IUser | null>();

  userData: IUser | null = null;

  navList: NavItem[] = getNavList(12, this.userData);

  constructor(private store: Store<TAppStore>) {
    store
      .select(userDataSelector)
      .pipe(takeUntil(this.$userData))
      .subscribe(data => {
        this.userData = data;
        this.navList = getNavList(12, this.userData);
      });
  }

  ngOnDestroy() {
    this.$userData.complete();
  }

  logout() {
    this.store.dispatch(logoutUser());
  }

  navListTrackBy: TrackByFunction<any> = (index: number, el: NavItem): string => {
    return el.title;
  };
}
