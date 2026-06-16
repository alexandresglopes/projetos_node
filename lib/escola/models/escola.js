export class Pessoa {
    constructor(nome, sobrenome, idade) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.idade = Number(idade);
    }
    exibirInformacoes() {
        return `Nome Completo: ${this.nome} ${this.sobrenome}\nIdade: ${this.idade} anos`;
    }
}

export class Aluno extends Pessoa {
    constructor(nome, sobrenome, idade, matricula, nota1, nota2, nota3, nota4) {
        super(nome, sobrenome, idade);
        this.matricula = matricula;
        this.nota1 = Number(nota1);
        this.nota2 = Number(nota2);
        this.nota3 = Number(nota3);
        this.nota4 = Number(nota4);
    }
    calcularMedia() {
        return (this.nota1 + this.nota2 + this.nota3 + this.nota4) / 4;
    }
    exibirInformacoes() {
        return `${super.exibirInformacoes()}
        \nMatrícula: ${this.matricula}
        \nNota 1: ${this.nota1}
        \nNota 2: ${this.nota2}
        \nNota 3: ${this.nota3}
        \nNota 4: ${this.nota4}
        \nMédia/Nota Final: ${this.calcularMedia()}`;
    }
}

export class Professor extends Pessoa {
    constructor(nome, sobrenome, idade, disciplina, salario) {
        super(nome, sobrenome, idade);
        this.disciplina = disciplina;
        this.salario = Number(salario);
    }
    calcularSalario() {
        return this.salario;
    }
    exibirInformacoes() {
        return `${super.exibirInformacoes()}\nDisciplina: ${this.disciplina}\nSalário Final: R$ ${this.calcularSalario().toFixed(2)}`;
    }
}