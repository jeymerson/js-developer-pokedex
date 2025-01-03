const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 5;
let offset = 0;

const maxRecords = 15;
// "Pegando" a lista HTML onde os Pokémon serão inseridos
const pokemonList = document.getElementById('pokemonList');
// Função que converte os detalhes de um Pokémon em uma estrutura HTML



// Transformando uma lista de Pokémon em HTML
function loadPokemonItens(offset, limit) {
       pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon =>
            `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span> <!-- Exibe o número do Pokémon -->
                <span class="name">${pokemon.name}</span> <!-- Exibe o nome do Pokémon -->
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')} <!-- Converte os tipos em uma lista -->
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}"> <!-- Exibe a imagem do Pokémon -->
                </div>
            </li>
        `
        )).join(''); // Mapeia os Pokémon para HTML e junta tudo
        pokemonList.innerHTML += newHtml; // Insere na lista HTML
    });
}
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordWithNexPage = offset + limit

    if(qtdRecordWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
        
    } else {
         loadPokemonItens(offset, limit)
    }
    

}
)