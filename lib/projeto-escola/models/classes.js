// const mysql = require("mysql2");

// const conexao = mysql.createConnection({
//     host: "127.0.0.1",
//     port: 3306,
//     user: "root",
//     password: "alunolab",
//     database: "escola"
// });

const conexao = require("../config/conexao");

class Professor {
    constructor(nome, email, formacao) {
        this.nome = nome;
        this.email = email;
        this.formacao = formacao;
    }

    cadastrar(callback) {
        const sql = `
            INSERT INTO professores (nome, email, formacao)
            VALUES (?, ?, ?)
        `;

        conexao.query(sql, [this.nome, this.email, this.formacao], callback);
    }

    static deletar(matricula, callback) {
        const sql1 = "DELETE FROM turmas WHERE matricula_professor = ?";
        conexao.query(sql1, [matricula]);
        const sql2 = "DELETE FROM professores WHERE matricula = ?";
        conexao.query(sql2, [matricula], callback);
    }

    static buscarPorMatricula(matricula, callback) {
        const sqlBuscar = "SELECT matricula, nome, email, formacao FROM professores WHERE matricula = ?";
        conexao.query(sqlBuscar, [matricula], (erro, resultados) => {
            if (erro) return callback(erro);
            callback(null, resultados[0]);
        });
    }

    static atualizar(matricula, nome, email, formacao, callback) {
        const sqlUpdate = `
            UPDATE professores 
            SET nome = ?, email = ?, formacao = ? 
            WHERE matricula = ?
        `;
        conexao.query(sqlUpdate, [nome, email, formacao, matricula], callback);
    }

    static listar(callback) {
        const sql = "SELECT matricula, nome, email, formacao FROM professores";
        conexao.query(sql, callback);
    }
}

class Aluno {
    constructor(nome, data_nascimento, email, numero_turma) {
        this.nome = nome;
        this.data_nascimento = data_nascimento;
        this.email = email;
        this.numero_turma = numero_turma;
    }

    cadastrar(callback) {
        const sql = `
            INSERT INTO alunos (nome, data_nascimento, email, numero_turma)
            VALUES (?, ?, ?, ?)
        `;

        conexao.query(sql, [
            this.nome,
            this.data_nascimento,
            this.email,
            this.numero_turma
        ], callback);
    }

    static listar(callback) {
        const sql = `
            SELECT 
                alunos.matricula, 
                alunos.nome, 
                alunos.data_nascimento, 
                alunos.email, 
                turmas.nome_curso AS nome_turma
            FROM alunos
            INNER JOIN turmas ON alunos.numero_turma = turmas.numero
        `;
        conexao.query(sql, callback);
    }

    static deletar(matricula, callback) {
        const sqlDelete = "DELETE FROM alunos WHERE matricula = ?";
        conexao.query(sqlDelete, [matricula], callback);
    }

    static buscarPorMatricula(matricula, callback) {
        const sqlBuscar = "SELECT matricula, nome, data_nascimento, email, numero_turma FROM alunos WHERE matricula = ?";
        conexao.query(sqlBuscar, [matricula], (erro, resultados) => {
            if (erro) return callback(erro);
            callback(null, resultados[0]);
        });
    }

    static atualizar(matricula, nome, data_nascimento, email, numero_turma, callback) {
        const sqlUpdate = `
            UPDATE alunos 
            SET nome = ?, data_nascimento = ?, email = ?, numero_turma = ? 
            WHERE matricula = ?
        `;
        conexao.query(sqlUpdate, [nome, data_nascimento, email, numero_turma, matricula], callback);
    }
}

class Turma {
    constructor(nome_curso, ano_letivo, matricula_professor) {
        this.nome_curso = nome_curso;
        this.ano_letivo = ano_letivo;
        this.matricula_professor = matricula_professor;
    }

    cadastrar(callback) {
        const sql = `
            INSERT INTO turmas (nome_curso, ano_letivo, matricula_professor)
            VALUES (?, ?, ?)
        `;

        conexao.query(sql, [
            this.nome_curso,
            this.ano_letivo,
            this.matricula_professor
        ], callback);
    }

    static listar(callback) {
        const sql = `
            SELECT 
                turmas.numero, 
                turmas.nome_curso, 
                turmas.ano_letivo, 
                turmas.matricula_professor, 
                professores.nome AS nome_professor
            FROM turmas
            INNER JOIN professores ON turmas.matricula_professor = professores.matricula
        `;
        conexao.query(sql, callback);
    }

    static deletar(numero, callback) {
        const sqlUpdateAlunos = "UPDATE alunos SET numero_turma = NULL WHERE numero_turma = ?";
        
        conexao.query(sqlUpdateAlunos, [numero], (erro) => {
            if (erro) return callback(erro);
            
            const sqlDeleteTurma = "DELETE FROM turmas WHERE numero = ?";
            conexao.query(sqlDeleteTurma, [numero], callback);
        });
    }

    static buscarPorNumero(numero, callback) {
        const sqlBuscar = "SELECT numero, nome_curso, ano_letivo, matricula_professor FROM turmas WHERE numero = ?";
        conexao.query(sqlBuscar, [numero], (erro, resultados) => {
            if (erro) return callback(erro);
            callback(null, resultados[0]);
        });
    }

    static atualizar(numero, nome_curso, ano_letivo, matricula_professor, callback) {
        const sqlUpdate = `
            UPDATE turmas 
            SET nome_curso = ?, ano_letivo = ?, matricula_professor = ? 
            WHERE numero = ?
        `;
        conexao.query(sqlUpdate, [nome_curso, ano_letivo, matricula_professor || null, numero], callback);
    }
}

module.exports = {
    Professor,
    Aluno,
    Turma
};