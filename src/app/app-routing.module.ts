import { ListarPessoaComponent } from './pages/listar-pessoa/listar-pessoa.component';
import { CadastroPessoaComponent } from './pages/cadastro-pessoa/cadastro-pessoa.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full',  component: HomeComponent},
  {path: 'listar-pessoa', component: ListarPessoaComponent},
  {path: 'cadastro-pessoa',   component: CadastroPessoaComponent},
  {path: 'editar-pessoa',   component: CadastroPessoaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
