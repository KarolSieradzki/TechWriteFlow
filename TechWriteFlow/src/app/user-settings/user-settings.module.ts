import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { SharedModule } from '../shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';
import { SetAliasComponent } from './settings-page/set-alias/set-alias.component';

@NgModule({
  declarations: [
    SettingsPageComponent,
    SetAliasComponent
  ],
  imports: [
    CommonModule,
    UserSettingsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class UserSettingsModule { }
