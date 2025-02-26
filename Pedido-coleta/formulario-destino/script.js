// CIDADES JSON
// Carrega o arquivo JSON com as opções de cidades
fetch('../artefatos/cidades.json')
.then(response => response.json())
.then(data => {
    const listaColeta = document.getElementById('listaOrigem');
    const listaDestinatario = document.getElementById('listaDestino');

    // Preenche o select de Cidade de Coleta
    data.groups.forEach(group => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = group.label;

        group.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.text = option.text;
            optgroup.appendChild(optionElement);
        });

        listaColeta.appendChild(optgroup);
    });

    // Preenche o select de Cidade de Destinatário
    data.groups.forEach(group => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = group.label;

        group.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.text = option.text;
            optgroup.appendChild(optionElement);
        });

        listaDestinatario.appendChild(optgroup);
    });
})
.catch(error => console.error('Erro ao carregar as cidades:', error));

function formatarTelefoneDest(input) {
    let tipo = document.getElementById(input.id === 'tel-1-dest' ? 'tipo-telefone-1-dest' : 'tipo-telefone-2-dest').value;
    let valor = input.value.replace(/\D/g, '');

    if (tipo === 'celular') {
        if (valor.length > 11) {
            valor = valor.slice(0, 11);
        }
        if (valor.length === 11) {
            input.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 3)} ${valor.slice(3, 7)}-${valor.slice(7)}`;
        } else if (valor.length > 2) {
            input.value = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
        } else if (valor.length > 0) {
            input.value = `(${valor.slice(0, 2)})`;
        } else {
            input.value = '';
        }
    } else {
        if (valor.length > 10) {
            valor = valor.slice(0, 10);
        }
        if (valor.length === 10) {
            input.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 6)}-${valor.slice(6)}`;
        } else if (valor.length > 2) {
            input.value = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
        } else if (valor.length > 0) {
            input.value = `(${valor.slice(0, 2)})`;
        } else {
            input.value = '';
        }
    }
}

function atualizarMascaraDest(id, tipo) {
    const input = document.getElementById(id);
    input.value = ''; // Limpar o campo ao trocar o tipo
    input.placeholder = tipo === 'celular' ? "(11) 9 8888-8888" : "(11) 0000-0000";
}

function avancarDest(proximoTab) {
    document.getElementById(proximoTab).disabled = false;
    document.getElementById(proximoTab).click();
}

function atualizarMascaraDocumentoDest(inputId, tipo) {
    const input = document.getElementById(inputId);
    const nomeEmpresaContainer = document.getElementById('nome-empresa-container-dest');

    if (tipo === 'cpf') {
        input.placeholder = '___.___.___-__';
        input.maxLength = 14; // CPF: 11 dígitos + 3 pontos + 1 traço
        nomeEmpresaContainer.style.display = 'none'; // Oculta o campo de nome da empresa
    } else if (tipo === 'cnpj') {
        input.placeholder = '__.___.___/____-__';
        input.maxLength = 18; // CNPJ: 14 dígitos + 2 pontos + 1 barra + 1 traço
        nomeEmpresaContainer.style.display = 'flex'; // Mostra o campo de nome da empresa
    }
    input.value = ''; // Limpa o campo ao mudar o tipo
    document.getElementById('nome-empresa-dest').value = ''; // Limpa o campo de nome da empresa
}

function formatarDocumentoDest(input) {
    const tipo = document.getElementById('tipo-doc-1-dest').value;
    let value = input.value.replace(/\D/g, ''); // Remove tudo que não é dígito

    if (tipo === 'cpf') {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else if (tipo === 'cnpj') {
        value = value.replace(/^(\d{2})(\d)/, '$1.$2');
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }

    input.value = value;

    // Chama a função buscarNomeEmpresaDest se CNPJ for válido
    if (tipo === 'cnpj' && value.length === 18) {
        buscarNomeEmpresaDest(value.replace(/\D/g, '')); // Chama a função com o CNPJ formatado
    }
}

function buscarNomeEmpresaDest(cnpj) {
    // Exemplo de chamada de API (substitua pela API real)
    const url = `https://minhareceita.org/${cnpj}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.razao_social) {
                razaoSocial = data.razao_social; // Armazena a razão social
                nomeFantasia = data.nome_fantasia; // Armazena o nome fantasia
                document.getElementById('nome-empresa-dest').value = razaoSocial; // Preenche o campo com a razão social
            } else {
                alert('Empresa não encontrada.');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar nome da empresa:', error);
            alert('Erro ao buscar nome da empresa.');
        });
}

function alternarNomeDest() {
    usandoNomeFantasia = !usandoNomeFantasia; // Alterna a flag
    document.getElementById('nome-empresa-dest').value = usandoNomeFantasia ? nomeFantasia : razaoSocial; // Altera o valor do campo
    document.querySelector('label[for="nome-empresa-dest"]').innerText = usandoNomeFantasia ? "Nome Fantasia:" : "Razão Social:"; // Altera o label
}