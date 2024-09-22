import { USER_ROLES } from '../../types/role.types';
import { NavItem } from './header.constants';

export const getNavList: (
  profileId: number,
  roleId: USER_ROLES
) => NavItem[] = (profileId, roleId) => {
  const navItems: NavItem[] = [
    {
      title: 'Главная',
      path: '',
    },
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

  if (roleId === USER_ROLES.MODERATOR) {
    navItems.unshift({ path: 'moderation', title: 'Модерация' });
  }

  return navItems;
};
