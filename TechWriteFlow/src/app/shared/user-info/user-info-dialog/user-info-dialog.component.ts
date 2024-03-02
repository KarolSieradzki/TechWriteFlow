import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-info-dialog',
  template: `
    <h1 mat-dialog-title>Your info</h1>
    <div mat-dialog-content>
      <mat-form-field style="width: 100%">
        <input type="text" placeholder="Display Name" matInput [(ngModel)]="data.displayName">
      </mat-form-field>
      <mat-form-field style="width: 100%">
        <textarea placeholder="Description" matInput [(ngModel)]="data.description" rows="5"></textarea>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
        <button mat-button (click)="cancel()">Cancel</button>
        <button mat-button [mat-dialog-close]="data" cdkFocusInitial>
          Save
        </button>
    </div>
  `,
  styles: ``
})
export class UserInfoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UserInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}

  cancel(){
    this.dialogRef.close();
  }

}
