import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';

import { CategoriaService } from './../../categorias/categoria.service';
import { Lancamento } from 'src/app/core/model';
import { LancamentoService } from '../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();
  formulario: FormGroup;

  constructor(
    private lancamentoService: LancamentoService,
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    const idLancamento = this.route.snapshot.params['id'];

    this.title.setTitle('Novo lançamento');

    if (idLancamento) {
      this.carregarLancamento(idLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [Validators.required, Validators.minLength(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      }),
      observacao: []
    });
  }

  get editando() {
    return Boolean(this.lancamento.id);
  }

  carregarLancamento(id: number) {
    this.lancamentoService.buscarPorId(id)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(lancamento => {
        this.toasty.success(`Lançamento ${this.lancamento.descricao} adicionado com sucesso!`);

        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos', lancamento.id]);
      })
      .catch(erro => console.log(erro));
  }

  atualizarLancamento(form: NgForm) {
    this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento => {
        this.lancamento = lancamento;

        this.toasty.success('Lançamento atualizado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.buscarTodas()
      .then(categorias => {
        // this.categorias = categorias.map(c => {
        //   return { label: c.nome, value: c.id};
        // });
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: NgForm) {
    form.reset();

    setTimeout(function () {
      this.lancamento = new Lancamento();
    }.bind(this), 1)

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

}
