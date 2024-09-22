import { createAction, props } from '@ngrx/store';

export const someAction = createAction(
  '[userAction] create',
  props<{ a: 'hello' }>()
);
