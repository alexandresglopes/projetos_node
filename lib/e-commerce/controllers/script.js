import { Cliente, Administrador } from "../models/ecommerce.js";

console.log("Módulo importado com sucesso!");
const form = document.getElementById("fromEcommerce");

if (!form) {
    console.error("Erro: O formulário com id 'fromEcommerce' não foi encontrado no HTML!");
} else {
    console.log("Formulário encontrado no HTML.");
}

function alternarCampos() {
    const tipo = document.getElementById('tipoUser').value;
    if (tipo != '') {
        document.getElementById('camposCliente').classList.toggle('hidden', tipo !== 'cliente');
        document.getElementById('camposAdmin').classList.toggle('hidden', tipo !== 'admin');
    }

}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const tipo = document.getElementById('tipoUser').value;
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    let u;

    if (tipo === 'cliente') {
        const end = document.getElementById('endereco').value;
        const novoEnd = document.getElementById('novoEndereco').value;
        u = new Cliente(nome, email, end);
        u.editarDados(novoEnd);
    } else {
        const niv = document.getElementById('nivelAcesso').value;
        const novoNiv = document.getElementById('novoNivel').value;
        u = new Administrador(nome, email, niv);
        u.alterarNivelAcesso(novoNiv);
    }

    const res = document.getElementById('resultado');
    res.classList.remove('hidden');
    res.innerText = `[Resultado]\n\n${u.exibirInformacoes()}`;
});

window.alternarCampos = alternarCampos;