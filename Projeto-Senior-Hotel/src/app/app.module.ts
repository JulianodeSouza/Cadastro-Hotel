/** Angular */
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

/** Angular material */
import { MatSnackBarModule } from '@angular/material/snack-bar';

/** Libs */
import { NgxMaskModule, IConfig } from 'ngx-mask'

/** Components */
import { AppComponent } from './app.component';
import { CheckInComponent } from './routes/check-in/check-in.component';
import { AdicionarPessoaComponent } from './routes/adicionar-pessoa/adicionar-pessoa.component';

//** Pipes */
import { PhonePipe } from 'src/shared/pipe-telefone';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

const maskConfig: Partial<IConfig> = {
  validation: false,
  dropSpecialCharacters: true
};

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    /** Componentes */
    CheckInComponent,
    AdicionarPessoaComponent,

    /** Pipes */
    PhonePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,

    /** Angular material */
    MatSnackBarModule,

    /** Libs */
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
