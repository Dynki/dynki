import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { AngularFireModule } from 'angularfire2';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SidebarModule } from 'ng-sidebar';

import { AppComponent } from './app.component';
import { ShellModule } from './dyn-shell/dyn-shell.module';
import { LambdaUtil } from 'app/shared/aws/labmda.util';
import { environment } from '../environments/environment';
import { AppMaterialModule } from './material.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppMaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ShellModule,
    FlexLayoutModule,
    SidebarModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    NgZorroAntdModule,
    NgxsModule.forRoot([]),
    NgxsRouterPluginModule.forRoot()
   ],
  bootstrap: [AppComponent],
  providers: [LambdaUtil]
})
export class AppModule {
}
