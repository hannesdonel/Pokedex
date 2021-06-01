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

for (let i = 0; i < pokemonList.length; i++) {
  document.write(
      "<br>" + pokemonList[i].name + " (height: " + pokemonList[i].height + " m)"
  );
  if (pokemonList[i].height > 1) {
    document.write(" - Wow, that's big!");
  }
}
