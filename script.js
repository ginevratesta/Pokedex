const pokedex = document.querySelector("#poke-carousel");
const display = document.querySelector(".img-box");
const baseURL = "https://pokeapi.co/api/v2/pokemon/";
let currentImageURL = "";
let currentIndex = 0;

function updateDisplay(imageURL) {
  display.innerHTML = `<img class="w-100 h-100" src="${imageURL}" alt="Selected Pokemon"/>`;
  currentImageURL = imageURL;
}

function setActiveCard(card) {
  const allCards = document.querySelectorAll(".poke-card");
  allCards.forEach((c) => c.classList.remove("selected"));
  card.classList.add("selected");
}

function fetchPokemonData() {
  for (let id = 387; id <= 493; id++) {
    const url = `${baseURL}${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((pokemonData) => {
        pokedex.innerHTML += `
          <div class="poke-card d-flex align-items-center px-3 mb-2" data-image="${
            pokemonData.sprites.front_default
          }" data-index="${id - 387}">
            <div class="carousel-pokeball me-3">
              <img class="w-100 h-100" src="./assets/red-poke.png" alt"red pokeball"/>
            </div>
            <div class="carousel-img me-3">
              <img class="w-100 h-100" src="${
                pokemonData.sprites.front_default
              }" alt="${pokemonData.name}"/>
            </div>
            <div>
              <p class="pt-3">${pokemonData.name.toUpperCase()}</p>
            </div>
          </div>
        `;

        const pokeCards = document.querySelectorAll(".poke-card");
        pokeCards.forEach((card) => {
          card.addEventListener("click", () => {
            const imageURL = card.getAttribute("data-image");
            updateDisplay(imageURL);
            setActiveCard(card);
          });
        });

        if (id === 387) {
          updateDisplay(pokemonData.sprites.front_default);
          setActiveCard(pokeCards[0]);
        }
      })
      .catch((error) => {
        console.error(`Error fetching data for Pokemon with ID ${id}:`, error);
      });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      if (currentIndex > 0) {
        currentIndex -= 1;
        const prevCard = document.querySelector(
          `[data-index="${currentIndex}"]`
        );
        const imageURL = prevCard.getAttribute("data-image");
        updateDisplay(imageURL);
        setActiveCard(prevCard);
      }
    } else if (e.key === "ArrowDown") {
      if (currentIndex < 106) {
        currentIndex += 1;
        const nextCard = document.querySelector(
          `[data-index="${currentIndex}"]`
        );
        const imageURL = nextCard.getAttribute("data-image");
        updateDisplay(imageURL);
        setActiveCard(nextCard);
      }
    }
  });
}

fetchPokemonData();
