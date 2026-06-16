export class Pessoa {
    constructor(nome, peso) {
        this.nome = nome;
        this.peso = Number(peso);
    }
    exibirInformacoes() {
        return `Nome: ${this.nome}\nPeso: ${this.peso} kg`;
    }
}

export class Aluno extends Pessoa {
    constructor(nome, peso, objetivo, altura) {
        super(nome, peso);
        this.objetivo = objetivo;
        this.altura = Number(altura); // Atributo auxiliar para viabilizar fórmula matemática do IMC
    }
    calcularIMC() {
        if (!this.altura) return 0;
        return this.peso / (this.altura * this.altura);
    }
    exibirInformacoes() {
        return `${super.exibirInformacoes()}\nObjetivo: ${this.objetivo}\nIMC Calculado: ${this.calcularIMC().toFixed(2)}`;
    }
}

export class PersonalTrainer extends Pessoa {
    constructor(nome, peso, cref) {
        super(nome, peso);
        this.cref = cref;
    }
    montarTreino() {
        return `Montando cronograma baseado em periodização de força (CREF verificado: ${this.cref})`;
    }
    exibirInformacoes() {
        return `${super.exibirInformacoes()}\nInscrição Regional: ${this.cref}\nRotina do profissional: ${this.montarTreino()}`;
    }
}