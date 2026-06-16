import { Produto } from "../models/produto.js";

console.log("Módulo importado com sucesso!");

const p = new Produto();
const form = document.getElementById("formProduto");

if (!form) {
    console.error("Erro: O formulário com id 'formProduto' não foi encontrado no HTML!");
} else {
    console.log("Formulário encontrado no HTML.");
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const preco = Number(document.getElementById("preco").value);

    console.log("Dados recebidos -> Qtd:", quantidade, "| Preço:", preco);

    const total = p.calcularPreco(quantidade, preco);
    console.log("Total calculado pela classe:", total);

    const campoResultado = document.getElementById("resultado");
    campoResultado.value = `R$ ${total.toFixed(2)}`;

});