import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-icon',
  template: `<span [innerHTML]="svgIcon"></span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSvgIconComponent implements OnChanges {
  @Input()
  public name!: string;

  public svgIcon: any;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.name) {
      this.svgIcon = '';
      return;
    } else {
      this.httpClient
        .get(`assets/icons/${this.name}.svg`, {
          responseType: 'text',
        })
        .subscribe(val => {
          this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(val);
          this.cdr.detectChanges();
        });
    }
  }
}
