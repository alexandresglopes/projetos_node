require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");

const { Cliente, Vendedor, Produto, Venda } = require("./models/classes");

const app = express();
const porta = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || "chave-secreta-comercial-pro",
    resave: false,
    saveUninitialized: false
}));

app.use("/controllers", express.static(path.join(__dirname, "controllers")));


app.post("/login", (req, res) => {
    const { usuario, senha } = req.body;
    if (usuario === "admin" && senha === "admin123") {
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


app.post("/cadastrar-cliente", (req, res) => {
    const { nome, cpf, email, telefone, endereco, data_nascimento } = req.body; 
    
    
    const cliente = new Cliente(nome, cpf, email, telefone, endereco, data_nascimento); 

    cliente.cadastrar((erro) => {
        if (erro) {
            console.error("Erro ao cadastrar cliente:", erro);
            return res.send("Erro ao salvar cliente no sistema.");
        }
        res.redirect("/cadastro-cliente.html");
    });
});

app.delete("/api/deletecliente/:id", (req, res) => {
    const { id } = req.params;

    Cliente.deletar(id, (erro) => {
        if (erro) {
            console.log("Erro ao deletar cliente:", erro);
            return res.status(500).json({ erro: "Erro ao deletar cliente." });
        }
        res.sendStatus(200);
    });
});


app.post("/cadastrar-vendedor", (req, res) => {
    const { nome, cpf, email, telefone, matricula, setor, comissao } = req.body; 
    
   
    const vendedor = new Vendedor(nome, cpf, email, telefone, matricula, setor, parseFloat(comissao)); 

    vendedor.cadastrar((erro) => {
        if (erro) {
            console.error("Erro ao cadastrar vendedor:", erro);
            return res.send("Erro ao salvar vendedor no sistema.");
        }
        res.redirect("/cadastro-vendedor.html");
    });
});


app.post("/cadastrar-produto", (req, res) => {
    const { nome_produto, descricao, preco, quantidade_estoque, categoria } = req.body; 
    
    
    const produto = new Produto(nome_produto, descricao, parseFloat(preco), parseInt(quantidade_estoque), categoria); 

    produto.cadastrar((erro) => {
        if (erro) {
            console.error("Erro ao cadastrar produto:", erro);
            return res.send("Erro ao salvar produto no sistema.");
        }
        res.redirect("/cadastro-produto.html");
    });
});

app.post("/cadastrar-venda", (req, res) => {
    const { id_cliente, id_vendedor, id_produto, quantidade, data_venda, valor_total } = req.body; 
    
    
    const venda = new Venda(
        parseInt(id_cliente), 
        parseInt(id_vendedor), 
        parseInt(id_produto), 
        parseInt(quantidade), 
        data_venda, 
        parseFloat(valor_total)
    ); 

    venda.cadastrar((erro) => {
        if (erro) {
            console.error("Erro ao lançar venda:", erro);
            return res.send("Erro ao processar a venda no sistema.");
        }
        res.redirect("/cadastro-venda.html");
    });
});

app.get("/api/clientes", (req, res) => {
    Cliente.listar((erro, resultados) => {
        if (erro) {
            console.error("Erro ao buscar clientes:", erro);
            return res.status(500).json({ erro: "Erro ao buscar clientes." });
        }
        res.json(resultados);
    });
});

app.get("/api/vendedores", (req, res) => {
    Vendedor.listar((erro, resultados) => {
        if (erro) {
            console.error("Erro ao buscar vendedores:", erro);
            return res.status(500).json({ erro: "Erro ao buscar vendedores." });
        }
        res.json(resultados);
    });
});

app.get("/api/produtos", (req, res) => {
    Produto.listar((erro, resultados) => {
        if (erro) {
            console.error("Erro ao buscar produtos:", erro);
            return res.status(500).json({ erro: "Erro ao buscar produtos." });
        }
        res.json(resultados);
    });
});

app.get("/api/vendas", (req, res) => {
    Venda.listarHistorico((erro, resultados) => {
        if (erro) {
            console.error("Erro ao buscar histórico de vendas:", erro);
            return res.status(500).json({ erro: "Erro ao buscar histórico de vendas." });
        }
        res.json(resultados || []);
    });
});

app.get("/api/dashboard-totais", (req, res) => {
    Cliente.contar((erro, totalClientes) => {
        if (erro) return res.status(500).json({ erro });

        Vendedor.contar((erro, totalVendedores) => {
            if (erro) return res.status(500).json({ erro });

            Produto.contar((erro, totalProdutos) => {
                if (erro) return res.status(500).json({ erro });

                Venda.contar((erro, totalVendas) => {
                    if (erro) return res.status(500).json({ erro });
                    
                    res.json({
                        clientes: totalClientes,
                        vendedores: totalVendedores,
                        produtos: totalProdutos,
                        vendas: totalVendas
                    });
                });
            });
        });
    });
});


app.listen(porta, () => {
    console.log(`Servidor Comercial rodando em http://localhost:${porta}`);
});