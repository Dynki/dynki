import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { AngularFireModule } from '@angular/fire';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SidebarModule } from 'ng-sidebar';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

/** config ng-zorro-antd i18n **/
import { NZ_I18N, en_US } from 'ng-zorro-antd';

import { AppComponent } from './app.component';
import { ShellModule } from './dyn-shell/dyn-shell.module';
import { LambdaUtil } from './shared/aws/labmda.util';
import { environment } from 'environments/environment';
import { AppMaterialModule } from './material.module';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

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
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    NgZorroAntdModule,
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot()
   ],
  bootstrap: [AppComponent],
  providers: [
    LambdaUtil,
    { provide: NZ_I18N, useValue: en_US }
  ]
})
export class AppModule {
}
