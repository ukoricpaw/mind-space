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
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.less'],
})
export class Header implements OnDestroy {
  $userLoading = this.store.select(userLoadingSelector);
  $userData = new Subject<IUser | null>();

  userData: IUser | null = null;

  disabledList: Record<string, boolean> = {};
  navList: NavItem[] = getNavList(this.userData?.id || null, this.userData);

  constructor(
    private store: Store<TAppStore>,
    private navigationService: NavigationService,
  ) {
    store
      .select(userDataSelector)
      .pipe(takeUntil(this.$userData))
      .subscribe(data => {
        this.userData = data;
        this.updateNavList();
      });

    this.navigationService.$navSubject.subscribe(data => {
      data.forEach(el => {
        if (el.action === 'disable') {
          this.disabledList[el.name] = true;
        } else {
          delete this.disabledList[el.name];
        }
      });
      this.updateNavList();
    });
  }

  updateNavList() {
    this.navList = getNavList(this.userData?.id as number, this.userData, this.disabledList);
  }

  ngOnDestroy() {
    this.navigationService.$navSubject.complete();
    this.$userData.complete();
  }

  logout() {
    this.store.dispatch(logoutUser());
  }

  navListTrackBy: TrackByFunction<any> = (index: number, el: NavItem): string => {
    return el.title;
  };
}
