
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
    
    // Insere os modais ocultos no final do body de qualquer página que use o script.js
    document.body.insertAdjacentHTML('beforeend', estruturaModais);
});

// Funções para exibir as mensagens na tela
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