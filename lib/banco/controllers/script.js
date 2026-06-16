import { ContaCorrente, ContaPoupanca } from '../models/banco.js';

console.log("Módulo importado com sucesso!");
const form = document.getElementById("formBanco");

if (!form) {
    console.error("Erro: O formulário com id 'formBanco' não foi encontrado no HTML!");
} else {
    console.log("Formulário encontrado no HTML.");
}

let contaAtiva = null;
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const tipo = document.getElementById('tipoConta').value;
    const num = document.getElementById('numero').value;
    const saldo = document.getElementById('saldo').value;

    if (tipo != '' && num != '' && saldo != '') {
        if (tipo === 'corrente') {
            const lim = document.getElementById('limite').value;
            if (lim != '') {
                contaAtiva = new ContaCorrente(num, saldo, lim);
                document.getElementById('btnRendimento').classList.add('hidden');

                document.getElementById('operacoes').classList.remove('hidden');
                atualizarPainel("Conta configurada no sistema.");
            } else {
                alert('Preencha o limite!');
            }
        } else {
            const rend = document.getElementById('rendimento').value;
            if (red != '') {
                contaAtiva = new ContaPoupanca(num, saldo, rend);
                document.getElementById('btnRendimento').classList.remove('hidden');

                document.getElementById('operacoes').classList.remove('hidden');
                atualizarPainel("Conta configurada no sistema.");
            } else {
                alert('Preencha o rendimento!');
            }
        }

    } else {
        alert('Preencha os campos!');
    }

});

function executarOperacao(tipo) {
    const valor = Number(document.getElementById('valorOp').value);
    let msg = "";

    if (tipo === 'depositar') {
        if (contaAtiva.depositar) contaAtiva.depositar(valor);
        else contaAtiva._saldo += valor;
        msg = `Depósito de R$ ${valor.toFixed(2)} realizado.`;
    } else if (tipo === 'sacar') {
        if (contaAtiva.sacar) {
            const sucesso = contaAtiva.sacar(valor);
            msg = sucesso ? `Saque de R$ ${valor.toFixed(2)} realizado.` : "Saldo/Limite insuficiente.";
        } else {
            if (contaAtiva._saldo >= valor) { contaAtiva._saldo -= valor; msg = `Saque realizado.`; }
            else msg = "Saldo insuficiente.";
        }
    } else if (tipo === 'render') {
        const rendido = contaAtiva.calcularRendimento();
        msg = `Rendimento aplicado! Relação de ganho: R$ ${rendido.toFixed(2)}`;
    }
    atualizarPainel(msg);
}

function atualizarPainel(msg) {
    const div = document.getElementById('resultado');
    div.classList.remove('hidden');
    div.innerText = `${msg}\n\n${contaAtiva.exibirInformacoes()}`;
}

function alternarCampos() {
    const tipo = document.getElementById('tipoConta').value;
    if (tipo != '') {
        document.getElementById('camposCorrente').classList.toggle('hidden', tipo !== 'corrente');
        document.getElementById('camposPoupanca').classList.toggle('hidden', tipo !== 'poupanca');
    }

}

window.executarOperacao = executarOperacao;
window.alternarCampos = alternarCampos;