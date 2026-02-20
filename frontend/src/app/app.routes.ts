import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { FornecedorComponent } from './components/fornecedor/fornecedor.component';
import { EmpresaFornecedorComponent } from './components/empresa-fornecedor/empresa-fornecedor.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'empresas', component: EmpresaComponent },
      { path: 'fornecedores', component: FornecedorComponent },
      { path: 'relacoes', component: EmpresaFornecedorComponent }
    ]
  }
];
