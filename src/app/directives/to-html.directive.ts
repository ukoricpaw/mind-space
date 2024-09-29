import { Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Directive({
  selector: '[toHtml]',
})
export class ToHtmlDirective implements OnChanges {
  @Input('content')
  content!: string;

  @Output('safeHtml')
  emitSafeHtml = new EventEmitter<SafeHtml>();
  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.content) {
      const safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.content);
      this.emitSafeHtml.emit(safeHtml);
    }
  }
}
