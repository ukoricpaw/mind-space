import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from '../../store/reducers/user/user.constants';

@Component({
  selector: 'app-widget-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.less',
})
export class ProfileComponent implements OnChanges {
  @Input('user') user!: IUser;

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}
