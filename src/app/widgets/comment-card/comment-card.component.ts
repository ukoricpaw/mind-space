import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IComment } from '../../store/reducers/article/article.constants';
import { Store } from '@ngrx/store';
import { TAppStore } from '../../store/store.reducer';
import { commentRateLoadingAction } from '../../store/reducers/article/article.actions';
import { isUserAuthSelector, userDataSelector } from '../../store/reducers/user/user.selectors';
import { map, take } from 'rxjs';
import { USER_ROLES } from '../../types/role.types';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentCardComponent {
  @Input('comment') comment!: IComment;

  @Output('openDeleteModal') openDeleteModal = new EventEmitter();

  $isUserAuthSelector = this.store.select(isUserAuthSelector);

  $userDataSelector = this.store.select(userDataSelector);

  constructor(private store: Store<TAppStore>) {}

  checkIsDeletingAvailable() {
    return this.$userDataSelector.pipe(
      take(1),
      map(data => {
        if (!data) return false;
        return data.roleId === USER_ROLES.MODERATOR || data.id === this.comment.userId;
      }),
    );
  }

  dislike() {
    if (this.comment.commentRate[0]?.rate === 0) {
      this.store.dispatch(
        commentRateLoadingAction({ commentId: this.comment.id, rate: { rate: 0, action: 'DELETE' } }),
      );
    } else {
      this.store.dispatch(commentRateLoadingAction({ commentId: this.comment.id, rate: { rate: 0, action: 'ADD' } }));
    }
  }

  openDeleteCommentModal() {
    this.openDeleteModal.emit(this.comment.id);
  }

  like() {
    if (this.comment.commentRate[0]?.rate === 1) {
      this.store.dispatch(
        commentRateLoadingAction({ commentId: this.comment.id, rate: { rate: 1, action: 'DELETE' } }),
      );
    } else {
      this.store.dispatch(commentRateLoadingAction({ commentId: this.comment.id, rate: { rate: 1, action: 'ADD' } }));
    }
  }
}
