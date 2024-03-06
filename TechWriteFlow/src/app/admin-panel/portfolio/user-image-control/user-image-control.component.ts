import { Component, EventEmitter, Input, Output, computed, effect, inject, signal } from '@angular/core';
import { CropperDialogResult, ImageCropperDialogComponent } from '../image-cropper-dialog/image-cropper-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';

@Component({
  selector: 'app-user-image-control',
  templateUrl: './user-image-control.component.html',
  styleUrl: './user-image-control.component.scss'
})
export class UserImageControlComponent {

  @Output() imageReady = new EventEmitter<Blob>();

  imageWidth = signal(0);
  @Input({ required: true }) set width(val: number) {
    this.imageWidth.set(val);
  }

  imageHeight = signal(0);
  @Input({ required: true }) set height(val: number) {
    this.imageHeight.set(val);
  }

  constructor(){
    effect(() => {
      if (this.croppedImage()) {
        this.imageReady.emit(this.croppedImage()?.blob);
      }
    });
  }

  placeholder = computed(
    () => `https://placehold.co/${this.imageWidth()}X${this.imageHeight()}`
  );

  croppedImage = signal<CropperDialogResult | undefined>(undefined);

  imageSource = computed(() => {
    if (this.croppedImage()) {
      return this.croppedImage()?.imageUrl;
    }

    return this.placeholder();
  });
  

  dialog = inject(MatDialog);

  fileSelected(event: any) {
    const file = event.target?.files[0];
    console.log(file);
    if (file) {
      const dialogRef = this.dialog.open(ImageCropperDialogComponent, {
        data: {
          image: file,
          width: this.imageWidth(),
          height: this.imageHeight(),
        },
        width: '500px',
      });

      dialogRef
        .afterClosed()
        .pipe(filter((result) => !!result))
        .subscribe((result: CropperDialogResult) => {
          this.croppedImage.set(result);
        });
    }
  }
  
}
