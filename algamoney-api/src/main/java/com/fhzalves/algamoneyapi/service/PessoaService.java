package com.fhzalves.algamoneyapi.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.fhzalves.algamoneyapi.model.Pessoa;
import com.fhzalves.algamoneyapi.repository.PessoaRepository;

@Service
public class PessoaService {

	@Autowired
	public PessoaRepository pessoaRepository;
	
	public Pessoa atualizar(Long id, Pessoa pessoa) {
		Pessoa pessoaSalva = pessoaRepository.findById(id)
				.orElseThrow(() -> new EmptyResultDataAccessException(1));
		BeanUtils.copyProperties(pessoa, pessoaSalva, "id");
		return pessoaRepository.save(pessoaSalva);
	}
}
