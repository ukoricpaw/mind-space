import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseFileComponent } from './choose-file.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChooseFileComponent],
  imports: [CommonModule, FormsModule],
  exports: [ChooseFileComponent],
})
export class ChooseFileModule {}
