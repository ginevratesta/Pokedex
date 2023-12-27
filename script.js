const pokedex = document.querySelector("#poke-carousel");
const display = document.querySelector(".img-box");
const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
let currentImageURL = ''; // Variable to track the current displayed image URL
let currentIndex = 0; // Variable to track the current index of the displayed card

// Function to update the display with the selected Pokémon image
function updateDisplay(imageURL) {
  display.innerHTML = `<img class="w-100 h-100" src="${imageURL}" alt="Selected Pokemon"/>`;
  currentImageURL = imageURL;
}

function fetchPokemonData() {
  for (let id = 387; id <= 493; id++) {
    const url = `${baseURL}${id}`;
    fetch(url)
      .then(res => res.json())
      .then(pokemonData => {
        pokedex.innerHTML += `
          <div class="poke-card d-flex align-items-center px-3 mb-2" data-image="${pokemonData.sprites.front_default}" data-index="${id - 387}">
            <div class="carousel-pokeball me-3">
              <img class="w-100 h-100" src="./assets/red-poke.png" alt"red pokeball"/>
            </div>
            <div class="carousel-img me-3">
              <img class="w-100 h-100" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}"/>
            </div>
            <div>
              <p class="pt-3">${pokemonData.name.toUpperCase()}</p>
            </div>
          </div>
        `;

        const pokeCards = document.querySelectorAll('.poke-card');
        pokeCards.forEach(card => {
          card.addEventListener('click', () => {
            const imageURL = card.getAttribute('data-image');
            updateDisplay(imageURL);
          });
        });

        if (id === 387) {
          updateDisplay(pokemonData.sprites.front_default);
        }
      })
      .catch(error => {
        console.error(`Error fetching data for Pokemon with ID ${id}:`, error);
      });
  }

  // Adding keyboard event listener for navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp') {
      // Logic to navigate up (display previous card)
      if (currentIndex > 0) {
        currentIndex -= 1;
        const prevCard = document.querySelector(`[data-index="${currentIndex}"]`);
        const imageURL = prevCard.getAttribute('data-image');
        updateDisplay(imageURL);
      }
    } else if (e.key === 'ArrowDown') {
      // Logic to navigate down (display next card)
      if (currentIndex < 106) {
        currentIndex += 1;
        const nextCard = document.querySelector(`[data-index="${currentIndex}"]`);
        const imageURL = nextCard.getAttribute('data-image');
        updateDisplay(imageURL);
      }
    }
  });
}

fetchPokemonData();
