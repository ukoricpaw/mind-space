import { USER_ROLES } from '../../types/role.types';
import { NavItem } from './header.constants';
import { IUser } from '../../store/reducers/user/user.constants';

export const getNavList: (
  profileId: number | null,
  userData: IUser | null,
  disabledItems?: Record<string, boolean>,
) => NavItem[] = (profileId, userData, disabledItems) => {
  let navItems: NavItem[] = [
    {
      name: 'main',
      title: 'Главная',
      path: '',
    },
  ];

  if (userData) {
    navItems = [
      {
        name: 'create-article',
        title: 'Написать статью',
        path: 'create-article',
        isButton: true,
      },
      ...navItems,
      {
        name: 'profile',
        title: 'Профиль',
        path: `profile/${profileId}`,
        imageUrl: userData.avatarUrl ?? null,
      },
    ];
  } else {
    navItems = [
      ...navItems,
      {
        name: 'login',
        title: 'Войти',
        path: 'auth/login',
        isButton: true,
      },
    ];
  }

  if (userData?.roleId === USER_ROLES.MODERATOR) {
    navItems.unshift({ path: 'moderation', title: 'Модерация', name: 'moderation' });
  }

  if (disabledItems) {
    navItems.forEach(item => {
      if (disabledItems[item.name]) {
        item.disabled = true;
      }
    });
  }

  return navItems;
};
