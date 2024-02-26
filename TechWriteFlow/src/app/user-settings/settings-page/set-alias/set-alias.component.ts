import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { AccountSettingsService } from '../../account-settings.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SnackService } from '../../../services/snack/snack.service';


function uniqueAliasValidator(settings: AccountSettingsService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
    return new Observable(observer => {
      if (!control.value) {
        observer.next(null);
        observer.complete();
      } else {
        settings.checkIfAliasIsUnique(control.value).then(isUnique => {
          if (isUnique) {
            observer.next(null);
          } else {
            observer.next({ nonUniqueAlias: true });
          }
          observer.complete();
        }).catch(() => {
          observer.next({ aliasCheckFailed: true });
          observer.complete();
        });
      }
    });
  };
}

@Component({
  selector: 'app-set-alias',
  templateUrl: './set-alias.component.html',
  styleUrl: './set-alias.component.scss'
})
export class SetAliasComponent implements OnInit {
  setAliasForm: FormGroup | any;

  currentAlias: string = '';
  alaisIsUnique: boolean = true;

  constructor(
    private fb: FormBuilder,
    private snack: SnackService,
    public settings: AccountSettingsService
  ) { }


  ngOnInit(): void {

    this.setAliasForm = this.fb.group({
      alias: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(36)], [uniqueAliasValidator(this.settings)]]
    })

    this.settings.getCurrentUserAlias().then((alias) => {
      this.currentAlias = alias;
    })
  }

  async submitUniqeName() {

    if (this.setAliasForm.valid) {
      let newAlias: string = this.setAliasForm.get('alias').value;
      await this.settings.setNewAliasForCurrentUser(newAlias);
      this.currentAlias = await this.settings.getCurrentUserAlias();

      this.snack.aliasChanged(this.currentAlias);
    }
  }

}
