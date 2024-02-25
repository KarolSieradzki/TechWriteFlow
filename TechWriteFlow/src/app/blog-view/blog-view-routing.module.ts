import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { PostPageComponent } from './post-page/post-page.component';

const routes: Routes = [
  { path: ':uid', component: BlogPageComponent},
  { path: ':uid/:pid', component: PostPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogViewRoutingModule { }
