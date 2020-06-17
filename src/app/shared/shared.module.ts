import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './components/popup/popup.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [PopupComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CoreModule
  ],
  exports: [PopupComponent],
  entryComponents: [PopupComponent]
})
export class SharedModule { }
