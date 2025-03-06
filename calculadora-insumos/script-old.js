let resposta; // Declare resposta fora das funções
function calcular() {
    const destinoValor = document.getElementById('listaDestino');
    const selectValor = document.getElementById('valor');
    const resultado = document.getElementById('resultado');
    
    // Captura o valor da opção selecionada
    const lista = destinoValor.options[destinoValor.selectedIndex].value;
    const valor = Number(selectValor.value);
    
    // Adiciona um console.log para depuração
    console.log('Cidade selecionada:', lista);
    console.log('Valor inserido:', valor);

    const taxas = {
        'sul': { limite: 6000, taxa: 3.0, abaixoLimite: 200 },
        'centro': { limite: 6000, taxa: 3.5, abaixoLimite: 250 },
        'norte': { limite: 6000, taxa: 3.5, abaixoLimite: 250 }
    };

    if (taxas[lista]) {
        const { limite, taxa, abaixoLimite } = taxas[lista];

        if (valor > limite) {
            const calculo = (valor * taxa) / 100;
            resposta = calculo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        } else {
            resposta = abaixoLimite.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        }   
        resultado.style.display = 'flex';
        resultado.textContent = resposta; // Exibe a resposta no elemento resultado
    } else {
        resposta = 'Cidade de destino inválida.';
        resultado.style.display = 'flex';
        resultado.textContent = resposta; // Exibe mensagem de erro
    }
}
// Função de validação
function validar() {
    let destino = document.getElementById('listaDestino');
    let resultado = document.getElementById('resultado'); // Definindo resultado

    let destinoValor = destino.options[destino.selectedIndex].value;

    // Remover classes de erro e sucesso antes de validar
    resultado.classList.remove('alert-danger', 'alert-success');
    resultado.style.display = 'none'; // Esconder resultado inicialmente

    // Validar entradas
    if (destinoValor === 'nada') {
        resultado.classList.add('alert-danger');
        resultado.style.display = 'flex';
        resultado.innerHTML = 'Selecione a cidade de destino.';
    } else {
        resultado.innerHTML = resposta || 'Resultado não calculado'; // Mostra a resposta ou mensagem de erro
        resultado.classList.add('alert-success');
        resultado.style.display = 'flex';
    }
}

// Função para limpar o resultado
function limpar() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    resultado.style.display = 'none';
}

// Fetch das cidades
fetch('../artefatos/cidades.json')
.then(response => response.json())
.then(data => {
    const listaOrigem = document.getElementById('listaDestino');

    // Preenche o select com as opções de cidades
    data.groups.forEach(group => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = group.label;

        group.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.text = option.text;
            optgroup.appendChild(optionElement);
        });

        listaOrigem.appendChild(optgroup);
    });
})
.catch(error => console.error('Erro ao carregar as cidades:', error));

Promise.all([
    fetch('../artefatos/modals.html').then(response => response.text()),
    fetch('../artefatos/cabecalho.html').then(response => response.text()),
    fetch('../artefatos/rodape.html').then(response => response.text())
])
.then(([modalsData, cabecalhoData, rodapeData]) => {
    // Adiciona os modais
    document.body.insertAdjacentHTML('beforeend', modalsData);

    // Adiciona o cabeçalho se ainda não foi adicionado
    if (!document.querySelector('#cabecalho')) {
        const cabecalhoDiv = document.createElement('div');
        cabecalhoDiv.id = 'cabecalho';
        cabecalhoDiv.innerHTML = cabecalhoData;
        document.body.insertAdjacentElement('afterbegin', cabecalhoDiv);
    }

    // Adiciona o rodapé se ainda não foi adicionado
    if (!document.querySelector('#rodape')) {
        const rodapeDiv = document.createElement('div');
        rodapeDiv.id = 'rodape';
        rodapeDiv.innerHTML = rodapeData;
        document.body.insertAdjacentElement('beforeend', rodapeDiv);
    }
})
.catch(error => console.error('Erro ao carregar os arquivos:', error));