<<<<<<< HEAD
=======
// When the user scrolls down, hide the navbar and show toTop button.

window.onscroll = function () {
  const scrolled = window.scrollY;
  const toTopButton = document.getElementById("toTop");
  if (scrolled === 0) {
    document.getElementById("hide-header").style.top = "0";
  } else if (scrolled > 0) {
    document.getElementById("hide-header").style.top = "-100vh";
  } if (scrolled > 200) {
    toTopButton.classList.add("fadeIn");
    toTopButton.classList.remove("fadeOut");
    setTimeout(() => { toTopButton.style.display = "block"; }, 250);
  } else if (scrolled < 200) {
    toTopButton.classList.remove("fadeIn");
    toTopButton.classList.add("fadeOut");
    setTimeout(() => { toTopButton.style.display = "none"; }, 250);
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

>>>>>>> main
// Definition of the Pokémon Repository

const pokemonRepository = (function () {
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  const popupContainer = document.querySelector("#popup-container");
  const pokemonList = [];

  // Add a Pokémon

  function add(pokemon) {
    if (typeof pokemon !== "object") {
      alert("The new Pokémon should have the form of an object");
    } else if (!("name" in pokemon && "detailsUrl" in pokemon)) {
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
<<<<<<< HEAD
    let $list = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    listItem.classList.add(
      "pokemon-list__item",
      "list-group-item",
      "bg-transparent",
      "border-0"
    );
=======
    const $list = document.querySelector(".pokemon-list");
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    listItem.classList.add("pokemon-list__item");
>>>>>>> main
    button.innerText = Pokemon.name;
    button.classList.add("btn", "btn-lg", "btn-danger");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#popup-container");
    listItem.appendChild(button);
    $list.appendChild(listItem);
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
<<<<<<< HEAD

    let popup = document.createElement("div");
    let popupHeader = document.createElement("div");
    let popupContent = document.createElement("div");
    let closeButton = document.createElement("button");
    let popupHeading = document.createElement("h1");
    let popupBody = document.createElement("div");
    let popupImage = document.createElement("img");
    popup.classList.add("modal-dialog", "modal-dialog-centered");
    popup.setAttribute("role", "document");
    popupHeader.classList.add("modal-header", "border-0");
    closeButton.classList.add("close");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("data-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    closeButton.innerText = "X";
    popupHeading.classList.add("modal-title", "capitalize");
    popupHeading.innerText = item.name;
    popupContent.classList.add("modal-content", "align-items-center");
=======
    popupContainer.classList.add("fadeIn");

    const popup = document.createElement("div");
    const closeButton = document.createElement("button");
    const popupImage = document.createElement("img");
    const popupHeading = document.createElement("h1");
    const popupContent = document.createElement("p");
    popup.classList.add("popup", "zoomIn");
    closeButton.innerHTML = "&times";
    closeButton.style.fontSize = "24px";
>>>>>>> main
    popupImage.src = item.imageUrl;
    popupImage.alt = "Picture of selected Pokémon";
    popupImage.width = 300;
    popupImage.height = 300;
<<<<<<< HEAD
    popupBody.innerHTML = `
      <p class="block-level"><span class="capitalize"><b>Abilities: </b>${item.abilities}</span></p>
      <p class="block-level"><span class="capitalize"><b>Types: </b>${item.types}</span></p>
=======
    popupHeading.innerText = item.name;
    popupContent.innerHTML = `
      <p class="block-level capitalize"><b>Abilities: </b>${item.abilities}</p>
      <p class="block-level capitalize"><b>Types: </b>${item.types}</p>
>>>>>>> main
      <p class="block-level"><b>Height: </b>${item.height}0 cm</p>
      <p class="block-level"><b>Weight: </b>${item.weight}00 g</p>
      `;

    popupContainer.appendChild(popup);
    popup.appendChild(popupContent);
    popupContent.appendChild(popupHeader);
    popupHeader.appendChild(popupHeading);
    popupHeader.appendChild(closeButton);
    popupHeader.innerHTML = '<span aria-hidden="true">&times;</span>';
    popupContent.appendChild(popupImage);
    popupContent.appendChild(popupBody);

    popupContainer.classList.add("is-visible");
<<<<<<< HEAD
=======

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
>>>>>>> main
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
})();

// List the Pokémon Buttons in DOM

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});

// Search Bar

// eslint-disable-next-line
function search() {
  const input = document.getElementById("searchBar").value.toLowerCase();
  const allPokemon = document.getElementsByClassName("pokemon-list__item");

  for (let i = 0; i < allPokemon.length; i++) {
    if (allPokemon[i].innerText.toLowerCase().includes(input)) {
      allPokemon[i].classList.remove("hide");
    } else {
      allPokemon[i].classList.add("hide");
    }
  }
}
