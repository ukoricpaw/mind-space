import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.less',
})
export class CreateCommentComponent implements OnInit {
  @Output('createComment') createComment = new EventEmitter();

  @Input('isLoading')
  isLoading = false;
  buttonIsDisabled = true;
  formControl = new FormControl<string>('');

  ngOnInit() {
    this.formControl.valueChanges.subscribe(value => {
      this.buttonIsDisabled = !!(!value || (value && value.length <= 50));
    });
  }

  onSubmitHandler() {
    this.createComment.emit(this.formControl.value);
    this.formControl.reset();
  }
}
