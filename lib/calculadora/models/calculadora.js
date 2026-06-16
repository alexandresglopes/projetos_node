class Calculadora {

    somar(numero1, numero2){
        return numero1 + numero2;
    }

    subtrir(numero1, numero2){
        return numero1 - numero2;
    }

    dividir(numero1, numero2){
        return numero1 / numero2;
    }

    multiplicar(numero1, numero2){
        return numero1 * numero2;
    }
}

const calc = new Calculadora();

console.log("Soma: ", calc.somar(10,2));

console.log("Subtrair: ", calc.subtrir(10,2));

console.log("Dividir: ", calc.dividir(10,2));

console.log("Multiplicar: ", calc.multiplicar(10,2));