CREATE DATABASE escola;

USE escola;

CREATE TABLE professores (
    matricula INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30),
    email VARCHAR(50),
    formacao VARCHAR(100)

);

CREATE TABLE turmas (
    numero INT AUTO_INCREMENT PRIMARY KEY,
    nome_curso VARCHAR(50) NOT NULL,
    ano_letivo INT,
    matricula_professor INT NOT NULL,

    FOREIGN KEY (matricula_professor)
        REFERENCES professores(matricula)
);

CREATE TABLE alunos (
    matricula INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30),
    data_nascimento DATE,
    email VARCHAR(50),
    numero_turma INT NOT NULL,

    FOREIGN KEY (numero_turma) REFERENCES turmas(numero)
);