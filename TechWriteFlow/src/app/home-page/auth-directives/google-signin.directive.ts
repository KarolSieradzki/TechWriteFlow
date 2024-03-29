import { Directive, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {

  constructor(private authService: AuthService) { }

  @HostListener('click')
  onClick(){
    this.authService.googleSignin();
  }

}
