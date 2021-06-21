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
    listItem.classList.add(
      "pokemon-list__item",
      "list-group-item",
      "bg-transparent",
      "border-0"
    );
    button.innerText = Pokemon.name;
    button.classList.add("btn", "btn-lg", "btn-danger");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#popup-container");
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
    showLoader();
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
        hideLoader();
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
    popupImage.src = item.imageUrl;
    popupImage.alt = "Picture of selected Pokémon";
    popupImage.width = 300;
    popupImage.height = 300;
    popupBody.innerHTML = `
      <p class="block-level"><span class="capitalize"><b>Abilities: </b>${item.abilities}</span></p>
      <p class="block-level"><span class="capitalize"><b>Types: </b>${item.types}</span></p>
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
  }

  // Loader animations

  function showLoader() {
    let loader = document.querySelector("body");
    loader.style.cursor = "progress";
  }

  function hideLoader() {
    let loader = document.querySelector("body");
    loader.style.cursor = "default";
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
