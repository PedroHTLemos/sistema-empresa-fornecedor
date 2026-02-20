# Desafio Fullstack - Sistema Empresa & Fornecedor

Projeto desenvolvido como desafio técnico Fullstack utilizando:

- Backend: Java + Spring Boot
- Frontend: Angular
- Banco de dados: MySQL

---

## Objetivo

Sistema para gerenciamento de:

- Empresas
- Fornecedores
- Relacionamento entre Empresa e Fornecedor

Como regras de negócio e validações específicas.

---

O projeto está dividido em duas aplicações:


- backend → API REST Spring Boot
- frontend → Aplicação Angular

---

Backend - Spring Boot

## Tecnologias utilizadas

- Java 17+
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- API ViaCep (validação de CEP)

## Como executar o backend

Entre na pasta:

cd backend

Execute:

./mvnw spring-boot:run

A API estará disponível em:

http://localhost:8080

---

# Frontend - Angular

## Tecnologias utilizadas

- Angular
- TypeScript
- RxJS
- Standalone Components

## Como executar o frontend

Entre na pasta:

cd frontend

instale as dependências:

npm install

Execute:

ng serve

A aplicação estará disponível em:

http://localhost:4200

---

# Funcionalidades

## Empresas

- Criar empresas
- Editar empresas
- Excluir empresas
- Listar empresas

## Fornecedores

- Criar fornecedores
- Editar fornecedores
- Excluir fornecedores
- Listar fornecedores
- Filtro por nome e CPF/CNPJ
- Validação de CEP via API ViaCEP

## Relacionamentos

- Associação entre Empresa e Fornecedor
- Visualização de vínculos
- Atualização dinâmica via dropdown

---

# Regras de Negócio

- Validação de CPF/CNPJ
- Validação de CEP
- Tratamento global de exceções
- Respostas padronizadas da API

---

# Autor

Pedro Lemos
Desenvolvedor Fullstack

---

# Observações

Durante o desenvolvimento, a API originalmente proposta para consulta de CEP (http://cep.la/ap) encontrava-se indisponível.

Diante disso, foi utilizada a API pública ViaCEP (https://viacep.com.br) como alternativa para manter a funcionalidade de validação de CEP.

A integração foi implementada no backend utilizando RestTemplate, mantendo o isolamento da regra de negócio e garantindo que o frontend não fosse impactado pela mudança de fornecedor da API.