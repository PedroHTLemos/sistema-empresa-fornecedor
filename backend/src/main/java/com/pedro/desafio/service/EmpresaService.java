package com.pedro.desafio.service;

import com.pedro.desafio.exception.RegraNegocioException;
import com.pedro.desafio.model.Empresa;
import com.pedro.desafio.model.Fornecedor;
import com.pedro.desafio.repository.EmpresaRepository;
import com.pedro.desafio.repository.FornecedorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EmpresaService {

    private final EmpresaRepository empresaRepository;
    private final FornecedorRepository fornecedorRepository;

    public EmpresaService(EmpresaRepository empresaRepository,
                          FornecedorRepository fornecedorRepository) {
        this.empresaRepository = empresaRepository;
        this.fornecedorRepository = fornecedorRepository;
    }

    public List<Empresa> listar() {
        return empresaRepository.findAll();
    }

    public Empresa buscarPorId(Long id) {
        return empresaRepository.findById(id)
                .orElseThrow(() -> new RegraNegocioException("Empresa não encontrada: " + id));
    }

    public Set<Fornecedor> buscarFornecedores(Long empresaId) {
        Empresa empresa = buscarPorId(empresaId);
        return empresa.getFornecedores();
    }

    @Transactional
    public Empresa salvar(Empresa empresa) {
        if (empresa.getFornecedores() != null) {
            Set<Fornecedor> fornecedoresReais = empresa.getFornecedores().stream()
                    .map(f -> fornecedorRepository.findById(f.getId())
                            .orElseThrow(() -> new RegraNegocioException("Fornecedor não encontrado: " + f.getId())))
                    .collect(Collectors.toSet());
            empresa.setFornecedores(fornecedoresReais);
        }
        return empresaRepository.save(empresa);
    }

    @Transactional
    public Empresa atualizar(Long id, Empresa novo) {
        Empresa empresa = buscarPorId(id);
        empresa.setNomeFantasia(novo.getNomeFantasia());
        if (novo.getFornecedores() != null) {
            Set<Fornecedor> fornecedoresReais = novo.getFornecedores().stream()
                    .map(f -> fornecedorRepository.findById(f.getId())
                            .orElseThrow(() -> new RegraNegocioException("Fornecedor não encontrado: " + f.getId())))
                    .collect(Collectors.toSet());
            empresa.setFornecedores(fornecedoresReais);
        }
        return empresaRepository.save(empresa);
    }

    @Transactional
    public void deletar(Long id) {
        Empresa empresa = buscarPorId(id);
        empresaRepository.delete(empresa);
    }
}
