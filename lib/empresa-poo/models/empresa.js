class Funcionario {
    nome;
    sobrenome;
    salario;

    constructor(nome, sobrenome, salario) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.salario = salario;
    }
}

class Vendedor extends Funcionario {
    #totalVendas;
    #comissao;
    #vcomissao;

    constructor(nome, sobrenome, salario, totalVendas, comissao) {
        super(nome, sobrenome, salario);
        this.#totalVendas = totalVendas;
        this.#comissao = comissao;
        this.#vcomissao = 0;
    }

    calcularComissao() {
        this.#vcomissao = this.#totalVendas * this.#comissao;
        return this.#vcomissao;
    }

    calcularSalario() {
        return this.salario + this.calcularComissao();
    }
}

class Horista extends Funcionario {
    #hora;
    #valorHora;

    constructor(nome, sobrenome, salario, hora, valorHora) {
        super(nome, sobrenome, salario);
        this.#hora = hora;
        this.#valorHora = valorHora;
    }

    calcularSalario() {
        return this.#hora * this.#valorHora;
    }
}

const vendedor = new Vendedor("Carlos", "Silva", 2000, 50, 20);
console.log("=== VENDEDOR ===");
console.log("Nome:", vendedor.nome, vendedor.sobrenome);
console.log("Salário base: R$", vendedor.salario.toFixed(2));
console.log("Valor comissão: R$", vendedor.calcularComissao().toFixed(2));
console.log("Salário Total: R$", vendedor.calcularSalario().toFixed(2));

const horista = new Horista("Ana", "Souza", 0, 160, 25);
console.log("\n=== HORISTA ===");
console.log("Nome:", horista.nome, horista.sobrenome);
console.log("Salário Total: R$", horista.calcularSalario().toFixed(2));