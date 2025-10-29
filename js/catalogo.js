const tabelaCorpo = document.getElementById('corpo-tabela-filmes');
const urlDados = 'data/catalogo.json';

function carregarCatalogoJSON() {

    fetch(urlDados)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar dados: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            renderizarFilmes(data);
        })
        .catch(error => {
            console.error('Houve um erro ao carregar o catálogo:', error);
            tabelaCorpo.innerHTML = `<tr><td colspan="3">Erro ao carregar os filmes.</td></tr>`;
        });
}

function renderizarFilmes(filmes) {

    let htmlFilmes = '';

    filmes.forEach(filme => {
        htmlFilmes += ` 
                    <tr> 
                        <td><img src="${filme.imagem.src}" alt="${filme.imagem.alt}" width="70"></td> 
                        <td>${filme.titulo}</td> 
                        <td>${filme.genero}</td> 
                    </tr> 
                `;
    });

    tabelaCorpo.innerHTML = htmlFilmes;

}

// 4. Inicia o carregamento 
carregarCatalogoJSON(); 