package com.pedro.desafio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pedro.desafio.service.FornecedorService;
import com.pedro.desafio.model.Fornecedor;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/fornecedores")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class FornecedorController {

    private final FornecedorService fornecedorService;

    @GetMapping
    public List<Fornecedor> listar() {
        return fornecedorService.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fornecedor> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(fornecedorService.buscarPorId(id));
    }

    @GetMapping("/buscar/nome")
    public List<Fornecedor> buscarPorNome(@RequestParam String nome) {
        return fornecedorService.buscarPorNome(nome);
    }

    @GetMapping("/buscar/cpfcnpj")
    public List<Fornecedor> buscarPorCpfCnpj(@RequestParam String cpfCnpj) {
        return fornecedorService.buscarPorCpfCnpj(cpfCnpj);
    }

    @GetMapping("/buscar")
    public List<Fornecedor> buscarPorNomeEcpfCnpj(
            @RequestParam String nome,
            @RequestParam String cpfCnpj) {
        return fornecedorService.buscarPorNomeAndCpfCnpj(nome, cpfCnpj);
    }

    @PostMapping
    public ResponseEntity<Fornecedor> criar(@RequestBody Fornecedor fornecedor) {
        return ResponseEntity.ok(fornecedorService.salvar(fornecedor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fornecedor> atualizar(
            @PathVariable Long id,
            @RequestBody Fornecedor fornecedor) {

        fornecedor.setId(id);
        return ResponseEntity.ok(fornecedorService.salvar(fornecedor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        fornecedorService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/todos")
    public ResponseEntity<Void> deletarTodos() {
        fornecedorService.deletarTodos();
        return ResponseEntity.noContent().build();
    }
}