import { Carro, Moto } from '../models/veiculos.js';

console.log("Módulo importado com sucesso!");
const form = document.getElementById("formVeiculo");

if (!form) {
    console.error("Erro: O formulário com id 'formVeiculo' não foi encontrado no HTML!");
} else {
    console.log("Formulário encontrado no HTML.");
}

function alternarCampos() {
    const tipo = document.getElementById('tipoVeiculo').value;
    if (tipo != '') {
        document.getElementById('camposCarro').classList.toggle('hidden', tipo !== 'carro');
        document.getElementById('camposMoto').classList.toggle('hidden', tipo !== 'moto');
    }

}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const tipo = document.getElementById('tipoVeiculo').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const ano = document.getElementById('ano').value;
    const novoModelo = document.getElementById('novoModelo').value;
    let veiculo;

    if (tipo != '' && marca != '' && modelo != '' && ano != '' && novoModelo != '') {

        if (tipo === 'carro') {
            const portas = document.getElementById('portas').value;
            if (portas != '') {
                veiculo = new Carro(marca, modelo, ano, portas);
                veiculo.inserirModelo(novoModelo);

                const res = document.getElementById('resultado');
                res.classList.remove('hidden');
                res.innerText = `[Objeto Gerado]\n\n${veiculo.exibirInformacoes()}`;
            } else {
                alert('Insira as portas!')
            }

        } else {
            const cilindradas = document.getElementById('cilindradas').value;
            if (cilindradas != '') {
                veiculo = new Moto(marca, modelo, ano, cilindradas);
                veiculo.inserirModelo(novoModelo);

                const res = document.getElementById('resultado');
                res.classList.remove('hidden');
                res.innerText = `[Objeto Gerado]\n\n${veiculo.exibirInformacoes()}`;
            } else {
                alert('Insira as cilindradas!')
            }
        }

    } else {
        alert('Preencha os campos!')
    }


});

window.alternarCampos = alternarCampos;