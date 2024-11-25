import { Component, Input, OnChanges } from '@angular/core';
import { IUser } from '../../store/reducers/user/user.constants';
import { USER_ROLES } from '../../types/role.types';

@Component({
  selector: 'app-widget-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.less',
})
export class ProfileComponent implements OnChanges {
  @Input('user') user!: IUser;

  @Input('isAuthenticatedUser') isAuthenticatedUser = false;

  fields: { label: string; value: string | number }[] = [];

  ngOnChanges() {
    const newFields = [];
    newFields.push({ label: 'ID:', value: this.user.id });
    newFields.push({ label: 'Email:', value: this.user.email });
    newFields.push({ label: 'Роль:', value: USER_ROLES[this.user.roleId] });
    this.fields = newFields;
  }

  trackByField(index: number, field: { label: string; value: string | number }) {
    return field.value;
  }
}
