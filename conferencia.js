// ==========================================
// CONFERÊNCIA - BUSCA POR NOTA FISCAL
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    const inputNF = document.getElementById('inputInserirNf');
    const tabela = document.getElementById('tabelaConferencia');
    const btnSalvar = document.getElementById('btnSalvarConf');
    
    if (!inputNF) {
        console.warn('⚠️ Campo de NF não encontrado');
        return;
    }
    
    // ==========================================
    // DIGITAR A NF - BUSCA AUTOMÁTICA
    // ==========================================
    inputNF.addEventListener('change', function(e) {
        let valor = e.target.value.trim();
        
        // Se for uma chave de 44 dígitos, extrai os 7 dígitos da NF
        if (valor.length === 44) {
            valor = valor.substring(27, 34);
            e.target.value = valor;
        }
        
        if (valor === '') {
            limparTudoConferencia();
            return;
        }
        
        realizarBuscaFinal(valor);
    });
    
    // ==========================================
    // BOTÃO SALVAR CONFERÊNCIA
    // ==========================================
    if (btnSalvar) {
        btnSalvar.addEventListener('click', function() {
            // Pega os dados da tabela
            const linhas = document.querySelectorAll('#tabelaConferencia tr');
            const dadosSalvos = [];
            
            linhas.forEach(function(linha) {
                const celulas = linha.querySelectorAll('td');
                if (celulas.length >= 7 && celulas[0].textContent !== '--') {
                    dadosSalvos.push({
                        produto: celulas[0].textContent,
                        descricao: celulas[1].textContent,
                        numeroNF: celulas[2].textContent,
                        serial: celulas[3].textContent,
                        bipagem: celulas[4].textContent,
                        cliente: celulas[5].textContent,
                        fornecimento: celulas[6].textContent
                    });
                }
            });
            
            if (dadosSalvos.length === 0) {
                alert('⚠️ Nenhum dado para salvar!');
                return;
            }
            
            // Salva os dados
            salvarBaseConferencia(dadosSalvos);
            alert(`✅ ${dadosSalvos.length} registros salvos com sucesso!`);
        });
    }
});

// ==========================================
// FUNÇÃO: REALIZAR BUSCA DA NF
// ==========================================
function realizarBuscaFinal(numeroNF) {
    // Busca os dados atualizados vindos do upload armazenado
    const bancoDeDadosUpload = obterBaseConferencia();
    
    if (bancoDeDadosUpload.length === 0) {
        alert("⚠️ Nenhum arquivo de conferência foi importado via Upload ainda!");
        limparTudoConferencia();
        return;
    }
    
    // Filtra os dados da base pelo número da NF informado
    const dadosNF = bancoDeDadosUpload.filter(function(item) {
        return String(item.numeroNF) === String(numeroNF) || String(item.nf) === String(numeroNF);
    });
    
    // Se não encontrar nenhum registro para essa NF
    if (dadosNF.length === 0) {
        alert(`❌ Nota Fiscal ${numeroNF} não encontrada na base de dados!`);
        document.getElementById("inputInserirNf").value = "";
        document.getElementById("inputInserirNf").focus();
        limparTudoConferencia();
        return;
    }
    
    // Renderiza os registros encontrados na tabela da tela de Conferência
    renderizarTabelaConferencia(dadosNF);
}

// ==========================================
// FUNÇÃO: RENDERIZAR TABELA DE CONFERÊNCIA
// ==========================================
function renderizarTabelaConferencia(dados) {
    const tabela = document.getElementById('tabelaConferencia');
    
    if (!tabela) return;
    
    if (dados.length === 0) {
        tabela.innerHTML = `<tr><td class="td-gray-bg">--</td><td class="td-gray-bg">--</td><td class="td-gray-bg">--</td><td class="td-gray-bg">--</td><td class="td-gray-bg">--</td><td>--</td><td>--</td></tr>`;
        atualizarContadoresConferencia(0, 0);
        return;
    }
    
    let html = '';
    dados.forEach(function(item) {
        html += `
            <tr>
                <td class="td-gray-bg">${item.produto || '--'}</td>
                <td class="td-gray-bg">${item.descricao || '--'}</td>
                <td class="td-gray-bg">${item.numeroNF || item.nf || '--'}</td>
                <td class="td-gray-bg">${item.serial || '--'}</td>
                <td class="td-gray-bg">${item.bipagem || '--'}</td>
                <td>${item.cliente || '--'}</td>
                <td>${item.fornecimento || '--'}</td>
            </tr>
        `;
    });
    
    tabela.innerHTML = html;
    
    // Atualiza os contadores
    const total = dados.length;
    const conferidos = dados.filter(function(item) {
        return item.bipagem && item.bipagem !== '';
    }).length;
    atualizarContadoresConferencia(total, conferidos);
}

// ==========================================
// FUNÇÃO: LIMPAR TELA DE CONFERÊNCIA
// ==========================================
function limparTudoConferencia() {
    document.getElementById('inputInserirNf').value = '';
    document.getElementById('inputHoraInicial').value = '';
    document.getElementById('inputHoraFinal').value = '';
    document.getElementById('valQtdTotal').textContent = '0';
    document.getElementById('valQtdConferida').textContent = '0';
    
    const tabela = document.querySelector('#tabelaConferencia');
    if (tabela) {
        tabela.innerHTML = `<tr><td class="td-gray-bg">--</td><td class="td-gray-bg">--</td><td class="td-gray-bg">--</td><td class="td-gray-bg">--</td><td class="td-gray-bg">--</td><td>--</td><td>--</td></tr>`;
    }
}

// ==========================================
// FUNÇÃO: ATUALIZAR CONTADORES
// ==========================================
function atualizarContadoresConferencia(total, conferido) {
    document.getElementById('valQtdTotal').textContent = total;
    document.getElementById('valQtdConferida').textContent = conferido;
}