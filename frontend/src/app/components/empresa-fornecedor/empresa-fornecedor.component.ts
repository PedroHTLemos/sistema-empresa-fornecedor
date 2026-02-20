import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { EmpresaService } from '../../services/empresa.service';
import { FornecedorService } from '../../services/fornecedor.service';

@Component({
  selector: 'app-empresa-fornecedor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empresa-fornecedor.component.html',
  styleUrls: ['./empresa-fornecedor.component.css']
})
export class EmpresaFornecedorComponent implements OnInit {

  empresas: any[] = [];
  fornecedores: any[] = [];

  empresaSelecionadaId: number | null = null;
  fornecedorSelecionadoId: number | null = null;

  empresaSelecionada: any = null;
  fornecedorSelecionado: any = null;

  carregandoEmpresas = false;
  carregandoFornecedores = false;

  constructor(
    private empresaService: EmpresaService,
    private fornecedorService: FornecedorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listarEmpresas();
    this.listarFornecedores();
  }

  listarEmpresas(): void {
    this.carregandoEmpresas = true;

    this.empresaService.listar()
      .pipe(
        finalize(() => {
          this.carregandoEmpresas = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (empresas) => {
          this.empresas = empresas || [];
          console.log("Empresas carregadas:", this.empresas);
        },
        error: (err) => {
          console.error("Erro ao carregar empresas:", err);
        }
      });
  }

  listarFornecedores(): void {
    this.carregandoFornecedores = true;

    this.fornecedorService.listar()
      .pipe(
        finalize(() => {
          this.carregandoFornecedores = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (fornecedores) => {
          this.fornecedores = fornecedores || [];
          console.log("Fornecedores carregados:", this.fornecedores);
        },
        error: (err) => {
          console.error("Erro ao carregar fornecedores:", err);
        }
      });
  }

  selecionarEmpresaPorId(id: number | null): void {
    this.empresaSelecionadaId = id;

    if (!id) {
      this.empresaSelecionada = null;
      return;
    }

    this.empresaSelecionada =
      this.empresas.find(e => e.id === id) || null;
  }

  selecionarFornecedorPorId(id: number | null): void {
    this.fornecedorSelecionadoId = id;

    if (!id) {
      this.fornecedorSelecionado = null;
      return;
    }

    this.fornecedorSelecionado =
      this.fornecedores.find(f => f.id === id) || null;
  }
}