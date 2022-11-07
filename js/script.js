
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
          if (typeof pokemon === 'object' && pokemon.name && pokemon.height && pokemon.types && Object.keys(pokemon).length === 3){
          pokemonList.push(pokemon);
          console.log('new pokemon added!!')
          } else {
            return '${pokemon} data is incorrect. Pokemon must contain name, height and types object keys';
          }
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
console.log(pokemonRepository.add({name: 'Portlander', height: 100, types: ['electric', 'fire']}));
console.log(pokemonRepository.getAll());
//not sure why this doesn't return the object keys to the console just the object number...? 
//(I assume it is down to the object contents being concealed in the iife)
//console.log(Object.keys(pokemonRepository.getAll()));
//console.log(Object.values(pokemonRepository.getAll()));
//console.log(Object.entries(pokemonRepository.getAll()));


function filterpokemon (query) {
  return pokemonRepository.getAll().filter(function (pokemon){
  return pokemon.name.toLowerCase().indexOf(query.toLowerCase())>-1;
});}

console.log(filterpokemon ('gul')); //returns pidgey and Pikachu
pokemonRepository.getAll().forEach(pokemon_detail);
