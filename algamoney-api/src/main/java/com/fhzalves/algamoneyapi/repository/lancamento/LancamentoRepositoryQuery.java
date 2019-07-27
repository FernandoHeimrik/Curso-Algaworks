package com.fhzalves.algamoneyapi.repository.lancamento;

import java.util.List;

import com.fhzalves.algamoneyapi.model.Lancamento;
import com.fhzalves.algamoneyapi.repository.filter.LancamentoFilter;

public interface LancamentoRepositoryQuery {

	public List<Lancamento> filtrar(LancamentoFilter lancamentoFilter);
}
