import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FornecedorService } from '../../services/fornecedor.service';
import { EmpresaService } from '../../services/empresa.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fornecedor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {

  fornecedores: any[] = [];
  fornecedoresFiltrados: any[] = [];
  empresas: any[] = [];
  dropdownAberto = false;

  filtroNome = '';
  filtroCpfCnpj = '';

  fornecedorForm: any = {
    nome: '',
    cpfCnpj: '',
    rg: '',
    dataNascimento: '',
    email: '',
    cep: '',
    empresas: []
  };

  editando = false;

  constructor(
    private fornecedorService: FornecedorService,
    private empresaService: EmpresaService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.listarFornecedores();
    this.carregarEmpresas();
  }

  listarFornecedores() {
    this.fornecedorService.listar().subscribe(res => {
      this.fornecedores = res || [];
      this.fornecedoresFiltrados = [...this.fornecedores];
    });
  }

  carregarEmpresas() {
    this.empresaService.listar().subscribe(res => {
      this.empresas = res || [];
    });
  }

  aplicarFiltro() {
    this.fornecedoresFiltrados = this.fornecedores.filter(f =>
      (!this.filtroNome ||
        f.nome.toLowerCase().includes(this.filtroNome.toLowerCase())) &&
      (!this.filtroCpfCnpj ||
        f.cpfCnpj.includes(this.filtroCpfCnpj))
    );
  }

  limparFiltro() {
    this.filtroNome = '';
    this.filtroCpfCnpj = '';
    this.fornecedoresFiltrados = [...this.fornecedores];
  }

  toggleEmpresa(id: number) {
    const idx = this.fornecedorForm.empresas.indexOf(id);
    idx > -1
      ? this.fornecedorForm.empresas.splice(idx, 1)
      : this.fornecedorForm.empresas.push(id);
  }

  isEmpresaSelecionada(id: number) {
    return this.fornecedorForm.empresas.includes(id);
  }

  salvarFornecedor() {

    const payload = {
      ...this.fornecedorForm,
      empresas: (this.fornecedorForm.empresas || [])
        .map((id: number) => ({ id }))
    };

    const operacao = this.editando && this.fornecedorForm.id
      ? this.fornecedorService.atualizar(this.fornecedorForm.id, payload)
      : this.fornecedorService.criar(payload);

    operacao.subscribe({
      next: () => {
        this.resetForm();
        this.listarFornecedores();
      },
      error: () => alert("Erro ao salvar fornecedor.")
    });
  }

  editarFornecedor(fornecedor: any) {
    this.fornecedorForm = {
      ...fornecedor,
      empresas: fornecedor.empresas?.map((e: any) => e.id) || []
    };
    this.editando = true;
    this.dropdownAberto = false;
  }

  excluirFornecedor(id: number) {
    if (!confirm('Deseja realmente excluir este fornecedor?')) return;

    this.fornecedorService.deletar(id).subscribe({
      next: () => this.listarFornecedores(),
      error: () => alert("Erro ao excluir fornecedor.")
    });
  }

  validarCep() {
    const cep = this.fornecedorForm.cep?.replace(/\D/g, '');

    if (!cep || cep.length !== 8) {
      alert("CEP inválido.");
      return;
    }

    this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
      .subscribe({
        next: (res: any) => {
          if (res.erro) {
            alert("CEP não encontrado.");
          }
        },
        error: () => alert("Erro ao validar CEP.")
      });
  }

  resetForm() {
    this.fornecedorForm = {
      nome: '',
      cpfCnpj: '',
      rg: '',
      dataNascimento: '',
      email: '',
      cep: '',
      empresas: []
    };
    this.editando = false;
    this.dropdownAberto = false;
  }

  empresasSelecionadas(fornecedor: any) {
    return fornecedor.empresas?.length || 0;
  }
}