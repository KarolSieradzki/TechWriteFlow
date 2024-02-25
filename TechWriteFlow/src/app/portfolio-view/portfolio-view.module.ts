import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioViewRoutingModule } from './portfolio-view-routing.module';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';


@NgModule({
  declarations: [
    PortfolioPageComponent,
    ProjectPageComponent
  ],
  imports: [
    CommonModule,
    PortfolioViewRoutingModule
  ]
})
export class PortfolioViewModule { }
