package com.pedro.desafio.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.pedro.desafio.repository.FornecedorRepository;
import com.pedro.desafio.model.Fornecedor;
import com.pedro.desafio.exception.RegraNegocioException;
import java.util.List;

@Service
public class FornecedorService {

    private final FornecedorRepository fornecedorRepository;

    public FornecedorService(FornecedorRepository fornecedorRepository) {
        this.fornecedorRepository = fornecedorRepository;
    }

    public List<Fornecedor> listar() {
        return fornecedorRepository.findAll();
    }

    public List<Fornecedor> buscarPorNome(String nome) {
        return fornecedorRepository.findByNomeContainingIgnoreCase(nome);
    }

    public List<Fornecedor> buscarPorCpfCnpj(String cpfCnpj) {
        return fornecedorRepository.findByCpfCnpj(cpfCnpj);
    }

    public List<Fornecedor> buscarPorNomeAndCpfCnpj(String nome, String cpfCnpj) {
        return fornecedorRepository.findByNomeContainingIgnoreCaseAndCpfCnpj(nome, cpfCnpj);
    }

    public Fornecedor salvar(Fornecedor fornecedor) {
        return fornecedorRepository.save(fornecedor);
    }

    public Fornecedor buscarPorId(Long id) {
        return fornecedorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));
    }

    @Transactional
    public void deletar(Long id) {
        Fornecedor f = fornecedorRepository.findById(id)
            .orElseThrow(() -> new RegraNegocioException("Fornecedor não encontrado: " + id));
        f.getEmpresas().forEach(e -> e.getFornecedores().remove(f));
        fornecedorRepository.delete(f);
    }

    @Transactional
    public void deletarTodos() {
        fornecedorRepository.deleteAll();
    }
}