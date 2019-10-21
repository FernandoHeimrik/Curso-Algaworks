import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {
  pessoas =[
    {nome:'Manoel Pinheiro',cidade:'Uberlândia',estado:'MG',ativo:true},
    {nome:'Sebastião da Silva',cidade:'São Paulo',estado:'SP',ativo:false},
    {nome:'Carlos Souza',cidade:'Florianopólis',estado:'SC',ativo:true},
    {nome:'Luis Pereira',cidade:'Curitiba',estado:'PR',ativo:true},
    {nome:'Vilmar Andrade',cidade:'Rio de Janeiro',estado:'RJ',ativo:false}
  ]
}
