
let pokemonList= [
    { name: 'Bulbasaur', height: 7, types:['Grass', 'Poison']},
    { name: 'Charmander', height: 6, types: ['Fire']},
    { name: 'Squirtle', height: 5, types: ['Water']},
    { name: 'Pidgey', height: 3, types: ['Flying', 'Normal']},
    { name: 'Pikachu', height: 4, types: ['Electric', 'Poison']},
    { name: 'Charizard', height: 17, types: ['Fire', 'Flying']}
  ]
  //returns list and heigh of pokemon
  let sizequote = ''
  for (let i = 0; i < pokemonList.length; i++){
    if (pokemonList[i].height > 6) {
        sizequote = " - phwaaa thats a big one!";}
        else {
            sizequote = " - ahhh cute! :)";
        }
    document.write([pokemonList[i].name +', '+ 'Height =' + pokemonList[i].height + sizequote ]);
    document.write("<br><br>")
    }