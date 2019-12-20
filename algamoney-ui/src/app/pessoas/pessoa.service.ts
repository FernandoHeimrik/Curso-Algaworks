import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Pessoa, Estado, Cidade } from '../core/model';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}


@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl: string;
  cidadesUrl: string;
  estadosUrl: string;

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}?resumo`, { params })
      .toPromise()
      .then(response => {
        const pessoas = response['content'];
        const resultado = {
          pessoas,
          total: response['totalElements']
        };
        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    return this.http.get(`${this.pessoasUrl}`).toPromise()
      .then(response => {
        const todasPessoas = response['content'];
        return todasPessoas;
      });
  }

  excluir(id: number): Promise<void> {

    return this.http.delete(`${this.pessoasUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(id: number, ativo: boolean): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${id}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<Pessoa>(
      this.pessoasUrl, pessoa, { headers })
      .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.id}`, pessoa, { headers })
      .toPromise()
      .then(response => {
        const pessoa = response as Pessoa;
        return pessoa;
      });
  }

  buscarPorId(id: number): Promise<Pessoa> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get(`${this.pessoasUrl}/${id}`, { headers })
      .toPromise()
      .then(response => {
        const pessoa = response as Pessoa;
        return pessoa;
      });
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get(`${this.estadosUrl}`).toPromise()
      .then(response => response as Estado[]);
  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    let params = new HttpParams();
    params = params.set('estado', estado);
    return this.http.get(this.cidadesUrl, { params })
      .toPromise()
      .then(response => response as Cidade[]);
  }



}

