import { Component, OnDestroy } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-moderation',
  templateUrl: './moderation.component.html',
  styleUrl: './moderation.component.less',
})
export class ModerationComponent implements OnDestroy {
  constructor(private navigation: NavigationService) {
    this.navigation.$navSubject.next([{ name: 'moderation', action: 'disable' }]);
  }

  ngOnDestroy(): void {
    this.navigation.$navSubject.next([{ name: 'moderation', action: 'enable' }]);
  }
}
