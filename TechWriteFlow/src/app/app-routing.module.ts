import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'admin-panel', 
    loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
  },
  {
    path: 'portfolio', 
    loadChildren: () => import('./portfolio-view/portfolio-view.module').then(m => m.PortfolioViewModule)
  },
  {
    path: 'blog', 
    loadChildren: () => import('./blog-view/blog-view.module').then(m => m.BlogViewModule)
  },
  {
    path: 'profile-settings', 
    loadChildren: () => import('./user-settings/user-settings.module').then(m => m.UserSettingsModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
