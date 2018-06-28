import { NgModule } from '@angular/core';
import {
  MdcButtonModule,
  MdcCardModule,
  MdcChipsModule,
  MdcCheckboxModule,
  MdcDialogModule,
  MdcDrawerModule,
  MdcElevationModule,
  MdcFabModule,
  MdcFormFieldModule,
  MdcIconModule,
  MdcIconToggleModule,
  MdcLinearProgressModule,
  MdcListModule,
  MdcMenuModule,
  MdcRadioModule,
  MdcRippleModule,
  MdcShapeModule,
  MdcSelectModule,
  MdcSliderModule,
  MdcSnackbarModule,
  MdcSwitchModule,
  MdcTextFieldModule,
  MdcThemeModule,
  MdcToolbarModule,
  MdcTypographyModule,
  MdcAppBarModule,
} from '@angular-mdc/web';

@NgModule({
  exports: [
    MdcAppBarModule,
    MdcButtonModule,
    MdcCardModule,
    MdcChipsModule,
    MdcCheckboxModule,
    MdcDialogModule,
    MdcDrawerModule,
    MdcElevationModule,
    MdcFabModule,
    MdcFormFieldModule,
    MdcIconModule,
    MdcIconToggleModule,
    MdcLinearProgressModule,
    MdcShapeModule,
    MdcListModule,
    MdcMenuModule,
    MdcRadioModule,
    MdcRippleModule,
    MdcSelectModule,
    MdcSliderModule,
    MdcSnackbarModule,
    MdcSwitchModule,
    MdcTextFieldModule,
    MdcThemeModule,
    MdcToolbarModule,
    MdcTypographyModule,
  ]
})
export class AppMaterialModule { }