import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path:'homepage',
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path:'team/:id',
    loadChildren: () => import('./team-detail/team-detail.module').then(m => m.TeamDetailModule)
  },
  {
    path:'news',
    loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
  },
  {
    path:'team-list',
    loadChildren: () => import('./teams-list/teams-list.module').then(m => m.TeamsListModule)
  },
  {
    path:'players-list',
    loadChildren: () => import('./players-list/players-list.module').then(m => m.PlayersListModule)
  },
  {
    path:'rank-list',
    loadChildren: () => import('./rank-season/rank-season.module').then(m => m.RankSeasonModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
