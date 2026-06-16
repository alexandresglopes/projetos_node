export class Imc {
    calcularImc(alt, peso) {      
        return peso / (alt * alt);
    }
}