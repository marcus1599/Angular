import { MessageService } from './../../services/message.service';
import { PessoaService } from './../../services/pessoa.service';
import { PessoaModel } from './../../models/pessoa-model';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pessoa',
  templateUrl: './listar-pessoa.component.html',
  styleUrls: ['./listar-pessoa.component.scss']
})
export class ListarPessoaComponent implements OnInit {

  isLoading = false;
  displayedColumns: string[] = ['id', 'nome', 'profissao', 'cpf', 'dataDeNascimento', 'email', 'cor', 'actions'];
  dataSource: MatTableDataSource<PessoaModel> = new MatTableDataSource();

  constructor(private pessoaService: PessoaService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.buscarPessoas();
  }

  async buscarPessoas() {
    this.isLoading = true;
    this.dataSource = new MatTableDataSource(await this.pessoaService.findAll().toPromise());
    this.isLoading = false;
  }

  excluir(valor: PessoaModel): void {
    this.pessoaService.delete(valor.id).subscribe(() => this.messageService.sucess('Excluido com Sucesso!'))
    this.buscarPessoas();
  }

  editar(valor: PessoaModel): void {
    this.router.navigate([`/editar-pessoa`, { id: valor.id }])
  }

}
