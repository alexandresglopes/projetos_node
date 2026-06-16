# SafeWork - Sistema de Saúde Avançado

## Estrutura

```text
safework_sistema_saude_avancado/
│
├── index.html
├── DOCUMENTACAO.md
├── README.md
│
├── controllers/
|    └── script.js
├── img/
|    └── logo.png
├── models/
|    └── saude.js
├── styles/
|    └── style.css
│
└── views/
    └── dashboard.html
```

## Documentação criada

Esta documentação foi criada com base no diagrama de classes do sistema **SafeWork - Sistema de Saúde Avançado**.

O sistema tem como objetivo organizar informações relacionadas à saúde ocupacional dos colaboradores, permitindo o controle de exames médicos, afastamentos, restrições médicas, setores, cargos e clínica parceira.

Foram definidas as principais classes do sistema:

- `Clinica`;
- `SistemaSaudeAvancado`;
- `Colaborador`;
- `Setor`;
- `Cargo`;
- `ProntuarioEletronico`;
- `ExameMedico`;
- `Medico`;
- `Afastamento`;
- `RestricaoMedica`.

## Classes do sistema

### Clinica

Representa a clínica parceira responsável por apoiar os processos de saúde ocupacional.

Atributo principal:

- `nomeFantasia`.

Método principal:

- `emitirAvisoSegurança()`.

---

### SistemaSaudeAvancado

Representa a classe principal do sistema, responsável por gerenciar os colaboradores e a clínica parceira.

Atributos principais:

- `colaboradores`;
- `clinicaParceira`.

Métodos principais:

- `cadastrarColaborador()`;
- `consultar(id)`;
- `excluir(id)`;
- `contarExamesVencidos()`;
- `contarColaboradoresAfastados()`.

---

### Colaborador

Representa o funcionário cadastrado no sistema.

Atributos principais:

- `id`;
- `nome`;
- `setor`;
- `cargo`;
- `prontuario`.

Método principal:

- `alterarCargo()`.

---

### Setor

Representa o setor em que o colaborador trabalha.

Atributo principal:

- `nome`.

---

### Cargo

Representa o cargo ocupado pelo colaborador.

Atributo principal:

- `nome`.

---

### ProntuarioEletronico

Representa o prontuário eletrônico do colaborador, armazenando exames e afastamentos.

Atributos principais:

- `historicoExames`;
- `historicoAfastamentos`.

Métodos principais:

- `adicionarExame()`;
- `adicionarAfastamento()`;
- `obterUltimoExame()`;
- `calcularTotalDiasAfastados()`.

---

### ExameMedico

Representa os exames médicos realizados pelo colaborador.

Atributos principais:

- `tipo`;
- `dataRealizacao`;
- `resultado`;
- `medico`.

Métodos principais:

- `estaVencido()`;
- `obterResumoExame()`.

---

### Medico

Representa o médico responsável por assinar ou validar um exame médico.

Atributos principais:

- `nome`;
- `crm`.

Método principal:

- `validarRegistro()`.

---

### Afastamento

Representa o afastamento médico do colaborador.

Atributos principais:

- `motivoCID`;
- `dataInicio`;
- `dataFim`.

Método principal:

- `calcularDiasAfastado()`.

---

### RestricaoMedica

Representa uma restrição médica gerada a partir de um afastamento ou avaliação de saúde.

Atributos principais:

- `descricao`;
- `prazoDias`.

Método principal:

- `recomendarAdaptacao()`.

## Relacionamentos do sistema

Foram definidos os seguintes relacionamentos entre as classes:

- `SistemaSaudeAvancado` possui uma `Clinica`;
- `SistemaSaudeAvancado` gerencia vários `Colaborador`;
- `Colaborador` possui um `ProntuarioEletronico`;
- `Colaborador` pertence a um `Setor`;
- `Colaborador` ocupa um `Cargo`;
- `ProntuarioEletronico` contém vários `ExameMedico`;
- `ProntuarioEletronico` contém vários `Afastamento`;
- `ExameMedico` é assinado por um `Medico`;
- `Afastamento` pode gerar uma `RestricaoMedica`.

## Conceitos utilizados

A modelagem utiliza conceitos de Programação Orientada a Objetos, como:

- Classes;
- Objetos;
- Atributos;
- Métodos;
- Associação;
- Agregação;
- Composição;
- Encapsulamento.

## Como usar

1. Abra o arquivo `index.html`;
2. Cadastre os setores e cargos necessários;
3. Cadastre os colaboradores;
4. Vincule cada colaborador a um setor, cargo e prontuário eletrônico;
5. Adicione exames médicos ao prontuário;
6. Registre afastamentos quando necessário;
7. Consulte exames vencidos e colaboradores afastados pelo sistema;
8. Utilize as informações cadastradas para acompanhamento da saúde ocupacional.

## Observação

A documentação foi organizada para seguir o mesmo padrão do arquivo modelo, com linguagem simples, estrutura objetiva e foco na explicação das classes, métodos e relacionamentos do sistema.
