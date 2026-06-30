const conexao = require("../config/conexao");

class Pessoa {
    constructor(nome, cpf, email, telefone) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
    }
}

class Cliente extends Pessoa {
    constructor(nome, cpf, email, telefone, endereco, dataNascimento) {
        super(nome, cpf, email, telefone);
        this.endereco = endereco;
        this.dataNascimento = dataNascimento;
    }

    cadastrar(callback) {
        const sqlInsert = `
            INSERT INTO clientes (nome, cpf, email, telefone, endereco, data_nascimento)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        conexao.query(
            sqlInsert,
            [this.nome, this.cpf, this.email, this.telefone, this.endereco, this.dataNascimento],
            callback
        );
    }

    static listar(callback) {
        const sqlSelect = "SELECT id_cliente, nome, cpf, email, telefone, endereco, data_nascimento FROM clientes";
        conexao.query(sqlSelect, callback);
    }
    
    static contar(callback) {
        conexao.query("SELECT COUNT(*) AS total FROM clientes", (erro, resultados) => {
            if (erro) return callback(erro);
            callback(null, resultados[0].total);
        });
    }  

    static deletar(id, callback) {
        const sql = "DELETE FROM clientes WHERE id_cliente = ?";       
        conexao.query(sql, [id], callback);
    }
    
}

class Vendedor extends Pessoa {
    constructor(nome, cpf, email, telefone, matricula, setor, comissao) {
        super(nome, cpf, email, telefone);
        this.matricula = matricula;
        this.setor = setor;
        this.comissao = comissao;
    }

    cadastrar(callback) {
        const sqlInsert = `
            INSERT INTO vendedores (nome, cpf, email, telefone, matricula, setor, comissao)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        conexao.query(
            sqlInsert,
            [this.nome, this.cpf, this.email, this.telefone, this.matricula, this.setor, this.comissao],
            callback
        );
    }

    static listar(callback) {
        const sqlSelect = "SELECT id_vendedor, nome, cpf, email, telefone, matricula, setor, comissao FROM vendedores";
        conexao.query(sqlSelect, callback);
    }

    static contar(callback) {
        conexao.query("SELECT COUNT(*) AS total FROM vendedores", (erro, resultados) => {
            if (erro) return callback(erro);
            callback(null, resultados[0].total);
        });
    }
}

class Produto {
    constructor(nomeProduto, descricao, preco, quantidadeEstoque, categoria) {
        this.nomeProduto = nomeProduto;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidadeEstoque = quantidadeEstoque;
        this.categoria = categoria;
    }

    cadastrar(callback) {
        const sqlInsert = `
            INSERT INTO produtos (nome_produto, descricao, preco, quantidade_estoque, categoria)
            VALUES (?, ?, ?, ?, ?)
        `;
        conexao.query(
            sqlInsert,
            [this.nomeProduto, this.descricao, this.preco, this.quantidadeEstoque, this.categoria],
            callback
        );
    }

    static listar(callback) {
        const sqlSelect = "SELECT id_produto, nome_produto, descricao, preco, quantidade_estoque, categoria FROM produtos";
        conexao.query(sqlSelect, callback);
    }

    static contar(callback) {
        conexao.query("SELECT COUNT(*) AS total FROM produtos", (erro, resultados) => {
            if (erro) return callback(erro);
            callback(null, resultados[0].total);
        });
    }    
    
}

class Venda {
    constructor(idCliente, idVendedor, idProduto, quantidade, dataVenda, valorTotal) {
        this.idCliente = idTemplate || idCliente;
        this.idVendedor = idVendedor;
        this.idProduto = idProduto;
        this.quantidade = quantidade;
        this.dataVenda = dataVenda;
        this.valorTotal = valorTotal;
    }

    cadastrar(callback) {
        const sqlInsert = `
            INSERT INTO vendas (id_cliente, id_vendedor, id_produto, quantidade, data_venda, valor_total)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        conexao.query(
            sqlInsert,
            [this.idCliente, this.idVendedor, this.idProduto, this.quantidade, this.dataVenda, this.valorTotal],
            callback
        );
    }

    static listarHistorico(callback) {
        const sqlSelect = `
            SELECT 
                v.id_venda,
                c.nome AS nome_cliente,
                vd.nome AS nome_vendedor,
                p.nome_produto,
                v.quantidade,
                v.data_venda,
                v.valor_total
            FROM vendas AS v
            INNER JOIN clientes AS c ON v.id_cliente = c.id_cliente
            INNER JOIN vendedores AS vd ON v.id_vendedor = vd.id_vendedor
            INNER JOIN produtos AS p ON v.id_produto = p.id_produto
            ORDER BY v.id_venda DESC
        `;
        conexao.query(sqlSelect, callback);
    }

    static contar(callback) {
        conexao.query("SELECT COUNT(*) AS total FROM vendas", (erro, resultados) => {
            if (erro) return callback(erro);
            callback(null, resultados[0].total);
        });
    }
}

module.exports = { Cliente, Vendedor, Produto, Venda };