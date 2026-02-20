import { Empresa } from './empresa.model';

export interface Fornecedor {
  id?: number;
  nome: string;
  cpfCnpj: string;
  rg?: string;
  dataNascimento?: string;
  email: string;
  cep: string;
  empresas?: Empresa[];
}
