package com.fhzalves.algamoneyapi.dto;

public class Anexo {

	private String nome;

	private String url;

	public Anexo(String nome, String url) {
		this.nome = nome;
		this.url = url;
	}

	public String getNome() {
		return nome;
	}

	public String getUrl() {
		return url;
	}
}
