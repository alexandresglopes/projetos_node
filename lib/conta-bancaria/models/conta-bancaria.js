class ContaBancaria {
    #saldo;

    constructor(saldoInicial = 1000) {
        this.#saldo = saldoInicial;
    }

    consultarSaldo() {
        return "R$ " + this.#saldo.toFixed(2);
    }

    depositar(valor) {
        if (valor <= 0) {
            return "Erro: O valor do depósito deve ser maior que zero.";
        }
        this.#saldo += valor;
        return "Depósito de R$ " + valor.toFixed(2) + " realizado com sucesso.";
    }

    sacar(valor) {
        if (valor <= 0) {
            return "Erro: O valor do saque deve ser maior que zero.";
        }
        
        if (valor > this.#saldo) {
            return "Erro: Saldo insuficiente. Seu saldo atual é de " + this.consultarSaldo();
        }

        this.#saldo -= valor;
        return "Saque de R$ " + valor.toFixed(2) + " realizado com sucesso.";
    }
}

const minhaConta = new ContaBancaria(1000);

console.log("=== INÍCIO DAS OPERAÇÕES ===");
console.log("Saldo Inicial:", minhaConta.consultarSaldo()); 

console.log("\n--- Fazendo um depósito ---");
console.log(minhaConta.depositar(500)); 
console.log("Saldo Atual:", minhaConta.consultarSaldo()); 

console.log("\n--- Fazendo um saque ---");
console.log(minhaConta.sacar(300)); 
console.log("Saldo Atual:", minhaConta.consultarSaldo()); 

console.log("\n--- Tentando saque acima do limite ---");
console.log(minhaConta.sacar(2000));