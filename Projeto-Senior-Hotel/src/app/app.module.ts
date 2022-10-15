/** Angular */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

/** Components */
import { AppComponent } from './app.component';
import { CheckInComponent } from './routes/check-in/check-in.component';
import { AdicionarPessoaComponent } from './routes/adicionar-pessoa/adicionar-pessoa.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckInComponent,
    AdicionarPessoaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
