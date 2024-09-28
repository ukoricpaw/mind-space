export enum USER_ROLES {
  MODERATOR = 0,
  USER = 1,
}

export interface IRole {
  id: number;
  permissionId: number;
  permission: {
    id: number;
    name: string;
  };
}
