import { Component, TrackByFunction } from '@angular/core';
import { NavItem } from './header.constants';
import { getNavList } from './header.helpers';
import { USER_ROLES } from '../../types/role.types';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.less'],
})
export class Header {
  navList: NavItem[] = getNavList(12, USER_ROLES.USER);

  navListTrackBy: TrackByFunction<any> = (
    index: number,
    el: NavItem
  ): string => {
    return el.title;
  };
}
