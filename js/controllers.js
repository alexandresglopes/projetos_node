
function mascaraMoeda(i) {
    let v = i.value.replace(/\D/g, "");

    if (v.length === 0) {
        i.value = "";
        return;
    }

    v = (Number(v) / 100).toFixed(2);

    let partes = v.split(".");
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    i.value = partes.join(",");
}

function formatarReal(valor) {

    let numero = parseFloat(valor);

    if (isNaN(numero)) return "0,00";

    return numero.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
    });
}

function mascaraAltura(i) {
    let v = i.value.replace(/\D/g, "");
    if (v.length > 1) {
        v = v.substring(0, 1) + "." + v.substring(1);
    }
    i.value = v;
}

function mascaraCPF(i) {
    let v = i.value;
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    i.value = v;
}

function mascaraCelular(i) {
    let v = i.value;
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d{2})(\d)/, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");

    i.value = v.substring(0, 15);
}

function mascaraCNPJ(i) {
    let v = i.value;
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");

    i.value = v;
}

function mascaraCEP(i) {
    let v = i.value;
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{5})(\d)/, "$1-$2");
    i.value = v;
}
