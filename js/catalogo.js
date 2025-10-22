document.addEventListener('DOMContentLoaded', () => {
    // Caminho para o arquivo JSON (pasta data)
    const url = 'data/dados.json';
    
    // Referência ao <tbody> da tabela
    const corpoTabela = document.getElementById('corpoCatalogo');

    // Limpa o estado inicial de "Carregando..."
    corpoTabela.innerHTML = '';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                // Se o arquivo não for encontrado (404) ou houver outro erro
                throw new Error(`Erro ao carregar o arquivo: ${response.status} ${response.statusText}. 
                                 Verifique se o arquivo dados.json está na pasta 'data'.`);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                const tr = document.createElement('tr');
                tr.innerHTML = '<td colspan="3">O arquivo JSON está vazio ou inválido.</td>';
                corpoTabela.appendChild(tr);
                return;
            }

            // Itera sobre cada objeto (filme) no JSON
            data.forEach(filme => {
                const tr = document.createElement('tr');
                
                // 1. Célula do Cartaz (com a tag <img>)
                const celulaCartaz = document.createElement('td');
                celulaCartaz.innerHTML = `
                    <img src="${filme.imagemCaminho}" 
                         alt="${filme.imagemAlt}"
                         width="70">
                `;
                tr.appendChild(celulaCartaz);

                // 2. Célula do Título
                const celulaTitulo = document.createElement('td');
                celulaTitulo.textContent = filme.titulo;
                tr.appendChild(celulaTitulo);

                // 3. Célula do Gênero
                const celulaGenero = document.createElement('td');
                celulaGenero.textContent = filme.genero;
                tr.appendChild(celulaGenero);

                // Adiciona a linha completa ao corpo da tabela
                corpoTabela.appendChild(tr);
            });
        })
        .catch(error => {
            // Exibe a mensagem de erro no console e na tabela
            console.error('Erro de Carregamento:', error);
            corpoTabela.innerHTML = `<tr><td colspan="3">Falha ao carregar o catálogo. 
                                     Detalhe: ${error.message}</td></tr>`;
        });
});