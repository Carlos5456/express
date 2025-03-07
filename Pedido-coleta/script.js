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


// --------- PUXANDO HTML FORMULARIO COLETA --------
fetch('formulario-coleta/index.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o formulario favor entrar em contato pelo WhatsApp');
        }
        return response.text();
    })
    .then(dadosColetaData => {
        document.getElementById('dadosColeta').innerHTML = dadosColetaData;
    })
    .catch(error => console.error('Erro ao carregar o arquivo:', error));

// --------- PUXANDO HTML FORMULARIO DESTINO --------
fetch('formulario-destino/index.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o formulario favor entrar em contato pelo WhatsApp');
        }
        return response.text();
    })
    .then(dadosDestinoData => {
        document.getElementById('dadosDestinatario').innerHTML = dadosDestinoData;
    })
    .catch(error => console.error('Erro ao carregar o arquivo:', error));

// --------- PUXANDO HTML FORMULARIO PACOTE --------
fetch('formulario-pacote/index.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o formulario favor entrar em contato pelo WhatsApp');
        }
        return response.text();
    })
    .then(dadosPacoteData => {
        document.getElementById('pacote').innerHTML = dadosPacoteData;
    })
    .catch(error => console.error('Erro ao carregar o arquivo:', error));



// AVANÇAR PROXIMA TAB
    function avancar(proximoTab) {
        document.getElementById(proximoTab).disabled = false;
        document.getElementById(proximoTab).click();
    }


function handleSubmit() {
    // Verifica se o formulário de coleta foi enviado
    if (document.getElementById('dadosColeta').style.display !== 'none') {
        // Esconde os dados de coleta e mostra os dados do destinatário
        document.getElementById('dadosColeta').style.display = 'none';
        document.getElementById('dadosDestinatario').style.display = 'block';
        return false; // Previne o envio do formulário
    }
    
    // Se os dados do destinatário forem preenchidos, você pode enviar o formulário ou processar os dados aqui
    return true; // Permite o envio do formulário
}

