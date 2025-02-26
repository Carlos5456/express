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