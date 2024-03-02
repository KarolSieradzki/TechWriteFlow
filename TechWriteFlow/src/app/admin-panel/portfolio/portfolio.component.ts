import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../shared/firestore-models/user.model'
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Project } from '../../shared/firestore-models/project.model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {

  user: User = null!;
  projects: Project[] = [];

  constructor(
    public auth: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitzer: DomSanitizer,
    private breakpointObserver: BreakpointObserver,
  ) {
    auth.user$.subscribe(user => {
      this.user = user!;
    })

    this.matIconRegistry.addSvgIcon(
      'plus-solid',
      this.domSanitzer.bypassSecurityTrustResourceUrl('../../../assets/icons/plus-solid.svg')
    );
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
