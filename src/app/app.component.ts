import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TAppStore } from './store/store.reducer';
import { refreshUser } from './store/reducers/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.less'],
})
export default class AppComponent implements OnInit {
  constructor(private store: Store<TAppStore>) {}

  ngOnInit(): void {
    this.store.dispatch(refreshUser());
  }
}
