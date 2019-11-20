package com.fhzalves.algamoneyapi.repository.lancamento;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.fhzalves.algamoneyapi.dto.LancamentoEstatisticaCategoria;
import com.fhzalves.algamoneyapi.dto.LancamentoEstatisticaDia;
import com.fhzalves.algamoneyapi.model.Lancamento;
import com.fhzalves.algamoneyapi.repository.filter.LancamentoFilter;
import com.fhzalves.algamoneyapi.repository.projection.ResumoLancamento;

public interface LancamentoRepositoryQuery {

	public List<LancamentoEstatisticaCategoria> porCategoria (LocalDate mesReferencia);
	public List<LancamentoEstatisticaDia> porDia (LocalDate mesReferencia);
	public Page<Lancamento> filtrar(LancamentoFilter lancamentoFilter, Pageable pageable);
	public Page<ResumoLancamento> resumir(LancamentoFilter lancamentoFilter, Pageable pageable);
	
}
