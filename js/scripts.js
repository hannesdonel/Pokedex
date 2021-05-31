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
