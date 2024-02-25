import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AccountSettingsService } from '../../account-settings.service';

@Component({
  selector: 'app-set-alias',
  templateUrl: './set-alias.component.html',
  styleUrl: './set-alias.component.scss'
})
export class SetAliasComponent  implements OnInit{
  setUniqueNameForm: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    public settings: AccountSettingsService
    ){}

    ngOnInit(): void {
      this.setUniqueNameForm = this.fb.group({
        uniqueName: ['', [Validators.required, Validators.minLength(1)]]
      })
    }

    async submitUniqeName(){

    }
}
