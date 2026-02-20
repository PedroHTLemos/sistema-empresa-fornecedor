package com.pedro.desafio.service;

import com.pedro.desafio.exception.RegraNegocioException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class CepService {

    @Autowired
    private RestTemplate restTemplate;

    public String buscarUfPorCep(String cep) {

        if (cep == null || cep.isBlank()) {
            throw new RegraNegocioException("CEP é obrigatório");
        }

        cep = cep.replaceAll("\\D", "");

        if (cep.length() != 8) {
            throw new RegraNegocioException("CEP inválido");
        }

        String url = "https://viacep.com.br/ws/" + cep + "/json/";

        try {

            ResponseEntity<Map> response =
                    restTemplate.getForEntity(url, Map.class);

            Map body = response.getBody();

            if (body == null) {
                throw new RegraNegocioException("CEP não encontrado");
            }

            if (body.containsKey("erro")) {
                throw new RegraNegocioException("CEP inválido");
            }

            Object uf = body.get("uf");

            if (uf == null) {
                throw new RegraNegocioException("UF não encontrada para o CEP");
            }

            return uf.toString();

        } catch (RegraNegocioException e) {
            throw e;
        } catch (Exception e) {
            throw new RegraNegocioException("Erro ao validar CEP");
        }
    }
}
