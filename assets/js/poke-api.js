<<<<<<< HEAD
const pokeApi = {}; // Para funcionar, deverá ser importado antes do main.js

// Função que trata os dados brutos da Poke API para um objeto tratado
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id; // Corrigido para usar a propriedade correta da API
    pokemon.name = pokeDetail.name; // Nome do Pokémon

    // Mapeia os tipos de Pokémon para uma lista de strings
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types

    pokemon.type = type
    pokemon.types = types; // Atribui os tipos ao objeto Pokémon

    // Define a foto do Pokémon
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon; // Retorna o Pokémon tratado
}

// Função que obtém os detalhes de um Pokémon individualmente
pokeApi.getPokemonsDetails = (pokemon) => {
    return fetch(pokemon.url) // Faz a requisição para obter os detalhes do Pokémon
        .then((response) => response.json()) // Converte a resposta para JSON
        .then(convertPokeApiDetailToPokemon); // Converte os dados brutos para o formato tratado
};

// Função que abstrai o consumo do HTTP GET e retorna a lista de Pokémon
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    // URL da API com os parâmetros offset e limit
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    // Fazendo a requisição para "pegar" os Pokémon
    return fetch(url)
        .then((response) => response.json()) // Converte a resposta para JSON
        .then((jsonBody) => jsonBody.results) // Dentro do JSON, pega o atributo results (lista de Pokémon)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails)) // Mapeia os resultados e obtém os detalhes individuais
        .then((detailRequests) => Promise.all(detailRequests)) // Aguarda todas as promessas serem resolvidas
        .catch((error) => {
            console.error("Erro ao buscar Pokémon:", error); // Exibe o erro no console, se houver
            return []; // Retorna um array vazio em caso de erro
        });
};

=======

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
>>>>>>> 627a1ca6aebeb81b88429225fe0a5754e6a58a33
