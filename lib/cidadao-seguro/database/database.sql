CREATE DATABASE IF NOT EXISTS cidadao_seguro;
USE cidadao_seguro;


CREATE TABLE IF NOT EXISTS cidadaos (
    id_cidadao INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    data_nascimento DATE
);


CREATE TABLE IF NOT EXISTS agentes (
    id_agente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20),
    matricula VARCHAR(50) NOT NULL,
    cargo VARCHAR(100),
    turno VARCHAR(50)
);


CREATE TABLE IF NOT EXISTS bairros (
    id_bairro INT AUTO_INCREMENT PRIMARY KEY,
    nome_bairro VARCHAR(150) NOT NULL,
    zona VARCHAR(50),
    populacao_estimada INT,
    observacoes TEXT
);


CREATE TABLE IF NOT EXISTS ocorrencias (
    id_ocorrencia INT AUTO_INCREMENT PRIMARY KEY,
    id_cidadao INT,
    id_agente INT,
    id_bairro INT,
    tipo_ocorrencia VARCHAR(150) NOT NULL,
    descricao TEXT,
    data_hora DATETIME NOT NULL,
    status VARCHAR(50) DEFAULT 'Aberta',
    FOREIGN KEY (id_cidadao) REFERENCES cidadaos(id_cidadao) ON DELETE RESTRICT,
    FOREIGN KEY (id_agente) REFERENCES agentes(id_agente) ON DELETE RESTRICT,
    FOREIGN KEY (id_bairro) REFERENCES bairros(id_bairro) ON DELETE RESTRICT
);