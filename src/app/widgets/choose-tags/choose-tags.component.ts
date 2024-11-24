import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Paginated } from '../../types/common.types';
import { ITag } from '../../store/reducers/article/article.constants';

@Component({
  selector: 'app-choose-tags',
  templateUrl: './choose-tags.component.html',
  styleUrl: './choose-tags.component.less',
})
export class ChooseTagsComponent {
  @Input('tags')
  tags!: Paginated<ITag>;

  @Input('chosenTags')
  chosenTags!: ITag[];

  @Output('chosenTagsChange')
  chosenTagsChange = new EventEmitter<ITag[]>();

  onChangeChosenTags(values: ITag[]) {
    this.chosenTagsChange.emit(values);
  }
}
