
  function pokemon_detail(pokemon) {
    if (pokemon.height > 6) {
        sizequote = " - phwaaa thats a big one!";
    } else {
            sizequote = " - ahhh cute! :)";
        }

    document.write([
        pokemon.name +', '+ 'Height =' + pokemon.height + sizequote 
    ]);

    document.write("<br><br>");
}

      let pokemonRepository = (function () {
        let pokemonList = [
            { name: 'Bulbasaur', height: 7, types:['Grass', 'Poison']},
            { name: 'Pikachu', height: 4, types: ['Electric', 'Poison']},
            { name: 'Charizard', height: 17, types: ['Fire', 'Flying']},
            { name: 'Charmander', height: 6, types: ['Fire']},
            { name: 'Squirtle', height: 5, types: ['Water']},
            { name: 'Pidgey', height: 3, types: ['Flying', 'Normal']},
        ];
        sizequote =''
      
        function add(pokemon) {
          pokemonList.push(pokemon);
        }
        function getAll() {
          return pokemonList;
        }
      
        return {
          add: add,
          getAll: getAll,
        };
      })()

//how come you can log the array to the consol but not document write it
console.log(pokemonRepository.getAll()); 
pokemonRepository.add({ name: 'Pikachu', height: 100, type: 'Electric' });
console.log(pokemonRepository.getAll());
pokemonRepository.getAll().forEach(pokemon_detail);


