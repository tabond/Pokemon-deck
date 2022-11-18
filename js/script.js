let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  ///ADD Pokemon to Pokedex
  function add(pokemon) {
    if (typeof pokemon === "object" && pokemon.name) {
      pokemonList.push(pokemon);
    } else {
      return "${pokemon} data is incorrect. Pokemon must contain name, height and types object keys";
    }
  }

  /// returns all pokemon from repository
  function getAll() {
    return pokemonList;
  }

  //Function to search the Repo
  function search(query) {
    return pokemonRepository.getAll().filter(function (pokemon) {
      return pokemon.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }

  //Button to show pokemon details when clicked
  function onButtonClick(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  /// creating each pokemon button
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon_list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    let buttonTitle = document.createElement("h1");
    buttonTitle.innerText = pokemon.name;
    button.classList.add("details_button");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    onButtonClick(button, pokemon);

    button.appendChild(buttonTitle);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let modalContainer = document.querySelector("#modal_container");
      modalContainer.innerHTML = "";

      let modal = document.createElement("div");
      modal.classList.add("modal");

      let closeButtonElement = document.createElement("button");
      closeButtonElement.classList.add("modal-close");
      closeButtonElement.innerText = "X";
      closeButtonElement.addEventListener("click", hideModal);

      let titleElement = document.createElement("h1");
      titleElement.innerText = pokemon.name;

      let imageElement = document.createElement("img");
      imageElement.src = pokemon.imageUrl;

      let contentElement = document.createElement("p");
      contentElement.innerText =
        "Height ->> " +
        pokemon.height +
        "\n" +
        "Weight ->> " +
        pokemon.weight +
        "\n" +
        " -----Types----- " +
        "\n" +
        pokemon.types;

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(imageElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);
      modalContainer.classList.add("is-visible");

      hideLoadingMessage();
      modalContainer.addEventListener("click", (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
    });
    window.addEventListener("keydown", (e) => {
      let modalContainer = document.querySelector("#modal_container");
      if (
        e.key === "Escape" &&
        modalContainer.classList.contains("is-visible")
      ) {
        hideModal();
      }
    });
    console.log(pokemon);
  }

  function hideModal() {
    let modalContainer = document.querySelector("#modal_container");
    modalContainer.classList.remove("is-visible");
  }

  /// pulling data from repo and assigning variables
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
      });
    } catch (e) {
      console.error(e);
      hideLoadingMessage();
    }
  }

  //// attaching details from repo to each pokemon
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
        item.weight = details.weight;
        item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
      })
      .catch(function (e) {
        console.error("we have a problem: ${error)");
        hideLoadingMessage();
      });
  }

  ////loading exection
  function showLoadingMessage() {
    let loading = document.querySelector(".loading");
    loading.classList.remove("hidden");
  }

  function hideLoadingMessage() {
    let loading = document.querySelector(".loading");
    loading.classList.add("hidden");
  }
  /////
  return {
    add: add,
    getAll: getAll,
    search: search,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  //loads data
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
