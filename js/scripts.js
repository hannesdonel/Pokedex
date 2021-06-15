// When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar.

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("hide-header").style.top = "0";
  } else {
    document.getElementById("hide-header").style.top = "-100vh";
  }
  prevScrollpos = currentScrollPos;
};

// Definition of the Pokémon Repository

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let popupContainer = document.querySelector("#popup-container");

  // Add a Pokémon

  function add(pokemon) {
    if (typeof pokemon !== "object") {
      alert("The new Pokémon should have the form of an object");
    } else if (
      JSON.stringify(Object.keys(pokemon)) !==
      JSON.stringify(["name", "detailsUrl"])
    ) {
      alert(
        "The object should have the following properties: name, detailsUrl"
      );
    } else pokemonList.push(pokemon);
  }

  // Get all Pokémon from pokemonList

  function getAll() {
    return pokemonList;
  }

  // Create a button in the for each Pokémon within pokemonList

  function addListItem(Pokemon) {
    let $list = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    listItem.classList.add("pokemon-list__item");
    button.innerText = Pokemon.name;
    button.classList.add("pokemon-list__item--button");
    listItem.appendChild(button);
    $list.appendChild(listItem);
    button.addEventListener("click", function () {
      showDetails(Pokemon);
    });
  }

  // Get Pokémon data from API

  function loadList() {
    showLoader();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        for (item of json.results) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        }
      })
      .catch(function (e) {
        console.error(e);
      })
      .finally((e) => {
        hideLoader();
      });
  }

  // Get Pokémon details from API

  function loadDetails(item) {
    let url = item.detailsUrl;
    buttonLoader();
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.abilities = [];
        for (i = 0; i < details.abilities.length; i++) {
          item.abilities.push(` ${details.abilities[i].ability.name}`);
        }
        item.height = details.height;
        item.types = [];
        for (i = 0; i < details.types.length; i++) {
          item.types.push(` ${details.types[i].type.name}`);
        }
        item.weight = details.weight;
      })
      .catch(function (e) {
        console.error(e);
      })
      .finally((e) => {
        buttonLoaderStop();
      });
  }

  // Show details of Pokémon

  function showDetails(item) {
    loadDetails(item).then(function () {
      showPopup(item);
    });
  }

  // Show popup with Pokémon details

  function showPopup(item) {
    popupContainer.innerHTML = "";
    popupContainer.classList.add("animate__fadeIn");

    let popup = document.createElement("div");
    let closeButton = document.createElement("button");
    let popupImage = document.createElement("img");
    let popupHeading = document.createElement("h1");
    let popupContent = document.createElement("p");
    popup.classList.add("popup");
    popup.classList.add("animate__animated");
    popup.classList.add("animate__zoomIn");
    closeButton.innerText = "X";
    popupImage.src = item.imageUrl;
    popupImage.alt = "Picture of selected Pokémon";
    popupImage.width = 300;
    popupImage.height = 300;
    popupHeading.innerText = item.name;
    popupContent.innerHTML = `
      <p class="block-level"><span class="capitalize"><b>Abilities: </b>${item.abilities}</p>
      <p class="block-level"><b>Types: </b>${item.types}</span></p>
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
        e.key === "Escape" &&
        popupContainer.classList.contains("is-visible")
      ) {
        hidePopup();
      }
    });
    window.addEventListener("click", (e) => {
      let target = e.target;
      if (target === popupContainer) {
        hidePopup();
      }
    });
  }

  // Hide popup

  function hidePopup() {
    let popup = document.querySelector(".popup");
    popupContainer.classList.add("animate__fadeOut");
    popupContainer.classList.remove("animate__fadeIn");
    popup.classList.remove("animate__zoomIn");
    popup.classList.add("animate__zoomOut");
    popup.addEventListener("animationend", () => {
      popupContainer.classList.remove("is-visible");
      popupContainer.classList.remove("animate__fadeOut");
    });
  }

  // Loader animations

  function showLoader() {
    let loader = document.querySelector("#background-overlay");
    loader.classList.add("loader");
  }

  function buttonLoader() {
    let buttonLoader = document.querySelector(".pokemon-list__item--button");
    buttonLoader.classList.add("loader");
  }

  function hideLoader() {
    let loader = document.querySelector("#background-overlay");
    loader.classList.remove("loader");
  }

  function buttonLoaderStop() {
    let buttonLoader = document.querySelector(".pokemon-list__item--button");
    buttonLoader.classList.remove("loader");
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

// List the Pokémon Buttons in DOM

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
