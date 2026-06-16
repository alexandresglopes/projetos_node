export class Conta {
    constructor(numero, saldo) {
        this.numero = numero;
        this._saldo = Number(saldo);
    }
    get saldo() { return this._saldo; }
    exibirInformacoes() {
        return `Conta Nº: ${this.numero}\nSaldo Atual: R$ ${this._saldo.toFixed(2)}`;
    }
}

export class ContaCorrente extends Conta {
    constructor(numero, saldo, limite) {
        super(numero, saldo);
        this.limite = Number(limite);
    }
    depositar(valor) { this._saldo += valor; }
    sacar(valor) {
        if (valor <= this._saldo + this.limite) {
            this._saldo -= valor;
            return true;
        }
        return false;
    }
    exibirInformacoes() {
        return `${super.exibirInformacoes()}\nLimite: R$ ${this.limite.toFixed(2)}`;
    }
}

export class ContaPoupanca extends Conta {
    constructor(numero, saldo, rendimento) {
        super(numero, saldo);
        this.rendimento = Number(rendimento);
    }
    calcularRendimento() {
        const rendido = this._saldo * (this.rendimento / 100);
        this._saldo += rendido;
        return rendido;
    }
    exibirInformacoes() {
        return `${super.exibirInformacoes()}\nTaxa de Rendimento: ${this.rendimento}%`;
    }
}