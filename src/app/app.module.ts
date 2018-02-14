import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { AppComponent } from './app.component';
import { ShellModule } from './dyn-shell/dyn-shell.module';
import { LambdaUtil } from 'app/shared/aws/labmda.util';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ShellModule,
    FlexLayoutModule,
    NgZorroAntdModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    LambdaUtil
  ]
})
export class AppModule {
}
