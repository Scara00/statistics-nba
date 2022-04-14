import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamDetailRoutingModule } from './team-detail-routing.module';
import { TeamDetailComponent } from './team-detail.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [TeamDetailComponent],
  imports: [
    CommonModule,
    TeamDetailRoutingModule,
    HttpClientModule
  ]
})
export class TeamDetailModule { }
