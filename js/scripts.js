// When the user scrolls down, hide the navbar and show toTop button.

window.onscroll = function () {
  const scrolled = window.scrollY;
  const toTopButton = document.getElementById("toTop");
  const hideHeader = document.getElementById("hide-header");
  const fadeTime = 250;
  if (scrolled === 0) {
    hideHeader.style.top = "0";
  } else if (scrolled > 10) {
    hideHeader.style.top = "-100vh";
  }
  if (scrolled > 200) {
    toTopButton.classList.add("fadeIn");
    toTopButton.classList.remove("fadeOut");
    setTimeout(() => { toTopButton.style.display = "block"; }, fadeTime);
  } else if (scrolled < 200) {
    toTopButton.classList.remove("fadeIn");
    toTopButton.classList.add("fadeOut");
    setTimeout(() => { toTopButton.style.display = "none"; }, fadeTime);
  }
};

// When the user clicks on the toTop button, scroll to the top of the document
// eslint-disable-next-line
function toTopFunction() {
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Definition of the Pokémon Repository

const pokemonRepository = (() => {
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  const popupContainer = document.querySelector("#popup-container");
  const pokemonList = [];

  // Add a Pokémon

  function add(pokemon) {
    if (typeof pokemon !== "object") {
      console.log("The new Pokémon should have the form of an object");
    } else if (!("name" in pokemon && "detailsUrl" in pokemon)) {
      console.log(
        "The object should have the following properties: name, detailsUrl",
      );
    } else pokemonList.push(pokemon);
  }

  // Get all Pokémon from pokemonList

  function getAll() {
    return pokemonList;
  }

  // Create a button in the for each Pokémon within pokemonList

  function addListItem(Pokemon) {
    const list = document.getElementById("pokemon-list");
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    listItem.classList.add("pokemon-list__item");
    button.innerText = Pokemon.name;
    button.classList.add("pokemon-list__item--button");
    listItem.appendChild(button);
    list.appendChild(listItem);
    button.addEventListener("click", () => {
      showDetails(Pokemon);
    });
  }

  // Get Pokémon data from API

  async function loadList() {
    showLoader();
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      data.results.forEach((item) => {
        const pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
      hideLoader();
    } catch (e) {
      console.error(e);
    }
  }

  // Get Pokémon details from API

  async function loadDetails(itemDetails) {
    const url = itemDetails.detailsUrl;
    const pokemon = itemDetails;
    showLoader();
    try {
      const response = await fetch(url);
      const data = await response.json();
      const {
        sprites, abilities, height, types, weight,
      } = data;

      pokemon.imageUrl = sprites.other.dream_world.front_default;
      pokemon.abilities = [];
      for (let i = 0; i < abilities.length; i++) {
        pokemon.abilities.push(` ${abilities[i].ability.name}`);
      }
      pokemon.height = height;
      pokemon.types = [];
      for (let i = 0; i < types.length; i++) {
        pokemon.types.push(` ${types[i].type.name}`);
      }
      pokemon.weight = weight;
      hideLoader();
    } catch (e) {
      console.error(e);
    }
  }

  // Show details of Pokémon

  function showDetails(item) {
    loadDetails(item).then(() => {
      showPopup(item);
    });
  }

  // Show popup with Pokémon details

  function showPopup(item) {
    popupContainer.innerHTML = "";
    popupContainer.classList.add("fadeIn");

    const popup = document.createElement("div");
    const closeButton = document.createElement("button");
    const popupImage = document.createElement("img");
    const popupHeading = document.createElement("h1");
    const popupContent = document.createElement("p");
    popup.classList.add("popup", "zoomIn");
    closeButton.innerHTML = "&times";
    closeButton.style.fontSize = "24px";
    popupImage.src = item.imageUrl;
    popupImage.classList.add("zero-opacity");
    popupImage.onload = function () {
      popupImage.classList.remove("zero-opacity");
    };
    popupImage.alt = "Picture of selected Pokémon";
    popupImage.width = 300;
    popupImage.height = 300;
    popupHeading.innerText = item.name;
    popupContent.innerHTML = `
      <p class="block-level capitalize"><b>Abilities: </b>${item.abilities}</p>
      <p class="block-level capitalize"><b>Types: </b>${item.types}</p>
      <p class="block-level"><b>Height: </b>${item.height}0 cm</p>
      <p class="block-level"><b>Weight: </b>${item.weight}00 g</p>
      `;
    popupContainer.appendChild(popup);
    popup.appendChild(closeButton);
    popup.appendChild(popupImage);
    popup.appendChild(popupHeading);
    popup.appendChild(popupContent);

    popupContainer.classList.add("is-visible");

    // Possibilities to close the popup

    closeButton.addEventListener("click", hidePopup);
    window.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape"
        && popupContainer.classList.contains("is-visible")
      ) {
        hidePopup();
      }
    });
    window.addEventListener("click", (e) => {
      const { target } = e;
      if (target === popupContainer) {
        hidePopup();
      }
    });
  }

  // Hide popup

  function hidePopup() {
    const popup = document.querySelector(".popup");
    popupContainer.classList.add("fadeOut");
    popupContainer.classList.remove("fadeIn");
    popup.classList.remove("zoomIn");
    popup.classList.add("zoomOut");
    popup.addEventListener("animationend", () => {
      popupContainer.classList.remove("is-visible", "fadeOut");
    });
  }

  // Loader animations

  function showLoader() {
    const loader = document.querySelector("body");
    loader.style.cursor = "progress";
  }

  function hideLoader() {
    const loader = document.querySelector("body");
    loader.style.cursor = "default";
  }

  return {
    getAll,
    addListItem,
    loadList,
  };
})();

// List the Pokémon Buttons in DOM

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});

// Search Bar

// eslint-disable-next-line
function search(reset) {
  const input = reset ? "" : document.getElementById("searchBar").value.toLowerCase();
  const allPokemon = document.getElementsByClassName("pokemon-list__item");
  console.log(allPokemon);

  for (let i = 0; i < allPokemon.length; i++) {
    if (allPokemon[i].innerText.toLowerCase().includes(input)) {
      allPokemon[i].classList.remove("hide");
    } else {
      allPokemon[i].classList.add("hide");
    }
  }
}
