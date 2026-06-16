import { Desenvolvedor, Analista } from '../models/empresa.js';

console.log("Módulo importado com sucesso!");
const form = document.getElementById("formEmpresa");

if (!form) {
    console.error("Erro: O formulário com id 'formEmpresa' não foi encontrado no HTML!");
} else {
    console.log("Formulário encontrado no HTML.");
}

function alternarCampos() {
    const tipo = document.getElementById('cargo').value;
    if (tipo != '') {
        document.getElementById('camposDev').classList.toggle('hidden', tipo !== 'dev');
        document.getElementById('camposAnalista').classList.toggle('hidden', tipo !== 'analista');
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const cargo = document.getElementById('cargo').value;
    const nome = document.getElementById('nome').value;
    const salario = document.getElementById('salario').value;
    let func;

    if (cargo === 'dev') {
        const ling = document.getElementById('linguagem').value;
        func = new Desenvolvedor(nome, salario, ling);
    } else {
        const proj = document.getElementById('projeto').value;
        func = new Analista(nome, salario, proj);
    }

    const res = document.getElementById('resultado');
    res.classList.remove('hidden');
    res.innerText = func.exibirInformacoes();
});

window.alternarCampos = alternarCampos;