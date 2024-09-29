import { NgModule } from '@angular/core';
import { CreateArticleComponent } from './create-article.component';
import { RouterModule } from '@angular/router';
import { TextEditorModule } from '../../widgets/text-editor/text-editor.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ChooseTagsModule } from '../../widgets/choose-tags/choose-tags.module';
import { ChooseFileModule } from '../../widgets/choose-file/choose-file.module';

@NgModule({
  declarations: [CreateArticleComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CreateArticleComponent,
      },
    ]),
    FormsModule,
    TextEditorModule,
    MatButton,
    CommonModule,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    ChooseTagsModule,
    ChooseFileModule,
  ],
})
export default class CreateArticleModule {}
