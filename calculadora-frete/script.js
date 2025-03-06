function pegarvalor() {
    // PEGANDO AS LISTAS 
    let quantidade = document.getElementById('listaQuantidade');
    let tipo = document.getElementById('listaTipo');
    let destino = document.getElementById('listaDestino');
    
    // PEGANDO O RESULTADO DAS LISTAS 
    let quantidadeValor = quantidade.options[quantidade.selectedIndex].id;
    let tipoValor = tipo.options[tipo.selectedIndex].id;
    let destinoValor = destino.options[destino.selectedIndex].value;

    // Dicionário de resultados
    const resultados = {
        '1': {
            'curta': { 'sul': '200', 'centro': '300', 'norte': '250' },
            'curtaGlock': { 'sul': '200', 'centro': '150', 'norte': '250' },
            'longa': { 'sul': '230', 'centro': '330', 'norte': '330' },
        },
        '2': {
            'curta': { 'sul': '300', 'centro': '450', 'norte': '450' },
            'curtaGlock': { 'sul': '300', 'centro': '250', 'norte': '350' },
            'longa': { 'sul': '330', 'centro': '480', 'norte': '480' },
        },
        '3': {
            'curta': { 'sul': '350', 'centro': '500', 'norte': '500' },
            'curtaGlock': { 'sul': '400', 'centro': '300', 'norte': '450' },
            'longa': { 'sul': '380', 'centro': '530', 'norte': '530' },
        },
        '4': {
            'curta': { 'sul': '400', 'centro': '550', 'norte': '550' },
            'curtaGlock': { 'sul': '450', 'centro': '350', 'norte': '500' },
            'longa': { 'sul': '430', 'centro': '580', 'norte': '580' },
        },
        '5': {
            'curta': { 'sul': '450', 'centro': '600', 'norte': '600' },
            'curtaGlock': { 'sul': '500', 'centro': '400', 'norte': '550' },
            'longa': { 'sul': '480', 'centro': '630', 'norte': '630' },
        },
        '6': {
            'curta': { 'sul': '500', 'centro': '650', 'norte': '650' },
            'curtaGlock': { 'sul': '550', 'centro': '450', 'norte': '600' },
            'longa': { 'sul': '530', 'centro': '680', 'norte': '680' },
        },
        '7': {
            'curta': { 'sul': '550', 'centro': '700', 'norte': '700' },
            'curtaGlock': { 'sul': '600', 'centro': '500', 'norte': '650' },
            'longa': { 'sul': '580', 'centro': '730', 'norte': '730' },
        },
        '8': {
            'curta': { 'sul': '600', 'centro': '750', 'norte': '750' },
            'curtaGlock': { 'sul': '650', 'centro': '550', 'norte': '700' },
            'longa': { 'sul': '630', 'centro': '780', 'norte': '780' },
        },
        '9': {
            'curta': { 'sul': '650', 'centro': '800', 'norte': '800' },
            'curtaGlock': { 'sul': '700', 'centro': '600', 'norte': '750' },
            'longa': { 'sul': '680', 'centro': '830', 'norte': '830' },
        },
        '10': {
            'curta': { 'sul': '700', 'centro': '850', 'norte': '850' },
            'curtaGlock': { 'sul': '750', 'centro': '650', 'norte': '800' },
            'longa': { 'sul': '730', 'centro': '880', 'norte': '880' },
        }
    };

    // Verificando o resultado
    if (resultados[quantidadeValor] && resultados[quantidadeValor][tipoValor] && resultados[quantidadeValor][tipoValor][destinoValor]) {
        result = resultados[quantidadeValor][tipoValor][destinoValor];
        resultado.style.display = 'flex';
    }
}
//VALIDAR SE ESTÁ PREENCHIDO ------------------------------------------------------------------------------------------------------
function validar() {
    let destino = document.getElementById('listaDestino');
    let origem = document.getElementById('listaOrigem');
    let resultado = document.getElementById('resultado'); // Definindo resultado

    let destinoValor = destino.options[destino.selectedIndex].value;
    let origemValor = origem.options[origem.selectedIndex].value;

    // Remover classes de erro e sucesso antes de validar
    resultado.classList.remove('alert-danger', 'alert-danger');
    resultado.style.display = 'none'; // Esconder resultado inicialmente

    // Validar entradas
    if (destinoValor === 'nada' && origemValor === 'nada') {
        resultado.classList.add('alert-danger');
        resultado.style.display = 'flex';
        resultado.innerHTML = 'Selecione as cidades de origem e destino.';
    } else if (origemValor === 'nada') {
        resultado.classList.add('alert-danger');
        resultado.style.display = 'flex';
        resultado.innerHTML = 'Selecione uma cidade de origem.';
    } else if (destinoValor === 'nada') {
        resultado.classList.add('alert-danger');
        resultado.style.display = 'flex';
        resultado.innerHTML = 'Selecione uma cidade de destino.';
    } else {
        resultado.classList.add('alert-success');
        resultado.style.display = 'flex';
        resultado.innerHTML = 'O valor estimado do seu frete é R$: ' + result + ',00';
    }
}

//BOTÃO LIMPAR ------------------------------------------------------------------------------------------------------
function limpar() {
    resultado.innerHTML = ''
    resultado.style.display = 'none'
}
//INSUMOS ------------------------------------------------------------------------------------------------------
document.getElementById("listaTipo").onchange = function trocartipo(){
    let listatipo = document.getElementById('listaTipo')
    let opcaotipo = listatipo.options[listatipo.selectedIndex].id
    if(opcaotipo === 'insumos'){
        window.location = '../calculadora-insumos/';
    }
    else(opcaotipo != 'insumos')
}
//MAIS DE 10 ------------------------------------------------------------------------------------------------------
document.getElementById("listaQuantidade").onchange = function trocarqtd(){
    let listaQuantidade = document.getElementById('listaQuantidade')
    let opcaoQuantidade = listaQuantidade.options[listaQuantidade.selectedIndex].id
    if(opcaoQuantidade === '10+'){resultado.innerHTML = 'Para poder calcular mais de 10 unidades, entre em contato com nossos atendentes'}
    else(opcaoQuantidade != '10+')
}


// CIDADES JSON
//   Carrega o arquivo JSON com as opções de cidades
  fetch('../artefatos/cidades.json')
    .then(response => response.json())
    .then(data => {
      const listaOrigem = document.getElementById('listaOrigem');

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
    });


  fetch('../artefatos/cidades.json')
    .then(response => response.json())
    .then(data => {
      const listaDestino = document.getElementById('listaDestino');

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

        listaDestino.appendChild(optgroup);
      });
    });

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