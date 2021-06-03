//This is the definition of the Pokémon List

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

//List the Pokémons in DOM

let domElementsString = "";
pokemonList.forEach(function (Pokemon) {
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

document.write(domElementsString);
