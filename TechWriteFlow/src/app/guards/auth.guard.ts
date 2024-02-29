import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SnackService } from '../services/snack/snack.service';
import { AuthService } from '../services/auth/auth.service';
import { Observable, map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private snack: SnackService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(
      take(1),
      map(user => !!user), // Przekształć user na wartość boolean: true, jeśli user istnieje, w przeciwnym razie false
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.snack.authError(); // Pokaż komunikat, jeśli użytkownik nie jest zalogowany
          this.router.navigate(['']);
        }
      })
    );
  }
}

    // const user = await this.afAuth.currentUser;
    // console.log(user)
    // const isLoggedIn = !!user;
    // if (!isLoggedIn) {
    //   this.snack.authError();
    // }
    // return isLoggedIn;
//   }
// }