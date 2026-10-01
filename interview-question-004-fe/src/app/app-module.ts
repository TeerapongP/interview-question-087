import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import Aura from '@primeuix/themes/aura';
import { ButtonModule } from 'primeng/button';
import { providePrimeNG } from 'primeng/config';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ButtonModule,
    DatePickerModule,
    FileUploadModule,
    InputMaskModule,
    InputTextModule,
    MessageModule,
    RadioButtonModule,
    SelectModule,
    ToastModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    providePrimeNG({ theme: { preset: Aura } }),
    MessageService,
    provideHttpClient(),
  ],
  bootstrap: [App]
})
export class AppModule { }
