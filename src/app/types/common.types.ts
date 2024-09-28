export enum ActionStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
}

export type Paginated<T extends Record<string, any>> = { count: number; rows: Array<T> };

export interface IError {
  message: string;
  error: string;
  code: number;
}
