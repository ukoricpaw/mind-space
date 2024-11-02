import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TAppStore } from '../../store/store.reducer';
import { IUser } from '../../store/reducers/user/user.constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.less',
})
export class ProfileComponent {
  user: IUser | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<TAppStore>,
  ) {
    activatedRoute.paramMap.subscribe(params => console.log(params.get('profileId')));
  }
}
