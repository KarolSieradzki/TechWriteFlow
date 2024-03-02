import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, map, shareReplay } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoDialogComponent } from './user-info-dialog/user-info-dialog.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {

  @Input() displayName: string = '';
  @Input() description: string = '';
  @Input() photoURL: string = '';
  @Input() editable: boolean = false;

  constructor(
    public afAuth: AngularFireAuth,
    private breakpointObserver: BreakpointObserver,
    private matIconRegistry: MatIconRegistry,
    private domSanitzer: DomSanitizer,
    public dialog: MatDialog
  ) {
    this.matIconRegistry.addSvgIcon(
      'pen-to-square-regular',
      this.domSanitzer.bypassSecurityTrustResourceUrl('../../../assets/icons/pen-to-square-regular.svg')
    );
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  openEditDialog() {
    const dialogRef = this.dialog.open(UserInfoDialogComponent, {
      width: '400px',
      data: { displayName: this.displayName, description: this.description }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.displayName = result.displayName;
        this.description = result.description
      }
    })
  }
}
