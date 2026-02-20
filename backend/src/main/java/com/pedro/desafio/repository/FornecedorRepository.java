package com.pedro.desafio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pedro.desafio.model.Fornecedor;
import java.util.List;

public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {

    List<Fornecedor> findByNomeContainingIgnoreCase(String nome);
    List<Fornecedor> findByCpfCnpj(String cpfCnpj);
    List<Fornecedor> findByNomeContainingIgnoreCaseAndCpfCnpj(String nome, String cpfCnpj);
}
