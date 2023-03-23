import { AbstractHttpService } from './abstract-http.service';
import { Injectable } from '@angular/core';
import { PessoaModel } from '../models/pessoa-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoaService extends AbstractHttpService<PessoaModel, number>{

  constructor(private http: HttpClient) {
    super(http);
  }

  getApiUrl(): string {
    return `${environment.api_url}/pessoa`;
  }
}
