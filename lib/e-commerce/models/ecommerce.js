export class Usuario {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
    exibirInformacoes() {
        return `Usuário: ${this.nome}\nE-mail cadastrado: ${this.email}`;
    }
}

export class Cliente extends Usuario {
    constructor(nome, email, endereco) {
        super(nome, email);
        this.endereco = endereco;
    }
    editarDados(novoEnd) {
        if (novoEnd) this.endereco = novoEnd;
    }
    exibirInformacoes() {
        return `${super.exibirInformacoes()}\nEndereço Logístico: ${this.endereco}`;
    }
}

export class Administrador extends Usuario {
    constructor(nome, email, nivelAcesso) {
        super(nome, email);
        this.nivelAcesso = Number(nivelAcesso);
    }
    alterarNivelAcesso(novoNivel) {
        if (novoNivel) this.nivelAcesso = Number(novoNivel);
    }
    exibirInformacoes() {
        return `${super.exibirInformacoes()}\nNível de Privilégio: Grau ${this.nivelAcesso}`;
    }
}