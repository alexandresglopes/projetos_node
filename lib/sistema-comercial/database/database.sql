CREATE DATABASE IF NOT EXISTS sistema_comercial;
USE sistema_comercial;

CREATE TABLE IF NOT EXISTS clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    data_nascimento DATE
);

CREATE TABLE IF NOT EXISTS vendedores (
    id_vendedor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20),
    matricula VARCHAR(50) NOT NULL,
    setor VARCHAR(100),
    comissao FLOAT DEFAULT 0.0
);

CREATE TABLE IF NOT EXISTS produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome_produto VARCHAR(150) NOT NULL,
    descricao TEXT,
    preco FLOAT NOT NULL,
    quantidade_estoque INT DEFAULT 0,
    categoria VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS vendas (
    id_venda INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_vendedor INT,
    id_produto INT,
    quantidade INT NOT NULL,
    data_venda DATE NOT NULL,
    valor_total FLOAT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON DELETE RESTRICT,
    FOREIGN KEY (id_vendedor) REFERENCES vendedores(id_vendedor) ON DELETE RESTRICT,
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto) ON DELETE RESTRICT
);