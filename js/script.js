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

  /// creating each pokemon button
  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      let pokemonMaster = $(".list-group");
      let pokedex = $(
        '<li class="list-group-item col-4" style="width:200px" data-toggle="modal" data-target="#pokemonModal"></li>'
      );
      let moreButton = $(
        '<button type= "button" class="btn btn-primary" data-target= "#pokemonModal" datatoggle="modal">More?!?</button>'
      );
      let buttonTitle = $("<h1 class='heading-name'>" + pokemon.name + "</h1>");

      pokemonMaster.append(pokedex);
      pokedex.append(buttonTitle);
      pokedex.append(moreButton);

      moreButton.on("click", () => {
        showDetails(pokemon);
      });
      pokedex.on("click", () => {
        showDetails(pokemon);
      });
    });
  }

  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalHeader.empty();
    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + pokemon.name + "</h1>");

    let imageElementFront = $('<img class="modal-img" style="width:50%"/>');
    imageElementFront.attr("src", pokemon.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", pokemon.imageUrlBack);
    let heightElement = $("<p >" + "Height: " + pokemon.height + "</p>");
    let weightElement = $("<p>" + "Weight: " + pokemon.weight + "</p>");
    let typesElement = $("<p>" + "Type: " + pokemon.types + "</p>");

    //   let abilitiesElement = $(
    //     "<p>" + "Abilities: " + pokemon.Abilities + "</p>"
    //   );

    modalHeader.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    //modalBody.append(abilitiesElement);

    hideLoadingMessage();
    modalBody.addEventListener("click", (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }
  //     window.addEventListener("keydown", (e) => {
  //       let modalContainer = document.querySelector("#modal_container");
  //       if (
  //         e.key === "Escape" &&
  //         modalContainer.classList.contains("is-visible")
  //       ) {
  //         hideModal();
  //       }
  //     });
  //     console.log(pokemon);

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
    } catch (error) {
      console.error(error);
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
        item.imageUrlFront = details.sprites.front_shiny;
        item.imageUrlBack = details.sprites.back_shiny;
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

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
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
    showModal: showModal,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(() => {
  //loads data
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
