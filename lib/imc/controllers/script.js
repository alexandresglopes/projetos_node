import { Imc } from "../models/imc.js";

console.log("Módulo importado com sucesso!");

const p = new Imc();
const form = document.getElementById("formIMC");

if (!form) {
    console.error("Erro: O formulário com id 'formIMC' não foi encontrado no HTML!");
} else {
    console.log("Formulário encontrado no HTML.");
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    let status;
    let s = '';
    const nome = document.getElementById("nome").value;
    const altura = Number(document.getElementById("altura").value);
    const peso = Number(document.getElementById("peso").value);
    const sexo = document.getElementById("sexo").value;

    console.log("Dados recebidos -> Peso:", peso, "| Altura:", altura);

    const imc = p.calcularImc(altura, peso);
    console.log("IMC calculado pela classe:", imc);
    let i = imc.toFixed(2);

    switch (sexo) {
        case '1':
            s = 'MASCULINO';
            if (i < 18.5) {
                status = 'Magreza';
            } else if (i > 18.5 && i <= 24.9) {
                status = 'Eutrofia';
            } else if (i >= 25 && i <= 29.9) {
                status = 'Pré-obesidade';
            } else if (i >= 30 && i <= 34.9) {
                status = 'Obesidade grau I';
            } else if (i >= 35 && i <= 35.9) {
                status = 'Obesidade grau II';
            } else if (i >= 40) {
                status = 'Obesidade grau III';
            }
            break;
        case '2':
            s = 'FEMININO';
            if (i < 18.5) {
                status = 'Magreza';
            } else if (i > 18.5 && i <= 24.9) {
                status = 'Eutrofia';
            } else if (i >= 25 && i <= 29.9) {
                status = 'Pré-obesidade';
            } else if (i >= 30 && i <= 34.9) {
                status = 'Obesidade grau I';
            } else if (i >= 35 && i <= 35.9) {
                status = 'Obesidade grau II';
            } else if (i >= 40) {
                status = 'Obesidade grau III';
            }
            break;
        default:
            alert('sexo não encontrado')
    }

    const campoResultado = document.getElementById("res1");
    campoResultado.value = `${imc.toFixed(2)}`;

    const campoResultado2 = document.getElementById("res2");
    campoResultado2.value = status;

});