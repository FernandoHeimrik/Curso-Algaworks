package com.fhzalves.algamoneyapi.repository.listener;

import javax.persistence.PostLoad;

import org.springframework.util.StringUtils;

import com.fhzalves.algamoneyapi.AlgamoneyApiApplication;
import com.fhzalves.algamoneyapi.model.Lancamento;
import com.fhzalves.algamoneyapi.storage.S3;

public class LancamentoAnexoListener {

	@PostLoad
	public void postLoad(Lancamento lancamento) {
		if (StringUtils.hasText(lancamento.getAnexo())) {
			S3 s3 = AlgamoneyApiApplication.getBean(S3.class);
			lancamento.setUrlAnexo(s3.configurarUrl(lancamento.getAnexo()));
		}
	}
}
