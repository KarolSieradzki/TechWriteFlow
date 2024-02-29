import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopBarComponent {

  siteName = "TechWriteFlow"; 

  constructor(
    public afAuth: AngularFireAuth,
    private breakpointObserver: BreakpointObserver,
    private matIconRegistry: MatIconRegistry,
    private domSanitzer: DomSanitizer,
  ){
    this.matIconRegistry.addSvgIcon(
      'sliders-solid',
      this.domSanitzer.bypassSecurityTrustResourceUrl('../../../assets/icons/sliders-solid.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'user-pen-solid',
      this.domSanitzer.bypassSecurityTrustResourceUrl('../../../assets/icons/user-pen-solid.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'address-card-regular',
      this.domSanitzer.bypassSecurityTrustResourceUrl('../../../assets/icons/address-card-regular.svg')
    );
  }


  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}
