import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent{
  lancamentos = [
    { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: '30/09/2019',
      dataPagamento: null, valor: 4.55, pessoa:'Padaria do José'},
    { tipo: 'RECEITA', descricao: 'Venda de software', dataVencimento: '10/09/2019',
      dataPagamento: '09/06/2019', valor: 80000, pessoa: 'Atacado Brasil'},
    { tipo: 'DESPESA', descricao: 'Impostos', dataVencimento: '20/09/2019',
      dataPagamento: null, valor: 14312, pessoa: 'Ministério da Fazenda'},
    { tipo: 'DESPESA', descricao: 'Mensalidade da escola', dataVencimento: '10/09/2019',
      dataPagamento: '09/06/2019', valor: 800, pessoa: 'Escola'}
  ]
}