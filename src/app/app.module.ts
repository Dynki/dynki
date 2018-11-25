import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { AngularFireModule } from '@angular/fire';
import { SidebarModule } from 'ng-sidebar';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { QuillModule } from 'ngx-quill';

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
import { AngularFireFunctionsModule, FunctionsRegionToken } from '@angular/fire/functions';
import { NgZorroAntdModule, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


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
    { provide: FunctionsRegionToken, useValue: 'us-central1' },
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' }, // If not provided, Ant Design's official blue would be used
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class AppModule {
}
