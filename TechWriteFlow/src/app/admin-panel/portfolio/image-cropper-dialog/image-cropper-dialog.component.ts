import { Component, Inject, signal } from '@angular/core';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

export type CropperDialogData = {
  image: File;
  width: number;
  height: number;
};

export type CropperDialogResult = {
  blob: Blob;
  imageUrl: string;
};

@Component({
  selector: 'app-image-cropper-dialog',
  template: `
    <h1 mat-dialog-title>Please crop your project photo</h1>
    <div mat-dialog-content>
      <image-cropper
        [maintainAspectRatio]="true"
        [aspectRatio]="data.width / data.height"
        [resizeToHeight]="data.height"
        [resizeToWidth]="data.width"
        [onlyScaleDown]="true"
        [imageFile]="data.image"
        (imageCropped)="imageCropped($event)"
      ></image-cropper>
    </div>

    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-button [mat-dialog-close]="result()" cdkFocusInitial>
        Done
      </button>
    </div>
  `,
  styles: ``
})
export class ImageCropperDialogComponent {

  result = signal<CropperDialogResult | undefined>(undefined);

  constructor(
    public dialogRef: MatDialogRef<ImageCropperDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:CropperDialogData,
  ) {}

  imageCropped(event: ImageCroppedEvent) {
    const { blob, objectUrl } = event;
    if (blob && objectUrl) {
      this.result.set({ blob, imageUrl: objectUrl });
    }
  }

}
