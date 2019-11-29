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
	
	public Pessoa salvar(Pessoa pessoa) {
		pessoa.getContatos().forEach(c -> c.setPessoa(pessoa));
		return pessoaRepository.save(pessoa);
	}
	
	public Pessoa atualizar(Long id, Pessoa pessoa) {
		Pessoa pessoaSalva = buscarPessoaPorId(id);
		
		pessoaSalva.getContatos().clear();
		pessoaSalva.getContatos().addAll(pessoa.getContatos());
		pessoaSalva.getContatos().forEach(c -> c.setPessoa(pessoaSalva));
		
		BeanUtils.copyProperties(pessoa, pessoaSalva, "id", "contatos");
		return pessoaRepository.save(pessoaSalva);
	}


	public void atualizarPropriedadeAtivo(Long id, Boolean ativo) {
		Pessoa pessoaSalva = buscarPessoaPorId(id);
		pessoaSalva.setAtivo(ativo);
		pessoaRepository.save(pessoaSalva);
		
	}
	
	public Pessoa buscarPessoaPorId(Long id) {
		Pessoa pessoaSalva = pessoaRepository.findById(id)
				.orElseThrow(() -> new EmptyResultDataAccessException(1));
		return pessoaSalva;
	}
}
