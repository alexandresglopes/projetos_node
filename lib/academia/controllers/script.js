import { Aluno, PersonalTrainer } from './../models/academia.js';

console.log("Módulo importado com sucesso!");
const form = document.getElementById("fromAcademina");

if (!form) {
    console.error("Erro: O formulário com id 'fromAcademina' não foi encontrado no HTML!");
} else {
    console.log("Formulário encontrado no HTML.");
}

function alternarCampos() {
    const tipo = document.getElementById('tipoPerfil').value;
    if (tipo != '') {
        document.getElementById('camposAluno').classList.toggle('hidden', tipo !== 'aluno');
        document.getElementById('camposPersonal').classList.toggle('hidden', tipo !== 'personal');
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const perfil = document.getElementById('tipoPerfil').value;
    const nome = document.getElementById('nome').value;
    const peso = document.getElementById('peso').value;
    let p;

    if (perfil === 'aluno') {
        const obj = document.getElementById('objetivo').value;
        const alt = document.getElementById('altura').value;
        p = new Aluno(nome, peso, obj, alt);
    } else {
        const cref = document.getElementById('cref').value;
        p = new PersonalTrainer(nome, peso, cref);
    }

    const res = document.getElementById('resultado');
    res.classList.remove('hidden');
    res.innerText = p.exibirInformacoes();

});



window.alternarCampos = alternarCampos;