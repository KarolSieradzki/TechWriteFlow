import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BlogComponent } from './blog/blog.component';
import { SharedModule } from '../shared/shared.module';
import { CreateProjectComponent } from './portfolio/create-project/create-project.component';
import { EditorModule, TINYMCE_SCRIPT_SRC  } from '@tinymce/tinymce-angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropperDialogComponent } from './portfolio/image-cropper-dialog/image-cropper-dialog.component';
import { UserImageControlComponent } from './portfolio/user-image-control/user-image-control.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    OverviewComponent,
    PortfolioComponent,
    BlogComponent,
    CreateProjectComponent,
    ImageCropperDialogComponent,
    UserImageControlComponent,
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule,
    EditorModule,
    ImageCropperModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers:[
    {provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'},
    MatDatepickerModule
  ]
})
export class AdminPanelModule { }
