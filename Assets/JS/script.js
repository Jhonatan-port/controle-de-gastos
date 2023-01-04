

const botaoAdd = document.getElementById('btn__adicionar');
var valorTotal = document.getElementById('valor__adquirido');
let listaTipos = [];
let listaValores = [];
botaoAdd.addEventListener('click', function (event) {

    event.preventDefault();
    var form = document.getElementById('form__recebido')
    var valorRecebido = obtemValor(form)




    adicionaLinhaDeValor(valorRecebido)
    somaValores(listaTipos, listaValores)

    form.reset();


})



function obtemValor(form) {
    var valorLinha = {
        tipo: form.tipo.value,
        titulo: form.titulo.value,
        valor: padronizarMoeda(form.valor.value)
    }

    if (validaLinha(valorLinha)) {
        listaValores.push(valorLinha.valor)

        console.log(listaValores);
        if (valorLinha.tipo == 'Gasto') {
            listaTipos.push('Gasto')
        } else if (valorLinha.tipo == 'Recebido') {
            listaTipos.push('Recebido')
        }
        console.log(listaTipos);
    }
    return valorLinha
}

function validaLinha(valorLinha) {
    if (valorLinha.titulo == '' || valorLinha.valor == '0' || valorLinha.tipo == '') {
        return false
    } else {
        return true
    }
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe)

    return td
}


function montaLinha(valorLinha) {

    if (!validaLinha(valorLinha)) {

        alert('Favor preencher todos os campos')
        return 'erro'

    } else {
        var valorTr = document.createElement("tr");
        valorTr.appendChild(montaTd(valorLinha.tipo, "celula__" + valorLinha.tipo))
        valorTr.appendChild(montaTd(valorLinha.titulo, "celula__tabela"))
        valorTr.appendChild(montaTd(valorLinha.valor, "celula__valor"))

        return valorTr
    }
}

function adicionaLinhaDeValor(valorLinha) {
    var tabela = document.getElementById('tabela__valores')
    var valorTr = montaLinha(valorLinha)
    if (valorTr == 'erro') {
        return
    }

    tabela.appendChild(valorTr)
}

function padronizarMoeda(valor) {
    // Verificar se o valor é um número válido
    if (!isNaN(valor)) {
        // Verificar se o valor já está no formato de moeda (com duas casas decimais)
        if (valor.indexOf('.') !== -1 && valor.split('.')[1].length === 2) {
            return valor;
        } else {
            // Adicionar duas casas decimais ao valor
            valor = Number(valor)
            return valor.toFixed(2);
        }
    } else {
        // Retornar o valor original se ele não for um número válido
        return valor;
    }
}

function somaValores(tipos, valores) {

    var valorAdquirido = 0;

    if (tipos != []) {
        for (let i = 0; i < tipos.length; i++) {
            if (tipos[i] == 'Gasto') {
                valorAdquirido = valorAdquirido - Number(valores[i])
            } else {
                valorAdquirido = valorAdquirido + Number(valores[i])
            }
        }
    }
    if(valorAdquirido < 0){
    valorTotal.textContent = valorAdquirido;
    valorTotal.classList.remove('text-green-500')
    valorTotal.classList.add('text-red-500')
    }else{
        valorTotal.textContent = valorAdquirido;
        valorTotal.classList.remove('text-red-500')        
        valorTotal.classList.add('text-green-500')
    }
}