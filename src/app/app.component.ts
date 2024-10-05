import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TAppStore } from './store/store.reducer';
import { refreshUser } from './store/reducers/user/user.actions';
import { isUserAuthSelector } from './store/reducers/user/user.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.less'],
})
export default class AppComponent implements OnInit, OnDestroy {
  $isAuth!: Subscription;
  constructor(
    private store: Store<TAppStore>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(refreshUser());
    this.$isAuth = this.store.select(isUserAuthSelector).subscribe(data => {
      if (!data) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    this.$isAuth.unsubscribe();
  }
}
