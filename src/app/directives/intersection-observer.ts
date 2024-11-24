import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[intersection-observer]',
})
export class IntersectionObserverDirective implements OnChanges {
  @Input('isTriggerOnce') isTriggerOnce: boolean = true;

  @Output('callback') cb = new EventEmitter();

  callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.cb.emit();
        if (this.isTriggerOnce) {
          observer.unobserve(entry.target);
        }
      }
    });
  };

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const observer = new IntersectionObserver(this.callback, { threshold: 1 });
    observer.observe(this.elementRef.nativeElement);
  }
}
