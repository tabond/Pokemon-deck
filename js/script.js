let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (typeof pokemon === "object" && pokemon.name) {
      pokemonList.push(pokemon);
      console.log("new pokemon added!!");
    } else {
      return "${pokemon} data is incorrect. Pokemon must contain name, height and types object keys";
    }
  }

  function getAll() {
    return pokemonList;
  }

  function search(query) {
    return pokemonRepository.getAll().filter(function (pokemon) {
      return pokemon.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }

  function onButtonClick(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon_list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    onButtonClick(button, pokemon);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      hideLoadingMessage();
      console.log(pokemon);
    });
  }

  async function loadList() {
    showLoadingMessage();
    try {
      const response = await fetch(apiUrl);
      const json = await response.json();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
        console.log(pokemon);
      });
    } catch (e) {
      console.error(e);
      hideLoadingMessage();
    }
  }
  async function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_shiny;
        item.height = details.height;
        item.type = details.types;
      })
      .catch(function (e) {
        console.error("we have a problem: ${error)");
        hideLoadingMessage();
      });
  }

  function showLoadingMessage() {
    let loading = document.querySelector(".loading");
    loading.classList.remove("hidden");
  }

  function hideLoadingMessage() {
    let loading = document.querySelector(".loading");
    loading.classList.add("hidden");
  }

  return {
    add: add,
    getAll: getAll,
    search: search,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.add({
  name: "Portlander",
  height: 100,
  types: ["electric", " fire"],
});

console.log(pokemonRepository.getAll());
console.log(pokemonRepository.search("p"));

pokemonRepository.loadList().then(function () {
  //loads data
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
    pokemonRepository.loadDetails(pokemon);
  });
});
