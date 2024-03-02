import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BlogComponent } from './blog/blog.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectPreviewComponent } from '../shared/project-preview/project-preview.component';
import { CreateProjectComponent } from './portfolio/create-project/create-project.component';
import { EditorModule, TINYMCE_SCRIPT_SRC  } from '@tinymce/tinymce-angular';


@NgModule({
  declarations: [
    OverviewComponent,
    PortfolioComponent,
    BlogComponent,
    CreateProjectComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule,
    EditorModule
  ],
  providers:[
    {provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'}
  ]
})
export class AdminPanelModule { }
