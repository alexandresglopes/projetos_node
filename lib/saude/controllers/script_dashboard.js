import { SistemaSaudeAvançado, Afastamento, ExameMedico } from '../models/saude.js'

const sistema = new SistemaSaudeAvançado();
let dataTableInstance = null;


sistema.cadastrarColaborador(1, "Rodrigo Santos", "Enfermagem", "Tec. Enfermagem", "2026-01-10", "Apto");
sistema.cadastrarColaborador(2, "Fernanda Lima", "Pediatria", "Pediatra", "2024-03-15", "Apto");
sistema.cadastrarColaborador(3, "Roberto Alencar", "CTI", "Médico", "2026-05-20", "Inapto");

const colabAfastado = sistema.consultar(3);
if (colabAfastado) {
    colabAfastado.prontuario.adicionarAfastamento(new Afastamento("M54.5", "2026-06-01", "2026-06-10"));
}


function exibirFeedback(titulo, mensagem) {
    document.getElementById("sucesso-titulo").innerText = titulo;
    document.getElementById("sucesso-mensagem").innerText = mensagem;

    const modalElement = new bootstrap.Modal(document.getElementById('modalSucesso'));
    modalElement.show();


    setTimeout(() => {
        modalElement.hide();
    }, 1800);
}

function renderizarPainel() {

    document.getElementById("card-total-colaboradores").innerText = sistema.colaboradores.length;
    document.getElementById("card-exames-vencidos").innerText = sistema.contarExamesVencidos();
    document.getElementById("card-total-afastados").innerText = sistema.contarColaboradoresAfastados();

    const selectAfastamento = document.getElementById("afastamento-colab-id");
    selectAfastamento.innerHTML = "";
    sistema.colaboradores.forEach(c => {
        selectAfastamento.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
    });


    if (dataTableInstance) {
        dataTableInstance.destroy();
    }

    const tbody = document.querySelector("#tabela-relatorio tbody");
    tbody.innerHTML = "";

    sistema.colaboradores.forEach(c => {
        const ultimoExame = c.prontuario.obterUltimoExame();
        const totalDiasAfastado = c.prontuario.CalcularTotalDiasAfastados();

        let validadeTexto = "Regular";
        let validadeClasse = "badge-apto";

        if (ultimoExame && ultimoExame.estaVencido()) {
            validadeTexto = "🚨 VENCIDO";
            validadeClasse = "badge-inapto";
        }

        const dataFormatada = ultimoExame ? ultimoExame.dataRealizacao.toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '-';


        const linha = `
            <tr>
                <td><strong>${c.nome}</strong></td>
                <td><span class="text-secondary small fw-bold">${c.setor.nome}</span> <span class="text-muted">/ ${c.cargo.nome}</span></td>
                <td>${dataFormatada} (${ultimoExame.resultado})</td>
                <td><span class="${validadeClasse}">${validadeTexto}</span></td>
                <td>${totalDiasAfastado > 0 ? `<span class="badge bg-warning text-dark fw-bold"><i class="fa-solid fa-bed-pulse me-1"></i>${totalDiasAfastado} dias</span>` : '<span class="text-muted small">Nenhum</span>'}</td>
                <td class="text-end">
                    <button class="btn btn-sm btn-light border text-primary me-1 shadow-xs" onclick="abrirEdicao(${c.id})" title="Editar Prontuário">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn btn-sm btn-light border text-danger shadow-xs" onclick="remover(${c.id})" title="Excluir Registro">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += linha;
    });


    dataTableInstance = $('#tabela-relatorio').DataTable({
        dom: '<"d-flex justify-content-between align-items-center mb-3"fl>t<"d-flex justify-content-between align-items-center mt-3"ip>',
        language: {
            search: "_INPUT_",
            searchPlaceholder: "🔍 Filtrar registros...",
            lengthMenu: "Exibir _MENU_ registros",
            info: "Mostrando _START_ a _END_ de _TOTAL_ colaboradores",
            infoEmpty: "Nenhum prontuário encontrado",
            zeroRecords: "Nenhum dado condizente encontrado",
            paginate: {
                next: "<i class='fa-solid fa-chevron-right'></i>",
                previous: "<i class='fa-solid fa-chevron-left'></i>"
            }
        }
    });
}

window.configurarModalCadastro = function () {
    document.getElementById("form-colaborador").reset();
    document.getElementById("colaborador-id").value = "";
    document.getElementById("modalColaboradorTitulo").innerText = "➕ Cadastrar Colaborador";
}

window.abrirEdicao = function (id) {
    const colab = sistema.consultar(id);
    if (colab) {
        document.getElementById("colaborador-id").value = colab.id;
        document.getElementById("nome").value = colab.nome;
        document.getElementById("setor").value = colab.setor.nome;
        document.getElementById("cargo").value = colab.cargo.nome;

        const ultimoExame = colab.prontuario.obterUltimoExame();
        if (ultimoExame) {
            document.getElementById("exame-data").value = ultimoExame.dataRealizacao.toISOString().split('T')[0];
            document.getElementById("exame-resultado").value = ultimoExame.resultado;
        }

        document.getElementById("modalColaboradorTitulo").innerText = "✏️ Editar Cadastro";

        const modalElement = new bootstrap.Modal(document.getElementById('modalColaborador'));
        modalElement.show();
    }
}

document.getElementById("form-colaborador").addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("colaborador-id").value;
    const nome = document.getElementById("nome").value;
    const setor = document.getElementById("setor").value;
    const cargo = document.getElementById("cargo").value;
    const data = document.getElementById("exame-data").value;
    const resultado = document.getElementById("exame-resultado").value;

    if (id) {

        const colab = sistema.consultar(Number(id));
        if (colab) {
            colab.nome = nome;
            colab.setor.nome = setor;
            colab.cargo.nome = cargo;
            colab.prontuario.adicionarExame(new ExameMedico("Periódico (Atualizado)", data, resultado));

            bootstrap.Modal.getInstance(document.getElementById('modalColaborador')).hide();
            renderPainelEFeedback("Salvo!", "O cadastro do colaborador foi atualizado.");
        }
    } else {
        const novoId = sistema.colaboradores.length > 0 ? sistema.colaboradores[sistema.colaboradores.length - 1].id + 1 : 1;
        sistema.cadastrarColaborador(novoId, nome, setor, cargo, data, resultado);

        bootstrap.Modal.getInstance(document.getElementById('modalColaborador')).hide();
        renderPainelEFeedback("Sucesso!", "Novo colaborador adicionado ao painel.");
    }
});


function renderPainelEFeedback(titulo, msg) {
    renderizarPainel();
    exibirFeedback(titulo, msg);
}

document.getElementById("form-afastamento").addEventListener("submit", function (e) {
    e.preventDefault();
    const colabId = Number(document.getElementById("afastamento-colab-id").value);
    const cid = document.getElementById("afastamento-cid").value;
    const inicio = document.getElementById("afastamento-inicio").value;
    const fim = document.getElementById("afastamento-fim").value;

    const colab = sistema.consultar(colabId);
    if (colab) {
        colab.prontuario.adicionarAfastamento(new Afastamento(cid, inicio, fim));
        bootstrap.Modal.getInstance(document.getElementById('modalAfastamento')).hide();
        this.reset();
        renderPainelEFeedback("Registrado!", "Afastamento médico computado com sucesso.");
    }
});

window.remover = function (id) {
    if (confirm("Deseja deletar permanentemente este prontuário?")) {
        sistema.excluir(id);
        renderPainelEFeedback("Removido!", "O registro foi excluído do sistema.");
    }
}

$(document).ready(function () {
    renderizarPainel();
});


window.abrirEdicao = abrirEdicao;
window.remover = remover;