function showHide(id) {
    const conteudo = document.querySelector(id);
    conteudo.classList.toggle('ativo');
}

function toggleExpand(idPrefix) {
    const expandir = document.getElementById(`expandir_${idPrefix}`);
    const recolher = document.getElementById(`recolher_${idPrefix}`);
    const conteudo = document.querySelector(`#${idPrefix}`);

    if (conteudo.classList.contains('ativo')) {
        recolher.style.display = 'inline';
        expandir.style.display = 'none';
    } else {
        expandir.style.display = 'inline';
        recolher.style.display = 'none';
    }
}

function expandirEstados() {
    const estados = ["RS", "SC", "PR", "SP", "MG", "GO", "DF", "MT", "MS", "RO"];
    estados.forEach(estado => toggleExpand(estado));
}

function getNumber(str) {
    return +str.textContent.match(/\d/g).join('');
}

function ordemAlfabética(id) {
    const list = document.querySelector(id);
    const listChildren = Array.from(list.children)
        .map(item => item.textContent)
        .sort();
    list.innerHTML = listChildren.map(item => `<li>${item}</li>`).join('');
}

function adicionarCidadesAoEstado(estadoLabel, listaId) {
    const listaUl = document.querySelector(listaId);
    listaUl.innerHTML = ""; // Limpa a lista

    const estado = estadoLabel.split(" ")[2]; // Extrai o código do estado

    fetch("../artefatos/cidades.json")
        .then(response => response.json())
        .then(data => {
            const cidades = data.groups
                .find(grupo => grupo.label === estadoLabel)?.options.map(option => option.text) || [];

            cidades.sort(); // Ordena as cidades

            cidades.forEach(cidade => {
                const li = document.createElement("li");
                li.textContent = cidade;
                listaUl.appendChild(li); // Adiciona cidade à lista
            });
        })
        .catch(error => {
            console.error("Erro ao carregar o arquivo JSON:", error);
        });
}

// Exemplo de uso
const estados = [
    "📌RIO GRANDE DO SUL (RS)", 
    "📌SANTA CATARINA (SC)", 
    "📌PARANÁ (PR)", 
    "📌SÃO PAULO (SP)", 
    "📌MINAS GERAIS (MG)", 
    "📌GOIAS (GO)", 
    "📌DISTRITO FEDERAL (DF)", 
    "📌MATO GROSSO (MT)", 
    "📌MATO GROSSO DO SUL (MS)", 
    "📌RONDÔNIA (RO)"
];

estados.forEach((estado, index) => {
    adicionarCidadesAoEstado(estado, `#lista_${['rs', 'sc', 'pr', 'sp', 'mg', 'go', 'df', 'mt', 'ms', 'ro'][index]}`);
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