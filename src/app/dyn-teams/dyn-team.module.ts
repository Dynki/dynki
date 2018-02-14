import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TeamComponent, TeamDetailComponent } from './components';
import { TeamRoutingModule, TeamService, TruncatePipe } from './services';

// other imports
@NgModule({
  declarations: [
    TeamComponent,
    TeamDetailComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    TeamRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    TeamComponent,
    TeamRoutingModule
  ],
  providers: [
      TeamService
  ],
})
export class TeamModule {
}
