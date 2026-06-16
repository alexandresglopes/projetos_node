import { Livro, Revista } from '../models/biblioteca.js';

console.log("Módulo importado com sucesso!");
const form = document.getElementById("fromBiblioteca");

if (!form) {
    console.error("Erro: O formulário com id 'fromBiblioteca' não foi encontrado no HTML!");
} else {
    console.log("Formulário encontrado no HTML.");
}

function alternarCampos() {
    const tipo = document.getElementById('tipoPub').value;
    if (tipo != '') {
        document.getElementById('camposLivro').classList.toggle('hidden', tipo !== 'livro');
        document.getElementById('camposRevista').classList.toggle('hidden', tipo !== 'revista');
    }

}

form.addEventListener("submit", function (event){

    event.preventDefault();

    const tipo = document.getElementById('tipoPub').value;
    const tit = document.getElementById('titulo').value;
    const aut = document.getElementById('autor').value;
    let pub;

    if (tipo === 'livro') {
        const isbn = document.getElementById('isbn').value;
        pub = new Livro(tit, aut, isbn);
    } else {
        const ed = document.getElementById('edicao').value;
        pub = new Revista(tit, aut, ed);
    }

    const res = document.getElementById('resultado');
    res.classList.remove('hidden');
    res.innerText = pub.exibirInformacoes();

});

window.alternarCampos = alternarCampos;
    
