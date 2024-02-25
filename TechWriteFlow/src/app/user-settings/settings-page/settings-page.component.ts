import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AccountSettingsService } from '../account-settings.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})

export class SettingsPageComponent implements OnInit{

  settingsOptions={
    alias:'alias',
    // add here rest of settings params
  }

  highlightedOption: string = '';

  constructor(
    private route:ActivatedRoute,
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    public settings: AccountSettingsService
  ){}


  ngOnInit(): void {
    this.highlightedOption = this.route.snapshot.params['option'];
  }
  

}
