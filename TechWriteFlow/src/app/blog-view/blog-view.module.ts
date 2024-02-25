import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogViewRoutingModule } from './blog-view-routing.module';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { PostPageComponent } from './post-page/post-page.component';


@NgModule({
  declarations: [
    BlogPageComponent,
    PostPageComponent
  ],
  imports: [
    CommonModule,
    BlogViewRoutingModule
  ]
})
export class BlogViewModule { }
