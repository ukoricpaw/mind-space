import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.less',
})
export class AvatarComponent {
  @Input('size')
  size: number = 40;

  @Input('imageUrl')
  url!: string | null;
}
