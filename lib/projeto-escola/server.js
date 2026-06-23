require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");

const { Professor, Aluno, Turma } = require("./models/classes");
const conexao = require("./config/conexao");

const app = express();
const porta = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.post("/login", (req, res) => {
    const { usuario, senha } = req.body;

    if (usuario === "admin" && senha === "admin") {
        req.session.logado = true;
        return res.redirect("/dashboard.html");
    } else {
        return res.redirect("/index.html?erro=1");
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/index.html");
    });
});

app.get("/", (req, res) => {
    if (req.session && req.session.logado) {
        res.redirect("/dashboard.html");
    } else {
        res.redirect("/index.html");
    }
});

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/css/style.css", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "css", "style.css"));
});

function verificarAutenticacao(req, res, next) {
    if (req.session && req.session.logado) {
        return next();
    }
    res.redirect("/index.html");
}

app.use(verificarAutenticacao);

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/totais-dashboard", (req, res) => {
    const qProfessores = "SELECT COUNT(*) AS total FROM professores";
    const qAlunos = "SELECT COUNT(*) AS total FROM alunos";
    const qTurmas = "SELECT COUNT(*) AS total FROM turmas";

    conexao.query(qProfessores, (erroProf, resProf) => {
        if (erroProf) return res.status(500).json({ erro: erroProf.message });

        conexao.query(qAlunos, (erroAlu, resAlu) => {
            if (erroAlu) return res.status(500).json({ erro: erroAlu.message });

            conexao.query(qTurmas, (erroTur, resTur) => {
                if (erroTur) return res.status(500).json({ erro: erroTur.message });

                res.json({
                    professores: resProf[0].total,
                    alunos: resAlu[0].total,
                    turmas: resTur[0].total
                });
            });
        });
    });
});

app.get("/api/professores", (req, res) => {
    Professor.listar((erro, resultados) => {
        if (erro) {
            console.log("Erro ao buscar professores:", erro);
            return res.status(500).json({ erro: "Erro ao buscar professores." });
        }
        res.json(resultados);
    });
});

app.get("/api/professores/:matricula", (req, res) => {
    const { matricula } = req.params;

    Professor.buscarPorMatricula(matricula, (erro, professor) => {
        if (erro) {
            console.log("Erro ao buscar professor:", erro);
            return res.status(500).json({ erro: "Erro ao buscar professor." });
        }
        res.json(professor);
    });
});

app.post("/cadastrar-professor", (req, res) => {
    const { nome, email, formacao } = req.body;
    const professor = new Professor(nome, email, formacao);

    professor.cadastrar((erro) => {
        if (erro) {
            console.log("Erro ao cadastrar professor:", erro);
            return res.send("Erro ao cadastrar professor.");
        }
        res.redirect("/lista-professores.html");
    });
});

app.post("/atualizar-professor", (req, res) => {
    const { matricula, nome, email, formacao } = req.body;

    Professor.atualizar(matricula, nome, email, formacao, (erro) => {
        if (erro) {
            console.log("Erro ao atualizar professor:", erro);
            return res.send("Erro ao atualizar professor.");
        }
        res.redirect("/lista-professores.html");
    });
});

app.delete("/api/professores/:matricula", (req, res) => {
    const { matricula } = req.params;

    Professor.deletar(matricula, (erro) => {
        if (erro) {
            console.log("Erro ao deletar professor:", erro);
            return res.status(500).json({ erro: "Erro ao deletar professor." });
        }
        res.sendStatus(200);
    });
});

app.get("/api/alunos", (req, res) => {
    Aluno.listar((erro, resultados) => {
        if (erro) {
            console.log("Erro ao buscar alunos:", erro);
            return res.status(500).json({ erro: "Erro ao buscar alunos." });
        }
        res.json(resultados);
    });
});

app.get("/api/alunos/:matricula", (req, res) => {
    const { matricula } = req.params;

    Aluno.buscarPorMatricula(matricula, (erro, aluno) => {
        if (erro) {
            console.log("Erro ao buscar aluno:", erro);
            return res.status(500).json({ erro: "Erro ao buscar aluno." });
        }
        res.json(aluno);
    });
});

app.post("/cadastrar-aluno", (req, res) => {
    const { nome, data_nascimento, email, numero_turma } = req.body;
    const aluno = new Aluno(nome, data_nascimento, email, numero_turma);

    aluno.cadastrar((erro) => {
        if (erro) {
            console.log("Erro ao cadastrar aluno:", erro);
            return res.send("Erro ao cadastrar aluno.");
        }
        res.redirect("/lista-alunos.html");
    });
});

app.post("/atualizar-aluno", (req, res) => {
    const { matricula, nome, data_nascimento, email, numero_turma } = req.body;

    Aluno.atualizar(matricula, nome, data_nascimento, email, numero_turma, (erro) => {
        if (erro) {
            console.log("Erro ao atualizar aluno:", erro);
            return res.send("Erro ao atualizar aluno.");
        }
        res.redirect("/lista-alunos.html");
    });
});

app.delete("/api/alunos/:matricula", (req, res) => {
    const { matricula } = req.params;

    Aluno.deletar(matricula, (erro) => {
        if (erro) {
            console.log("Erro ao deletar aluno:", erro);
            return res.status(500).json({ erro: "Erro ao deletar aluno." });
        }
        res.sendStatus(200);
    });
});

app.get("/api/turmas", (req, res) => {
    Turma.listar((erro, resultados) => {
        if (erro) {
            console.log("Erro ao buscar turmas:", erro);
            return res.status(500).json({ erro: "Erro ao buscar turmas." });
        }
        res.json(resultados);
    });
});

app.get("/api/turmas/:numero", (req, res) => {
    const { numero } = req.params;

    Turma.buscarPorNumero(numero, (erro, turma) => {
        if (erro) {
            console.log("Erro ao buscar turma:", erro);
            return res.status(500).json({ erro: "Erro ao buscar turma." });
        }
        res.json(turma);
    });
});

app.post("/cadastrar-turma", (req, res) => {
    const { nome_curso, ano_letivo, matricula_professor } = req.body;
    const turma = new Turma(nome_curso, ano_letivo, matricula_professor);

    turma.cadastrar((erro) => {
        if (erro) {
            console.log("Erro ao cadastrar turma:", erro);
            return res.send("Erro ao cadastrar turma.");
        }
        res.redirect("/lista-turmas.html");
    });
});

app.post("/atualizar-turma", (req, res) => {
    const { numero, nome_curso, ano_letivo, matricula_professor } = req.body;

    Turma.atualizar(numero, nome_curso, ano_letivo, matricula_professor, (erro) => {
        if (erro) {
            console.log("Erro ao atualizar turma:", erro);
            return res.send("Erro ao atualizar turma.");
        }
        res.redirect("/lista-turmas.html");
    });
});

app.delete("/api/turmas/:numero", (req, res) => {
    const { numero } = req.params;

    Turma.deletar(numero, (erro) => {
        if (erro) {
            console.log("Erro ao deletar turma:", erro);
            return res.status(500).json({ erro: "Erro ao deletar turma." });
        }
        res.sendStatus(200);
    });
});

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});