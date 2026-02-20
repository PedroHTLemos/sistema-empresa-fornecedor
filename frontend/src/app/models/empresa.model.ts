import { Fornecedor } from './fornecedor.model';

export interface Empresa {
  id?: number;
  nomeFantasia: string;
  cnpj: string;
  cep: string;
  fornecedores?: Fornecedor[];
}
