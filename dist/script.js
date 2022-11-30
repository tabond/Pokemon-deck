let pokemonRepository = (function () {
  let t = [];
  function e(e) {
    if ("object" != typeof e || !e.name)
      return "${pokemon} data is incorrect. Pokemon must contain name, height and types object keys";
    t.push(e);
  }
  function o() {
    return t;
  }
  function n(t) {
    let e = $(".modal-body"),
      o = $(".modal-title"),
      n = $(".modal-header");
    n.empty(), o.empty(), e.empty();
    let i = $("<h1>" + t.name + "</h1>"),
      a = $('<img class="modal-img" style="width:50%"/>');
    a.attr("src", t.imageUrlFront);
    let r = $('<img class="modal-img" style="width:50%">');
    r.attr("src", t.imageUrlBack);
    let l = $("<p >Height: " + t.height + "</p>"),
      s = $("<p>Weight: " + t.weight + "</p>"),
      p = $("<p>Type: " + t.types + "</p>");
    n.append(i),
      e.append(a),
      e.append(r),
      e.append(l),
      e.append(s),
      e.append(p);
  }
  async function i() {
    try {
      let t = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=150"),
        o = await t.json();
      o.results.forEach(function (t) {
        let o = { name: t.name, detailsUrl: t.url };
        e(o);
      });
    } catch (n) {
      console.error(n);
    }
  }
  async function a(t) {
    return fetch(t.detailsUrl)
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        (t.imageUrlFront = e.sprites.front_shiny),
          (t.imageUrlBack = e.sprites.back_shiny),
          (t.height = e.height),
          (t.weight = e.weight),
          (t.types = []);
        for (var o = 0; o < e.types.length; o++)
          t.types.push(e.types[o].type.name);
      })
      .catch(function () {
        console.error("we have a problem: ${error)");
      });
  }
  function r(t) {
    a(t).then(function () {
      n(t);
    });
  }
  return (
    $(document).ready(function () {
      $(".loading").hide(), $(".spinner-border").hide();
    }),
    $(document).ready(function () {
      $("#search_input").on("keyup", function () {
        var t = $(this).val().toLowerCase();
        $("#poke_doc *").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(t) > -1);
        });
      });
    }),
    {
      add: e,
      getAll: o,
      search: function t(e) {
        return pokemonRepository.getAll().filter(function (t) {
          return t.name.toLowerCase().indexOf(e.toLowerCase()) > -1;
        });
      },
      addListItem: function t(e) {
        pokemonRepository.loadDetails(e).then(function () {
          let t = $(".row"),
            o = $(
              '<li class="list-group-item col-md-2" id = "pokelist" data-toggle="modal" data-target="#pokemonModal"></li>'
            ),
            n = $('<img class="list-img" id ="list_img"style="width:50%"/>');
          n.attr("src", e.imageUrlFront);
          let i = $(
              '<button type= "button" class="btn btn-primary" data-target= "#pokemonModal" datatoggle="modal">poke?</button>'
            ),
            a = $(
              "<h2 class='heading-name' id='heading_list'>\n" + e.name + "</h2>"
            );
          t.append(o),
            o.append(a),
            o.append(n),
            o.append(i),
            i.on("click", () => {
              r(e);
            }),
            o.on("click", () => {
              r(e);
            });
        });
      },
      loadList: i,
      loadDetails: a,
      showModal: n,
      showDetails: r,
    }
  );
})();
pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
