export class Pessoa {
    id: number;
}

export class Categoria {
    id: number;
}

export class Lancamento {
    id: number;
    tipo = 'RECEITA';
    descricao: string;
    dataVencimento: Date;
    dataPagamento: Date;
    valor: number;
    observacao: string;
    pessoa = new Pessoa();
    categoria = new Categoria();
}
