import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckInComponent } from './routes/check-in/check-in.component';
import { AdicionarPessoaComponent } from './routes/adicionar-pessoa/adicionar-pessoa.component';

const routes: Routes = [
  { path: '', component: CheckInComponent },
  { path: 'adicionar', component: AdicionarPessoaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
