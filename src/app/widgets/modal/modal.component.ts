import { Component, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.less',
})
export class ModalComponent implements OnChanges {
  @Output('closeModal') closeModal = new EventEmitter();
  @Input('isOpen') isOpen = false;

  close() {
    this.closeModal.emit();
  }

  ngOnChanges() {
    if (this.isOpen) {
      window.document.body.style.overflowY = 'hidden';
    } else {
      window.document.body.style.overflowY = 'auto';
    }
  }

  onModalClick(event: Event) {
    event.stopPropagation();
  }
}
