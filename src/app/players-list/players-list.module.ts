import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersListRoutingModule } from './players-list-routing.module';
import { PlayersListComponent } from './players-list.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [PlayersListComponent],
  imports: [
    CommonModule,
    PlayersListRoutingModule,
     HttpClientModule,
  ],
  exports:[PlayersListComponent]
})
export class PlayersListModule { }
