
window.addEventListener('DOMContentLoaded', () => {
    const estruturaModais = `
        <div id="modalSucessoGlobal" class="modal-aviso" style="display: none;">
            <div class="modal-aviso-content">
                <div class="modal-aviso-icone icone-sucesso">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3 id="tituloSucessoGlobal">Operação Concluída!</h3>
                <p id="msgSucessoGlobal">Ação realizada com sucesso no sistema.</p>
                <button class="btn-aviso-fechar" onclick="fecharAvisoGlobal('modalSucessoGlobal')">Entendido</button>
            </div>
        </div>

        <div id="modalErroGlobal" class="modal-aviso" style="display: none;">
            <div class="modal-aviso-content">
                <div class="modal-aviso-icone icone-erro">
                    <i class="fas fa-times-circle"></i>
                </div>
                <h3 id="tituloErroGlobal">Ops, algo deu errado!</h3>
                <p id="msgErroGlobal">Não foi possível completar a ação solicitada.</p>
                <button class="btn-aviso-fechar" style="background-color: #e74c3c;" onclick="fecharAvisoGlobal('modalErroGlobal')">Fechar</button>
            </div>
        </div>
    `;


    document.body.insertAdjacentHTML('beforeend', estruturaModais);
});


function exibirSucesso(titulo, mensagem) {
    document.getElementById('tituloSucessoGlobal').innerText = titulo;
    document.getElementById('msgSucessoGlobal').innerText = mensagem;
    const modal = document.getElementById('modalSucessoGlobal');
    modal.style.display = 'flex';
}

function exibirErro(titulo, mensagem) {
    document.getElementById('tituloErroGlobal').innerText = titulo;
    document.getElementById('msgErroGlobal').innerText = mensagem;
    const modal = document.getElementById('modalErroGlobal');
    modal.style.display = 'flex';
}

function fecharAvisoGlobal(idModal) {
    document.getElementById(idModal).style.display = 'none';
}



function mascaraMoeda(i) {
    let v = i.value.replace(/\D/g, "");

    if (v.length === 0) {
        i.value = "";
        return;
    }

    v = (Number(v) / 100).toFixed(2);

    let partes = v.split(".");
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    i.value = partes.join(",");
}

function formatarReal(valor) {

    let numero = parseFloat(valor);

    if (isNaN(numero)) return "0,00";

    return numero.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
    });
}

function mascaraAltura(i) {
    let v = i.value.replace(/\D/g, "");
    if (v.length > 1) {
        v = v.substring(0, 1) + "." + v.substring(1);
    }
    i.value = v;
}

function mascaraCPF(i) {
    let v = i.value;
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    i.value = v;
}

function mascaraCelular(i) {
    let v = i.value;
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d{2})(\d)/, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");

    i.value = v.substring(0, 15);
}

function mascaraCNPJ(i) {
    let v = i.value;
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");

    i.value = v;
}

function mascaraCEP(i) {
    let v = i.value;
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{5})(\d)/, "$1-$2");
    i.value = v;
}

window.mascaraMoeda = mascaraMoeda;
window.formatarReal = formatarReal;
window.mascaraAltura = mascaraAltura;
window.mascaraCPF = mascaraCPF;
window.mascaraCelular = mascaraCelular;
window.mascaraCNPJ = mascaraCNPJ;
window.mascaraCEP = mascaraCEP;
