import { Title } from '@angular/platform-browser';
import { NgForm, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { Pessoa, Contato } from 'src/app/core/model';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }


  ngOnInit() {
    const idPessoa = this.route.snapshot.params['id'];

    this.carregarEstados();
    if (idPessoa) {
      this.carregarPessoa(idPessoa)
    }

    this.title.setTitle('Nova Pessoa')
  }

  get editando() {
    return Boolean(this.pessoa.id)
  }

  carregarEstados() {
    this.pessoaService.listarEstados().then(lista => {
      this.estados = lista.map(uf => ({ label: uf.nome, value: uf.id }));
    })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado).then(lista => {
      this.cidades = lista.map(c => ({ label: c.nome, value: c.id }));
    })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoa(id: number) {
    this.pessoaService.buscarPorId(id)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.estadoSelecionado = (this.pessoa.endereco.cidade) ?
          this.pessoa.endereco.cidade.estado.id : null;

        if (this.estadoSelecionado) {
          this.carregarCidades();
        }
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoa => {
        this.toasty.success(`Pessoa ${this.pessoa.nome} cadastrada com sucesso!`);

        this.router.navigate(['/pessoas', pessoa.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: NgForm) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.toasty.success('Pessoa atualizada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: NgForm) {
    form.reset();

    setTimeout(function () {
      this.pessoa = new Pessoa();
    }.bind(this), 1)

    this.router.navigate(['/pessoas/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

}
