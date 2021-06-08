/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
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

//Definition of the Pokémon Repository

let pokemonRepository = (function () {
  function Pokemon(name, height, types) {
    this.name = name;
    this.height = height;
    this.types = types;
  }

  let pokemonList = [
    new Pokemon("Charizard", 1.7, ["fire", "flying"]),
    new Pokemon("Togepi", 0.3, ["fairy"]),
    new Pokemon("Poliwhirl", 1, ["water"]),
  ];

  //Definition of needed functions

  function add(pokemon) {
    if (typeof pokemon !== "object") {
      alert("The new Pokémon should have the form of an object");
    } else if (
      JSON.stringify(Object.keys(pokemon)) !==
      JSON.stringify(["name", "height", "types"])
    ) {
      alert(
        "The object should have the following properties: name, height, types"
      );
    } else pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(Pokemon) {
    console.log(Pokemon);
  }

  function addListItem(Pokemon) {
    let list = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    listItem.classList.add("pokemon-list__item");
    let button = document.createElement("button");
    button.innerText = Pokemon.name;
    button.classList.add("pokemon-list__item--button");
    listItem.appendChild(button);
    list.appendChild(listItem);
    button.addEventListener("click", function () {
      showDetails(Pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();

//List the Pokémon Buttons in DOM

let domElementsString = "";
pokemonRepository.getAll().forEach(function (Pokemon) {
  pokemonRepository.addListItem(Pokemon);

  if (Pokemon.height > 1) {
    domElementsString += `
      <p class="pokemon__special">
        ${Pokemon.name} (height: ${Pokemon.height}m) - Wow, that\'s
        big!
      </p>`;
  } else {
    domElementsString += `
      <p class="pokemon">
        ${Pokemon.name} (height: ${Pokemon.height}m)
      </p>`;
  }
});
