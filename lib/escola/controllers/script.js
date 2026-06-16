import { Aluno, Professor, Pessoa } from '../models/escola.js';

console.log("Módulo importado com sucesso!");
const form = document.getElementById("formEscola");

if (!form) {
    console.error("Erro: O formulário com id 'formEscola' não foi encontrado no HTML!");
} else {
    console.log("Formulário encontrado no HTML.");
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const tipo = document.getElementById('tipoPessoa').value;
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const idade = document.getElementById('idade').value;
    let objeto;

    if (tipo != '' && nome != '' && sobrenome != '' && idade != '') {

        if (tipo === 'aluno') {
            const matricula = document.getElementById('matricula').value;
            const nota1 = document.getElementById('nota1').value;
            const nota2 = document.getElementById('nota2').value;
            const nota3 = document.getElementById('nota3').value;
            const nota4 = document.getElementById('nota4').value;

            if (matricula != '' && nota1 != '' && nota2 != '' && nota3 != '' && nota4 != '') {
                objeto = new Aluno(nome, sobrenome, idade, matricula, nota1, nota2, nota3, nota4);

                const divResultado = document.getElementById('resultado');
                divResultado.classList.remove('hidden');
                divResultado.innerText = `[Resultado]\n\n${objeto.exibirInformacoes()}`;
            } else {
                alert('Preencha os campos!')
            }

        } else {
            const disciplina = document.getElementById('disciplina').value;
            const salario = document.getElementById('salario').value;

            if (disciplina != '' && salario != '') {
                objeto = new Professor(nome, sobrenome, idade, disciplina, salario);

                const divResultado = document.getElementById('resultado');
                divResultado.classList.remove('hidden');
                divResultado.innerText = `[Resultado]\n\n${objeto.exibirInformacoes()}`;
            } else {
                alert('Preencha os campos!')
            }

        }

    } else {
        alert('Preencha os campos!')
    }




});

function alternarCampos() {
    const tipo = document.getElementById('tipoPessoa').value;
    console.log(tipo)
    if (tipo != '') {
        document.getElementById('camposAluno').classList.toggle('hidden', tipo !== 'aluno');
        document.getElementById('camposProfessor').classList.toggle('hidden', tipo !== 'professor');

        const divResultado = document.getElementById('resultado');
        divResultado.classList.add('hidden');
        document.querySelector('form').reset();
    }

}

window.alternarCampos = alternarCampos;




