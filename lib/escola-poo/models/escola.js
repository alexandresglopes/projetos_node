class Pessoa {
    nome;
    sobrenome;
}

class Professor extends Pessoa {
    #disciplina;

    mostrarProf(nome, sobrenome, disciplina) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.#disciplina = disciplina;

        console.log(`\nProfessor(a): ${this.nome}, leciona: ${this.#disciplina}\n`);
    }
}

class Aluno extends Pessoa {
    #nota1;
    #nota2;
    #total;
    #media;

    somarNotas(nome, sobrenome, nota1, nota2) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.#nota1 = nota1;
        this.#nota2 = nota2;

        this.#total = this.#nota1 + this.#nota2;
        this.#media = this.#total / 2;

        console.log(`\n====================\nAluno: ${this.nome} ${this.sobrenome} 
            \n====================\nNota 1: ${this.#nota1} 
            \n====================\nNota 2: ${this.#nota2} 
            \n====================\nTotal: ${this.#total} 
            \n====================\nMédia: ${this.#media}
            \n====================\n`);
        if (this.#media < 6) {
            console.log(`Resultado:\nReprovado!\n====================\n`);
        } else {
            console.log(`Resultado:\nAprovado!\n====================\n`);
        }
    }
}

const prof = new Professor();
prof.mostrarProf("Deilson", "Aquino", "Javascript");
prof.mostrarProf("Jose", "Silva", "PHP");
prof.mostrarProf("Maria", "Silva", "DBA");
prof.mostrarProf("Lucas", "Silva", "Python");

const aluno = new Aluno();
aluno.somarNotas("Pedro", "Inácio", 10, 9);
aluno.somarNotas("Bianca", "Silva", 10, 7);
aluno.somarNotas("Marcos", "Silva", 8, 6);
aluno.somarNotas("Breno", "Silva", 6, 10);
aluno.somarNotas("Vinicius", "Silva", 9, 5);