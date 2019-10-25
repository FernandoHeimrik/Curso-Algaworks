import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';
import { Table } from 'primeng/table';
import { ToastyService } from 'ng2-toasty';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros: 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela', { static: true }) grid: Table;

  constructor(
    private lancamentoService: LancamentoService,
    private toasty: ToastyService
  ) { }

  ngOnInit(): void {
    // this.pesquisar(); propriedade Lazy já carrega
  }
  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.id)
      .then(() => {
        this.grid.reset();
        this.toasty.success('Lancamento excluído com sucesso!');
      });
  }
}
