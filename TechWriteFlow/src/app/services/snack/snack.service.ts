import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  authError() {
    this.snackBar.open('You must be logged in!', 'OK', {
      duration: 5000
    });
  }

  aliasChanged(newAlias:string) {
    this.snackBar.open('Alias changed to: '+newAlias, 'OK', {
      duration: 3000
    });
  }

}
