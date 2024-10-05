import { USER_ROLES } from '../../types/role.types';
import { NavItem } from './header.constants';
import { IUser } from '../../store/reducers/user/user.constants';

export const getNavList: (profileId: number, userData: IUser | null) => NavItem[] = (profileId, userData) => {
  let navItems: NavItem[] = [
    {
      title: 'Главная',
      path: '',
    },
  ];

  if (userData) {
    navItems = [
      {
        title: 'Написать статью',
        path: 'create-article',
        isButton: true,
      },
      ...navItems,
      {
        title: 'Мой блог',
        path: `blog/${profileId}`,
      },
      {
        title: 'Профиль',
        path: `profile/${profileId}`,
        icon: 'profile-icon',
      },
    ];
  } else {
    navItems = [
      ...navItems,
      {
        title: 'Войти',
        path: 'auth/login',
        isButton: true,
      },
    ];
  }

  if (userData?.roleId === USER_ROLES.MODERATOR) {
    navItems.unshift({ path: 'moderation', title: 'Модерация' });
  }

  return navItems;
};
