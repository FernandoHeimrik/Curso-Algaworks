import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import 'rxjs/operator/toPromise';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lancamentosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  lancamentoPorCategoria(): Promise<any> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-categoria`)
      .toPromise()
      .then(response => response)
  }

  lancamentoPorDia(): Promise<any> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-dia`)
      .toPromise()
      .then(response => {
        const dados = response;
        this.converterStringsParaDatas(dados);
        return dados;
      });
  }

  private converterStringsParaDatas(dados: any) {
    for(const dado of dados){
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
