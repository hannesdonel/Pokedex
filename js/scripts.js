// When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar

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

  // Definition of needed functions

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
        hideLoader();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        hideLoader();
        console.error(e);
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
        buttonLoaderStop();
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        buttonLoaderStop();
        console.error(e);
      });
  }

  // Show details of Pokémon

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
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
