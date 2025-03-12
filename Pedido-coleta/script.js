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


function generateCaptcha() {
        const canvas = document.getElementById('captchaCanvas');
        const ctx = canvas.getContext('2d');
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        sessionStorage.setItem('captcha', code);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '20px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(code, 30, 25);
    }

    document.getElementById('startButton').addEventListener('click', function() {
        const captchaInput = document.getElementById('captchaInput').value;
        const captchaStored = sessionStorage.getItem('captcha');
        if (captchaInput === captchaStored) {
            avancar('tabColeta');
        } else {
            alert('Insira o codigo de verificação que está entre bordas vermelhas, no campo abaixo.');
            generateCaptcha();
        }
    });

window.onload = generateCaptcha;