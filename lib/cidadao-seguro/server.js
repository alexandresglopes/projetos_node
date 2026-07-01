require("dotenv").config(); 
const express = require("express");
const path = require("path");
const session = require("express-session");


const { Cidadao, Agente, Bairro, Ocorrencia } = require("./models/classes");

const app = express();
const porta = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));


app.post("/login", (req, res) => {
    const { usuario, senha } = req.body;    
    if (usuario === "adm" && senha === "adm123") {
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


app.get("/index.html", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.get("/css/style.css", (req, res) => res.sendFile(path.join(__dirname, "public", "css", "style.css")));
app.get("/controllers/script.js", (req, res) => res.sendFile(path.join(__dirname, "public", "controllers", "script.js")));


function verificarAutenticacao(req, res, next) {
    if (req.session && req.session.logado) return next();
    res.redirect("/index.html");
}

app.use(verificarAutenticacao);
app.use(express.static(path.join(__dirname, "public")));


app.get("/api/dashboard-totais", (req, res) => {
    Cidadao.contar((e1, tCidadaos) => {
        if (e1) return res.status(500).json({ erro: e1 });
        Agente.contar((e2, tAgentes) => {
            if (e2) return res.status(500).json({ erro: e2 });
            Bairro.contar((e3, tBairros) => {
                if (e3) return res.status(500).json({ erro: e3 });
                Ocorrencia.contar((e4, tOcorrencias) => {
                    if (e4) return res.status(500).json({ erro: e4 });
                    res.json({ cidadaos: tCidadaos, agentes: tAgentes, bairros: tBairros, ocorrencias: tOcorrencias });
                });
            });
        });
    });
});

app.get("/api/ocorrencias-por-status", (req, res) => {
    Ocorrencia.contarPorStatus((err, dados) => {
        if (err) return res.status(500).json({ erro: err });
        res.json(dados);
    });
});


app.post("/api/cidadaos", (req, res) => {
    const { nome, cpf, email, telefone, endereco, data_nascimento } = req.body;
    const cidadao = new Cidadao(nome, cpf, email, telefone, endereco, data_nascimento);
    cidadao.cadastrar((err) => err ? res.status(500).send("Erro") : res.sendStatus(200));
});

app.get("/api/cidadaos", (req, res) => {
    Cidadao.listar((err, resultados) => err ? res.status(500).json([]) : res.json(resultados)); 
});

app.get("/api/cidadaos/:id", (req, res) => {
    Cidadao.buscarPorId(req.params.id, (err, resultado) => err ? res.status(500).json(null) : res.json(resultado));
});

app.post("/api/cidadaos/atualizar", (req, res) => {
    const { id_cidadao, nome, cpf, email, telefone, endereco, data_nascimento } = req.body;
    Cidadao.atualizar(id_cidadao, nome, cpf, email, telefone, endereco, data_nascimento, (err) => err ? res.status(500).send("Erro") : res.sendStatus(200));
});

app.delete("/api/cidadaos/:id", (req, res) => {
    Cidadao.deletar(req.params.id, (err) => err ? res.status(500).send("Erro") : res.sendStatus(200));
});


app.post("/api/agentes", (req, res) => {
    const { nome, cpf, email, telefone, matricula, cargo, turno } = req.body;
    const agente = new Agente(nome, cpf, email, telefone, matricula, cargo, turno);
    agente.cadastrar((err) => err ? res.status(500).send("Erro") : res.sendStatus(200));
});

app.get("/api/agentes", (req, res) => {
    Agente.listar((err, resultados) => err ? res.status(500).json([]) : res.json(resultados));
});

app.get("/api/agentes/:id", (req, res) => {
    Agente.buscarPorId(req.params.id, (err, resultado) => err ? res.status(500).json(null) : res.json(resultado));
});

app.post("/api/agentes/atualizar", (req, res) => {
    const { id_agente, nome, cpf, email, telefone, matricula, cargo, turno } = req.body;
    Agente.atualizar(id_agente, nome, cpf, email, telefone, matricula, cargo, turno, (err) => err ? res.status(500).send("Erro") : res.sendStatus(200));
});

app.delete("/api/agentes/:id", (req, res) => {
    Agente.deletar(req.params.id, (err) => err ? res.status(500).send("Erro") : res.sendStatus(200));
});


app.post("/api/bairros", (req, res) => {
    const { nome_bairro, zona, populacao_estimada, observacoes } = req.body;
    const bairro = new Bairro(nome_bairro, zona, parseInt(populacao_estimada), observacoes);
    bairro.cadastrar((err) => err ? res.status(500).send("Erro") : res.sendStatus(200));
});

app.get("/api/bairros", (req, res) => {
    Bairro.listar((err, resultados) => err ? res.status(500).json([]) : res.json(resultados));
});

app.get("/api/bairros/:id", (req, res) => {
    Bairro.buscarPorId(req.params.id, (err, resultado) => err ? res.status(500).json(null) : res.json(resultado));
});

app.post("/api/bairros/atualizar", (req, res) => {
    const { id_bairro, nome_bairro, zona, populacao_estimada, observacoes } = req.body;
    Bairro.atualizar(id_bairro, nome_bairro, zona, parseInt(populacao_estimada), observacoes, (err) => err ? res.status(500).send("Erro") : res.sendStatus(200));
});

app.delete("/api/bairros/:id", (req, res) => {
    Bairro.deletar(req.params.id, (err) => err ? res.status(500).send("Erro") : res.sendStatus(200));
});


app.post("/api/ocorrencias", (req, res) => {
    const { id_cidadao, id_agente, id_bairro, tipo_ocorrencia, descricao, data_hora, status } = req.body;
    const ocorrencia = new Ocorrencia(parseInt(id_cidadao), parseInt(id_agente), parseInt(id_bairro), tipo_ocorrencia, descricao, data_hora, status);
    ocorrencia.cadastrar((err) => err ? res.status(500).send("Erro") : res.sendStatus(200));
});

app.get("/api/ocorrencias", (req, res) => {
    Ocorrencia.listarCompleto((err, resultados) => err ? res.status(500).json([]) : res.json(resultados));
});

app.get("/api/ocorrencias/:id", (req, res) => {
    Ocorrencia.buscarPorId(req.params.id, (err, resultado) => err ? res.status(500).json(null) : res.json(resultado));
});

app.post("/api/ocorrencias/atualizar", (req, res) => {
    const { id_ocorrencia, id_cidadao, id_agente, id_bairro, tipo_ocorrencia, descricao, data_hora, status } = req.body;
    Ocorrencia.atualizar(id_ocorrencia, parseInt(id_cidadao), parseInt(id_agente), parseInt(id_bairro), tipo_ocorrencia, descricao, data_hora, status, (err) => err ? res.status(500).send("Erro") : res.sendStatus(200));
});

app.delete("/api/ocorrencias/:id", (req, res) => {
    Ocorrencia.deletar(req.params.id, (err) => err ? res.status(500).send("Erro") : res.sendStatus(200));
});

app.listen(porta, () => {
    console.log(`Sistema Cidadão Seguro rodando em http://localhost:${porta}`);
});