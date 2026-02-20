import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  private baseUrl = 'http://localhost:8080/fornecedores';

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  criar(fornecedor: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, fornecedor);
  }

  atualizar(id: number, fornecedor: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, fornecedor);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  buscar(nome: string, cpfCnpj: string) {
    return this.http.get<any[]>(
      `http://localhost:8080/fornecedores/buscar?nome=${nome}&cpfCnpj=${cpfCnpj}`
    );
  }
}