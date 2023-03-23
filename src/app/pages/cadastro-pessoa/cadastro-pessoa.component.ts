import { MessageService } from './../../services/message.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PessoaService } from './../../services/pessoa.service';
import { PessoaModel } from './../../models/pessoa-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.scss']
})
export class CadastroPessoaComponent implements OnInit {

  form: FormGroup;
  isLoading = false;
  pessoaEdicao = new PessoaModel();

  coresSelect = ['Branca', 'Parda']
  
  constructor(private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private activeRoute: ActivatedRoute,
    private messageService: MessageService) {
    //Iniciando o Formulário
    this.form = this.formBuilder.group({
      id: [],
      nome: ['', Validators.min(2)],
      cpf: ['', Validators.min(9)],
      dataDeNascimento: [],
      email: ['', Validators.email],
      profissao: ['', Validators.min(2)],
      cor: ['Branca']
    });
   }

  ngOnInit(): void {
   this.buscarPessoaEdicao();
  }

  buscarPessoaEdicao(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    console.log(id);
    if(id) {
       this.pessoaService.findById(Number(id)).subscribe(data => {
        this.pessoaEdicao = data;
        this.form.get('id')?.setValue(data.id);
        this.form.get('nome')?.setValue(data.nome);
        this.form.get('cpf')?.setValue(data.cpf);
        this.form.get('cor')?.setValue(data.cor);
        this.form.get('profissao')?.setValue(data.profissao);
        this.form.get('email')?.setValue(data.email);
        this.form.get('dataDeNascimento')?.setValue(data.dataDeNascimento);
      });
    }
  }

  limpar(): void {
    this.form.reset();
  }

  salvar(): void {
    this.isLoading = true;
    const pessoa: PessoaModel = this.form.value;
     this.pessoaService.save(pessoa).subscribe(data => {
      this.messageService.sucess(`Salvo com sucesso! ID: ${data.id}`);
      this.limpar();
      this.isLoading = false;
     });
  }

}
