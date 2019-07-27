package com.fhzalves.algamoneyapi.service;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.fhzalves.algamoneyapi.model.Lancamento;
import com.fhzalves.algamoneyapi.model.Pessoa;
import com.fhzalves.algamoneyapi.repository.LancamentoRepository;
import com.fhzalves.algamoneyapi.repository.PessoaRepository;
import com.fhzalves.algamoneyapi.service.exception.PessoaInexistenteOuInativaException;

@Service
public class LancamentoService {

	@Autowired
	private PessoaRepository pessoaRepository;

	@Autowired
	private LancamentoRepository lancamentoRepository;

	public Lancamento salvar(@Valid Lancamento lancamento) {
		Pessoa pessoa = pessoaRepository.findById(lancamento.getPessoa().getId())
				.orElseThrow(() -> new EmptyResultDataAccessException(1));
		if (pessoa == null || pessoa.isInativo()) {
			throw new PessoaInexistenteOuInativaException();
		}

		return lancamentoRepository.save(lancamento);
	}

}
