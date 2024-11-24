import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-choose-file',
  templateUrl: './choose-file.component.html',
  styleUrl: './choose-file.component.less',
})
export class ChooseFileComponent implements OnChanges {
  @Input('file')
  file: File | null = null;
  imageTemplate: string | null = null;

  @Input('defaultUrl')
  defaultUrl: string | null = null;

  @Output('fileChange')
  fileChange = new EventEmitter<File>();

  ngOnChanges(changes: SimpleChanges) {
    if (this.file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.onload = data => {
        this.imageTemplate = fileReader.result as string;
      };
    }
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && file.type.includes('image') && file.size <= 10_000_000) this.fileChange.emit(file);
  }
}
