import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TeamComponent } from './components';
import { TeamService, TruncatePipe } from './services';
import { TeamHeadingComponent } from './components/dyn-team-heading.component';
import { TeamMembersComponent } from './components/dyn-team-members.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

// other imports
@NgModule({
  declarations: [
    TeamComponent,
    TeamHeadingComponent,
    TeamMembersComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgZorroAntdModule
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
