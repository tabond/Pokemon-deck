
let pokemonList= [
    { name: 'Bulbasaur', height: 7, types:['Grass', 'Poison']},
    { name: 'Pikachu', height: 4, types: ['Electric', 'Poison']},
    { name: 'Charizard', height: 17, types: ['Fire', 'Flying']}
  ]
  let pokemonList2= [
    { name: 'Charmander', height: 6, types: ['Fire']},
    { name: 'Squirtle', height: 5, types: ['Water']},
    { name: 'Pidgey', height: 3, types: ['Flying', 'Normal']},
  ]
  //returns list and heigh of pokemon
  let sizequote = ''

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
        pokemonList.forEach(pokemon_detail);
        pokemonList2.forEach(pokemon_detail);




