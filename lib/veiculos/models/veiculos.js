export class Veiculo {
    constructor(marca, modelo, ano) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = Number(ano);
    }
    exibirInformacoes() {
        return `Marca: ${this.marca}\nModelo: ${this.modelo}\nAno: ${this.ano}`;
    }
}

export class Carro extends Veiculo {
    constructor(marca, modelo, ano, portas) {
        super(marca, modelo, ano);
        this.portas = Number(portas);
    }
    inserirModelo(novoModelo) {
        if (novoModelo) this.modelo = novoModelo + " (Carro Modificado)";
    }
    exibirInformacoes() {
        return `${super.exibirInformacoes()}\nPortas: ${this.portas}\nTipo: Automóvel Passeio`;
    }
}

export class Moto extends Veiculo {
    constructor(marca, modelo, ano, cilindradas) {
        super(marca, modelo, ano);
        this.cilindradas = Number(cilindradas);
    }
    inserirModelo(novoModelo) {
        if (novoModelo) this.modelo = novoModelo + " (Moto Modificada)";
    }
    exibirInformacoes() {
        return `${super.exibirInformacoes()}\nCilindradas: ${this.cilindradas}cc\nTipo: Motocicleta`;
    }
}