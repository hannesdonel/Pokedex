// When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar.

window.onscroll = function () {
  const scrolled = window.scrollY;
  if ((scrolled === 0)) {
    document.getElementById("hide-header").style.top = "0";
  } else {
    document.getElementById("hide-header").style.top = "-100vh";
  }
};

// Definition of the Pokémon Repository

const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  const popupContainer = document.querySelector("#popup-container");

  // Add a Pokémon

  function add(pokemon) {
    if (typeof pokemon !== "object") {
      alert("The new Pokémon should have the form of an object");
    } else if (
      JSON.stringify(Object.keys(pokemon))
      !== JSON.stringify(["name", "detailsUrl"])
    ) {
      alert(
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
    const $list = document.querySelector(".pokemon-list");
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    listItem.classList.add("pokemon-list__item");
    button.innerText = Pokemon.name;
    button.classList.add("pokemon-list__item--button");
    listItem.appendChild(button);
    $list.appendChild(listItem);
    button.addEventListener("click", () => {
      showDetails(Pokemon);
    });
  }

  // Get Pokémon data from API

  function loadList() {
    showLoader();
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((item) => {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch((e) => {
        console.error(e);
      })
      .finally((e) => {
        hideLoader(e);
      });
  }

  // Get Pokémon details from API

  function loadDetails(itemDetails) {
    const url = itemDetails.detailsUrl;
    const pokemon = itemDetails;
    showLoader();
    return fetch(url)
      .then((response) => response.json())
      .then((details) => {
        pokemon.imageUrl = details.sprites.other.dream_world.front_default;
        pokemon.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          pokemon.abilities.push(` ${details.abilities[i].ability.name}`);
        }
        pokemon.height = details.height;
        pokemon.types = [];
        for (let i = 0; i < details.types.length; i++) {
          pokemon.types.push(` ${details.types[i].type.name}`);
        }
        pokemon.weight = details.weight;
      })
      .catch((e) => {
        console.error(e);
      })
      .finally((e) => {
        hideLoader(e);
      });
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
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
    showDetails,
  };
}());

// List the Pokémon Buttons in DOM

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
