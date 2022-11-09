
      let pokemonRepository = (function () {
        let pokemonList = [
            { name: 'Bulbasaur', height: 7, types:['Grass',' Poison']},
            { name: 'Pikachu', height: 4, types: ['Electric',' Poison']},
            { name: 'Charizard', height: 17, types: ['Fire',' Flying']},
            { name: 'Charmander', height: 6, types: ['Fire']},
            { name: 'Squirtle', height: 5, types: ['Water']},
            { name: 'Pidgey', height: 3, types: ['Flying',' Normal']},
        ];
      
        function add(pokemon) {
          if (typeof pokemon === 'object' && 
          pokemon.name && 
          pokemon.height && 
          pokemon.types
          ){
          pokemonList.push(pokemon);
          console.log('new pokemon added!!');
          } else {
            return '${pokemon} data is incorrect. Pokemon must contain name, height and types object keys';
          }
        }

        function getAll() {
          return pokemonList;
        }

        function search (query) {
          return pokemonRepository.getAll().filter(function (pokemon){
          return pokemon.name.toLowerCase().indexOf(query.toLowerCase())>-1;
        });}

        function addListItem(pokemon){
          let pokemonList = document.querySelector('.pokemon_list');
          let listPokemon =document.createElement('li');
          let button = document.createElement('button');
          button.innerText = pokemon.name;
          button.classList.add('button');
          listPokemon.appendChild(button);
          pokemonList.appendChild(listPokemon);

button.addEventListener('click', function(event){
  button.innerText = 'Height: '+pokemon.height + ' |Types: '+ pokemon.types;
  showDetails(pokemon);
})

      }
        
function showDetails(pokemon){
  console.log(pokemon)
}
        return {
          add: add,
          getAll: getAll,
          search: search,
          addListItem:addListItem,
          showDetails:showDetails
        };
      })()

console.log(pokemonRepository.add({name: 'Portlander', height: 100, types: ['electric',' fire']}));
console.log(pokemonRepository.getAll());
console.log(pokemonRepository.search ('p')); //returns pidgey and Pikachu

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
  pokemonRepository.showDetails(pokemon);
});


  /*let sizequote ="";

  if (pokemon.height > 6) {
      sizequote = " - phwaaa thats a big one!";
  } else {
          sizequote = " - ahhh cute! :)";
      }

  document.write([
      pokemon.name +', '+ 'Height =' + pokemon.height + sizequote 
  ]);

  document.write("<br><br>");*/

