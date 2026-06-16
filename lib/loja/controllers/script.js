import { Eletronico, Vestuario } from '../models/loja.js';

console.log("Módulo importado com sucesso!");
const form = document.getElementById("formLoja");

if (!form) {
    console.error("Erro: O formulário com id 'formLoja' não foi encontrado no HTML!");
} else {
    console.log("Formulário encontrado no HTML.");
}

function alternarCampos() {
    const tipo = document.getElementById('tipoProd').value;
    if (tipo != '') {
        document.getElementById('camposEletronico').classList.toggle('hidden', tipo !== 'eletronico');
        document.getElementById('camposVestuario').classList.toggle('hidden', tipo !== 'vestuario');
    }

}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const tipo = document.getElementById('tipoProd').value;
    const desc = document.getElementById('descricao').value;
    const preco = document.getElementById('preco').value;
    let p;

    if (tipo != '' && desc != '' && preco != '') {

        if (tipo === 'eletronico') {
            const gar = document.getElementById('garantia').value;
            if (gar != '') {
                p = new Eletronico(desc, preco, gar);
                const res = document.getElementById('resultado');
                res.classList.remove('hidden');
                res.innerText = p.exibirInformacoes();
            }

        } else {
            const tam = document.getElementById('tamanho').value;

            if (tam != '') {
                p = new Vestuario(desc, preco, tam);
                const res = document.getElementById('resultado');
                res.classList.remove('hidden');
                res.innerText = p.exibirInformacoes();
            }

        }

    } else {
        alert('Preencha os campos!')
    }

});

window.alternarCampos = alternarCampos;