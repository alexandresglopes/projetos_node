export class Funcionario {
    constructor(nome, salario) {
        this.nome = nome;
        this.salario = Number(salario);
    }
    exibirInformacoes() {
        return `Colaborador: ${this.nome}\nRemuneração: R$ ${this.salario.toFixed(2)}`;
    }
}

export class Desenvolvedor extends Funcionario {
    constructor(nome, salario, linguagem) {
        super(nome, salario);
        this.linguagem = linguagem;
    }
    programar() {
        return `Codificando soluções escaláveis em ${this.linguagem}.`;
    }
    exibirInformacoes() {
        return `${super.exibirInformacoes()}\nLinguagem de Domínio: ${this.linguagem}\nAção em tempo real: ${this.programar()}`;
    }
}

export class Analista extends Funcionario {
    constructor(nome, salario, projeto) {
        super(nome, salario);
        this.projeto = projeto;
    }
    analisarRequisitos() {
        return `Mapeando histórias de usuário para o projeto de software: ${this.projeto}.`;
    }
    exibirInformacoes() {
        return `${super.exibirInformacoes()}\nProjeto de Alocação: ${this.projeto}\nAção em tempo real: ${this.analisarRequisitos()}`;
    }
}