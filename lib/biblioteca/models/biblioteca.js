export class Publicacao {
    constructor(titulo, autor) {
        this.titulo = titulo;
        this.autor = autor;
    }
    exibirInformacoes() {
        return `Título: ${this.titulo}\nAutor: ${this.autor}`;
    }
}

export class Livro extends Publicacao {
    constructor(titulo, autor, isbn) {
        super(titulo, autor);
        this.isbn = isbn;
        this.statusEmprestado = false;
    }
    emprestar() {
        this.statusEmprestado = true;
        return "Livro retirado com sucesso da biblioteca pública.";
    }
    exibirInformacoes() {
        const acao = this.emprestar();
        return `${super.exibirInformacoes()}\nISBN: ${this.isbn}\nStatus: ${this.statusEmprestado ? 'Emprestado' : 'Disponível'}\nAção Executada: ${acao}`;
    }
}

export class Revista extends Publicacao {
    constructor(titulo, autor, edicao) {
        super(titulo, autor);
        this.edicao = Number(edicao);
        this.assinaturaRenovada = false;
    }
    renovarAssinatura() {
        this.assinaturaRenovada = true;
        return "Assinatura anual de fascículos renovada.";
    }
    exibirInformacoes() {
        const acao = this.renovarAssinatura();
        return `${super.exibirInformacoes()}\nEdição nº: ${this.edicao}\nContrato de Renovação: ${this.assinaturaRenovada ? 'Ativo' : 'Pendente'}\nAção Executada: ${acao}`;
    }
}