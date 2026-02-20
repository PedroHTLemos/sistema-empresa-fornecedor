import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmpresaService } from '../../services/empresa.service';
import { FornecedorService } from '../../services/fornecedor.service';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  empresas: any[] = [];
  fornecedores: any[] = [];
  dropdownAberto = false;

  empresaForm: any = { nomeFantasia: '', cnpj: '', cep: '', fornecedores: [] };
  editando = false;

  constructor(private empresaService: EmpresaService, private fornecedorService: FornecedorService) {}

  ngOnInit() {
    this.listarEmpresas();
    this.listarFornecedores();
  }

  listarEmpresas() {
    this.empresaService.listar().subscribe(res => this.empresas = res || []);
  }

  listarFornecedores() {
    this.fornecedorService.listar().subscribe(res => this.fornecedores = res || []);
  }

  toggleFornecedor(id: number) {
    const idx = this.empresaForm.fornecedores.indexOf(id);
    idx > -1 ? this.empresaForm.fornecedores.splice(idx, 1) : this.empresaForm.fornecedores.push(id);
  }

  salvarEmpresa() {
    const payload = { ...this.empresaForm, fornecedores: this.empresaForm.fornecedores.map((id: number) => ({ id })) };
    const operacao = this.editando && this.empresaForm.id
      ? this.empresaService.atualizar(this.empresaForm.id, payload)
      : this.empresaService.criar(payload);
    operacao.subscribe(() => { this.resetForm(); this.listarEmpresas(); });
  }

  editarEmpresa(empresa: any) {
    this.empresaForm = { ...empresa, fornecedores: empresa.fornecedores?.map((f: any) => f.id) || [] };
    this.editando = true;
    this.dropdownAberto = false;
  }

  excluirEmpresa(id: number) {
    if (!confirm('Deseja realmente excluir?')) return;
    this.empresaService.excluir(id).subscribe(() => this.listarEmpresas());
  }

  resetForm() {
    this.empresaForm = { nomeFantasia: '', cnpj: '', cep: '', fornecedores: [] };
    this.editando = false;
    this.dropdownAberto = false;
  }

  fornecedoresSelecionados(empresa: any) {
    return empresa.fornecedores?.length || 0;
  }
}