import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { API_URL } from '../types/auth.types';

@Directive({
  selector: '[injectImage]',
})
export class InjectImgDirective implements OnChanges {
  imageUrl: string = `${API_URL}/images/`;

  @Input('imageId')
  imageId!: string;

  constructor(private elementRef: ElementRef<HTMLImageElement>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.imageId) {
      this.elementRef.nativeElement.setAttribute('src', this.imageUrl.concat(this.imageId));
    }
  }
}
