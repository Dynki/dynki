import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TeamComponent } from './components';
import { TeamService, TruncatePipe } from './services';
import { TeamHeadingComponent } from './components/dyn-team-heading.component';

// other imports
@NgModule({
  declarations: [
    TeamComponent,
    TeamHeadingComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  exports: [
    TeamComponent
  ],
  providers: [
      TeamService
  ],
})
export class TeamModule {
}
