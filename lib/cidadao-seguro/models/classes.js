const conexao = require("../config/conexao");


class Cidadao {
    constructor(nome, cpf, email, telefone, endereco, dataNascimento) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
        this.dataNascimento = dataNascimento;
    }

    cadastrar(callback) {
        const sql = `INSERT INTO cidadaos (nome, cpf, email, telefone, endereco, data_nascimento) VALUES (?, ?, ?, ?, ?, ?)`;
        conexao.query(sql, [this.nome, this.cpf, this.email, this.telefone, this.endereco, this.dataNascimento], callback);
    }

    static listar(callback) {
        conexao.query("SELECT * FROM cidadaos", callback);
    }

    static buscarPorId(id, callback) {
        conexao.query("SELECT * FROM cidadaos WHERE id_cidadao = ?", [id], (err, res) => callback(err, res ? res[0] : null));
    }

    static atualizar(id, nome, cpf, email, telefone, endereco, dataNascimento, callback) {
        const sql = `UPDATE cidadaos SET nome = ?, cpf = ?, email = ?, telefone = ?, endereco = ?, data_nascimento = ? WHERE id_cidadao = ?`;
        conexao.query(sql, [nome, cpf, email, telefone, endereco, dataNascimento, id], callback);
    }

    static deletar(id, callback) {
        conexao.query("DELETE FROM cidadaos WHERE id_cidadao = ?", [id], callback);
    }

    static contar(callback) {
        conexao.query("SELECT COUNT(*) AS total FROM cidadaos", (err, res) => callback(err, res ? res[0].total : 0));
    }
}


class Agente {
    constructor(nome, cpf, email, telefone, matricula, cargo, turno) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.matricula = matricula;
        this.cargo = cargo;
        this.turno = turno;
    }

    cadastrar(callback) {
        const sql = `INSERT INTO agentes (nome, cpf, email, telefone, matricula, cargo, turno) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        conexao.query(sql, [this.nome, this.cpf, this.email, this.telefone, this.matricula, this.cargo, this.turno], callback);
    }

    static listar(callback) {
        conexao.query("SELECT * FROM agentes", callback);
    }

    static buscarPorId(id, callback) {
        conexao.query("SELECT * FROM agentes WHERE id_agente = ?", [id], (err, res) => callback(err, res ? res[0] : null));
    }

    static atualizar(id, nome, cpf, email, telefone, matricula, cargo, turno, callback) {
        const sql = `UPDATE agentes SET nome = ?, cpf = ?, email = ?, telefone = ?, matricula = ?, cargo = ?, turno = ? WHERE id_agente = ?`;
        conexao.query(sql, [nome, cpf, email, telefone, matricula, cargo, turno, id], callback);
    }

    static deletar(id, callback) {
        conexao.query("DELETE FROM agentes WHERE id_agente = ?", [id], callback);
    }

    static contar(callback) {
        conexao.query("SELECT COUNT(*) AS total FROM agentes", (err, res) => callback(err, res ? res[0].total : 0));
    }
}


class Bairro {
    constructor(nomeBairro, zona, populacaoEstimada, observacoes) {
        this.nomeBairro = nomeBairro;
        this.zona = zona;
        this.populacaoEstimada = populacaoEstimada;
        this.observacoes = observacoes;
    }

    cadastrar(callback) {
        const sql = `INSERT INTO bairros (nome_bairro, zona, populacao_estimada, observacoes) VALUES (?, ?, ?, ?)`;
        conexao.query(sql, [this.nomeBairro, this.zona, this.populacaoEstimada, this.observacoes], callback);
    }

    static listar(callback) {
        conexao.query("SELECT * FROM bairros", callback);
    }

    static buscarPorId(id, callback) {
        conexao.query("SELECT * FROM bairros WHERE id_bairro = ?", [id], (err, res) => callback(err, res ? res[0] : null));
    }

    static atualizar(id, nomeBairro, zona, populacaoEstimada, observacoes, callback) {
        const sql = `UPDATE bairros SET nome_bairro = ?, zona = ?, populacao_estimada = ?, observacoes = ? WHERE id_bairro = ?`;
        conexao.query(sql, [nomeBairro, zona, populacaoEstimada, observacoes, id], callback);
    }

    static deletar(id, callback) {
        conexao.query("DELETE FROM bairros WHERE id_bairro = ?", [id], callback);
    }

    static contar(callback) {
        conexao.query("SELECT COUNT(*) AS total FROM bairros", (err, res) => callback(err, res ? res[0].total : 0));
    }
}


class Ocorrencia {
    constructor(idCidadao, idAgente, idBairro, tipoOcorrencia, descricao, dataHora, status) {
        this.idCidadao = idCidadao;
        this.idAgente = idAgente;
        this.idBairro = idBairro;
        this.tipoOcorrencia = tipoOcorrencia;
        this.descricao = descricao;
        this.dataHora = dataHora;
        this.status = status || 'Aberta';
    }

    cadastrar(callback) {
        const sql = `INSERT INTO ocorrencias (id_cidadao, id_agente, id_bairro, tipo_ocorrencia, descricao, data_hora, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        conexao.query(sql, [this.idCidadao, this.idAgente, this.idBairro, this.tipoOcorrencia, this.descricao, this.dataHora, this.status], callback);
    }

    static listarCompleto(callback) {
        const sql = `
            SELECT 
                o.id_ocorrencia, o.tipo_ocorrencia, o.descricao, o.data_hora, o.status,
                c.nome AS nome_cidadao,
                a.nome AS nome_agente,
                b.nome_bairro
            FROM ocorrencias o
            INNER JOIN cidadaos c ON o.id_cidadao = c.id_cidadao
            INNER JOIN agentes a ON o.id_agente = a.id_agente
            INNER JOIN bairros b ON o.id_bairro = b.id_bairro
            ORDER BY o.id_ocorrencia DESC
        `;
        conexao.query(sql, callback);
    }

    static buscarPorId(id, callback) {
        conexao.query("SELECT * FROM ocorrencias WHERE id_ocorrencia = ?", [id], (err, res) => callback(err, res ? res[0] : null));
    }

    static atualizar(id, idCidadao, idAgente, idBairro, tipoOcorrencia, descricao, dataHora, status, callback) {
        const sql = `UPDATE ocorrencias SET id_cidadao = ?, id_agente = ?, id_bairro = ?, tipo_ocorrencia = ?, descricao = ?, data_hora = ?, status = ? WHERE id_ocorrencia = ?`;
        conexao.query(sql, [idCidadao, idAgente, idBairro, tipoOcorrencia, descricao, dataHora, status, id], callback);
    }

    static deletar(id, callback) {
        conexao.query("DELETE FROM ocorrencias WHERE id_ocorrencia = ?", [id], callback);
    }

    static contar(callback) {
        conexao.query("SELECT COUNT(*) AS total FROM ocorrencias", (err, res) => callback(err, res ? res[0].total : 0));
    }

    static contarPorStatus(callback) {
        const sql = `
        SELECT status, COUNT(*) as quantidade 
        FROM ocorrencias 
        GROUP BY status
    `;
        conexao.query(sql, (err, resultados) => {
            if (err) return callback(err, null);

            
            const dados = {
                'Aberta': 0,
                'Em atendimento': 0,
                'Encerrada': 0
            };

            
            resultados.forEach(row => {
                dados[row.status] = row.quantidade;
            });

            callback(null, dados);
        });
    }
}

module.exports = { Cidadao, Agente, Bairro, Ocorrencia };