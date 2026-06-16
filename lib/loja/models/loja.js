export class Produto {
    constructor(descricao, preco) {
        this.descricao = descricao;
        this.preco = Number(preco);
    }
    exibirInformacoes() {
        return `Item: ${this.descricao}\nPreço Original: R$ ${this.preco.toFixed(2)}`;
    }
}

export class Eletronico extends Produto {
    constructor(descricao, preco, garantia) {
        super(descricao, preco);
        this.garantia = Number(garantia);
    }
    calcularDesconto() {
        return this.preco * 0.10;
    }
    exibirInformacoes() {
        const desc = this.calcularDesconto();
        return `${super.exibirInformacoes()}\nGarantia: ${this.garantia} meses\nDesconto Comercial (10%): R$ ${desc.toFixed(2)}\nPreço Final: R$ ${(this.preco - desc).toFixed(2)}`;
    }
}

export class Vestuario extends Produto {
    constructor(descricao, preco, tamanho) {
        super(descricao, preco);
        this.tamanho = tamanho;
        this.historicoPromocional = [];
    }
    aplicarPromocao(porcentagem) {
        const desconto = this.preco * (porcentagem / 100);
        const novoPreco = this.preco - desconto;
        this.historicoPromocional.push(`Promoção de ${porcentagem}% aplicada. Preço caiu para R$ ${novoPreco.toFixed(2)}`);
        return novoPreco;
    }
    consultarHistorico() {
        return this.historicoPromocional.length > 0 ? this.historicoPromocional.join('\n') : "Nenhuma promoção aplicada.";
    }
    exibirInformacoes() {

        const precoPromocao = this.aplicarPromocao(15);
        return `${super.exibirInformacoes()}\nTamanho: ${this.tamanho}\nPreço Promocional (15%): R$ ${precoPromocao.toFixed(2)}\n\n[Histórico do Produto]:\n${this.consultarHistorico()}`;
    }
}