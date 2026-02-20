import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Empresa } from '../models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private api = 'http://localhost:8080/empresas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.api)
      .pipe(
        tap(res => console.log('Dados recebidos do backend (empresas):', res))
      );
  }

  criar(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.api, empresa);
  }

  atualizar(id: number, empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.api}/${id}`, empresa);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  buscarPorId(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.api}/${id}`);
  }
}
