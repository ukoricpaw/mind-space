import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseTagsComponent } from './choose-tags.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ChooseTagsComponent],
  imports: [CommonModule, MatSelectModule],
  exports: [ChooseTagsComponent],
})
export class ChooseTagsModule {}
