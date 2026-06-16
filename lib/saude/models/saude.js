export class Setor { constructor(nome) { this.nome = nome; } }
export class Cargo { constructor(nome) { this.nome = nome; } }

export class Medico {
    constructor(nome, crm) {
        this.nome = nome;
        this.crm = crm;
    }
    validarRegistro() { return this.crm.length > 3; } 
}

export class RestricaoMedica {
    constructor(descricao, prazoDias) {
        this.descricao = descricao;
        this.prazoDias = prazoDias;
    }
    recomendarAdaptacao() { return `Aviso: Adaptar posto por ${this.prazoDias} dias.`; } 
}

export class ExameMedico {
    constructor(tipo, dataRealizacao, resultado, medico) {
        this.tipo = tipo;
        this.dataRealizacao = new Date(dataRealizacao); 
        this.resultado = resultado;
        this.medico = medico || new Medico("Dr. Avaliador Padrão", "CRM-12345");
    }

    estaVencido() { 
        const hoje = new Date();
        const tempoDecorrido = hoje - this.dataRealizacao;
        const diasDecorridos = tempoDecorrido / (1000 * 60 * 60 * 24);
        return diasDecorridos > 365;
    }
    
    obterResumoExame() { return `${this.tipo} realizado em ${this.dataRealizacao.toLocaleDateString()}`; } 
}

export class Afastamento {
    constructor(motivoCID, dataInicio, dataFim) {
        this.motivoCID = motivoCID;
        this.dataInicio = new Date(dataInicio);
        this.dataFim = new Date(dataFim);
    }
    
    calcularDiasAfastado() { 
        const diferencaTempo = this.dataFim - this.dataInicio;
        if (diferencaTempo < 0) return 0;
        return Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24)) + 1;
    }
}

export class ProntuarioEletronico {
    constructor() {
        this.historicoExames = [];
        this.historicoAfastamentos = [];
    }
    adicionarExame(exame) { this.historicoExames.push(exame); } 
    adicionarAfastamento(afastamento) { this.historicoAfastamentos.push(afastamento); } 
    
    obterUltimoExame() { 
        return this.historicoExames.length > 0 ? this.historicoExames[this.historicoExames.length - 1] : null;
    }

    CalcularTotalDiasAfastados() { 
        return this.historicoAfastamentos.reduce((total, af) => total + af.calcularDiasAfastado(), 0);
    }
}

export class Colaborador {
    constructor(id, nome, setor, cargo) {
        this.id = id;
        this.nome = nome;
        this.setor = setor;
        this.cargo = cargo;
        this.prontuario = new ProntuarioEletronico();
    }
    alterarCargo(novoCargo) { this.cargo = novoCargo; } 
}

export class Clinica {
    constructor(nomeFantasia) { this.nomeFantasia = nomeFantasia; }
    emitirAvisoSegurança() { return `Prontuários sob custódia da clínica ${this.nomeFantasia}`; } 
}

export class SistemaSaudeAvançado {
    constructor() { 
        this.colaboradores = []; 
        this.clinicaParceira = new Clinica("Clínica de Saúde Central");
    }

    cadastrarColaborador(id, nome, setor, cargo, dataExame, resultado) { 
        const novoColab = new Colaborador(id, nome, new Setor(setor), new Cargo(cargo));
        novoColab.prontuario.adicionarExame(new ExameMedico("Periódico", dataExame, resultado));
        this.colaboradores.push(novoColab);
    }

    consultar(id) { return this.colaboradores.find(c => c.id === id); } 

    excluir(id) { this.colaboradores = this.colaboradores.filter(c => c.id !== id); } 
    
    contarExamesVencidos() { 
        return this.colaboradores.filter(c => {
            const ultimo = c.prontuario.obterUltimoExame();
            return ultimo ? ultimo.estaVencido() : false;
        }).length;
    }

    contarColaboradoresAfastados() { 
        return this.colaboradores.filter(c => c.prontuario.historicoAfastamentos.length > 0).length;
    }
}