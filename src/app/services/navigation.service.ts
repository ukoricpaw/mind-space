import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  $navSubject = new Subject<{ name: string; action: 'enable' | 'disable' }[]>();
}
