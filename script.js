const pokedex = document.querySelector(".row");
const baseURL = 'https://pokeapi.co/api/v2/pokemon/';

function fetchPokemonData() {
  for (let id = 387; id <= 493; id++) {
    const url = `${baseURL}${id}`;
    fetch(url)
      .then(res => res.json())
      .then(pokemonData => {
        console.log(pokemonData)
        pokedex.innerHTML += `
          <div class="col-12 col-sm-12 col-md-4 col-lg-3 d-flex flex-column align-items-center">
            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}"/>
            <p>Pokemon: ${pokemonData.name.toUpperCase()}</p>
            <p>Type: ${pokemonData.types[0].type.name}</p>
          </div>
        `;
      })
      .catch(error => {
        console.error(`Error fetching data for Pokemon with ID ${id}:`, error);
      });
  }
}

fetchPokemonData();
