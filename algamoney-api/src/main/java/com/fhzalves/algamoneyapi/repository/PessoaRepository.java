package com.fhzalves.algamoneyapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fhzalves.algamoneyapi.model.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long>{

}
