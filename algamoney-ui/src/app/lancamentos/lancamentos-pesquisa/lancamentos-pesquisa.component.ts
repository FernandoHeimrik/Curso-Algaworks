import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent{
  lancamentos = [
    { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: new Date(2019, 9, 30),
      dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José'},
    { tipo: 'RECEITA', descricao: 'Venda de software', dataVencimento: new Date(2019, 9, 10),
      dataPagamento: new Date(2019, 9, 5), valor: 80000, pessoa: 'Atacado Brasil'},
    { tipo: 'DESPESA', descricao: 'Impostos', dataVencimento: new Date(2019, 9, 20),
      dataPagamento: null, valor: 14312, pessoa: 'Ministério da Fazenda'},
    { tipo: 'DESPESA', descricao: 'Mensalidade da escola', dataVencimento: new Date(2019, 9, 10),
      dataPagamento: new Date(2019, 9, 0o6), valor: 800, pessoa: 'Escola'}
  ]
}
