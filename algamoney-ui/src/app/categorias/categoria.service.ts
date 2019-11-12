import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl: string;

  constructor(private http: HttpClient) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }


  buscarTodas(): Promise<any> {
    // const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.categoriasUrl}`)
      .toPromise()
      .then(resultado => resultado);
  }

}
