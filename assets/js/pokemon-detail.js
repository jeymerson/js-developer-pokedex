document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const pokemonId = params.get("id");

    if (pokemonId) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then((response) => response.json())
            .then((data) => {
                // Atualiza os dados da tabela
                document.querySelector("thead th").innerText = `Pokémon: ${data.name}`;

                // Adiciona a classe do tipo ao th
                const thElement = document.querySelector("thead th");
                if (thElement) {
                    const firstType = data.types[0].type.name;
                    thElement.classList.add(firstType); // Adiciona a classe do tipo ao <th>
                }

                // Atualiza as informações da tabela
                document.querySelector("tbody").innerHTML = `
                    <tr>
                        <td>ID</td>
                        <td>${data.id}</td>
                    </tr>
                    <tr>
                        <td>Nome</td>
                        <td>${data.name}</td>
                    </tr>
                    <tr>
                        <td>Altura</td>
                        <td>${(data.height / 10).toFixed(1)} m</td>
                    </tr>
                    <tr>
                        <td>Peso</td>
                        <td>${(data.weight / 10).toFixed(1)} kg</td>
                    </tr>
                    <tr>
                        <td>Tipos</td>
                        <td>${data.types.map((t) => t.type.name).join(", ")}</td>
                    </tr>
                    <tr>
                        <td>Habilidades</td>
                        <td>${data.abilities
                            .map((a) => a.ability.name)
                            .join(", ")}</td>
                    </tr>
                    <tr>
                        <td>Estatísticas</td>
                        <td>
                            <ul>
                                ${data.stats
                                    .map(
                                        (s) =>
                                            `<li>${s.stat.name}: ${s.base_stat}</li>`
                                    )
                                    .join("")}
                            </ul>
                        </td>
                    </tr>
                    <tr class="sprite">
                        <td>Imagem</td>
                        <td>
                            <img src="${data.sprites.front_default}" alt="${data.name}">
                        </td>
                    </tr>
                `;

                // Pega o primeiro tipo do Pokémon
                const firstType = data.types[0].type.name;

                // Pega o elemento 'detailImage'
                const detailImageContainer = document.querySelector("#detailImage");

                // Adiciona a classe com o tipo ao elemento 'detailImage'
                if (detailImageContainer) {
                    detailImageContainer.classList.add(firstType);
                }

                // Pega a imagem do Pokémon a partir de 'dream_world'
                const dreamWorldImage = data.sprites.other.dream_world.front_default;

                // Atualiza a imagem do Pokémon no detailImage
                const pokemonImageElement = document.querySelector(".pokemon__img");
                if (pokemonImageElement && dreamWorldImage) {
                    pokemonImageElement.src = dreamWorldImage;
                    pokemonImageElement.alt = data.name;
                }
            })
            .catch((error) => console.error("Erro ao carregar detalhes:", error));
    } else {
        alert("Nenhum Pokémon selecionado!");
    }
});
