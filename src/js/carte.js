// Elouan Teissere - Lucas Le Bihan

mapboxgl.accessToken =
  "pk.eyJ1IjoiZWxvdWFudCIsImEiOiJjbHZtNmQ3dXgybnB5MnJwNnZuZXc1aGRqIn0.IfS0GAp6yiHak2ALm8_yKA";

$(document).ready(function () {
  $.get(
    "php/dynamic_select.php", //recuperation du contenu des select dynamiques
    function (data) {
      // Filtre 'ville
      var villeData = JSON.parse(data.ville); // affichage des select dynamiques
      $.each(villeData, function (idx, opt) {
        $("#ville").append(
          '<option value="' + opt.ville_nom + '">' + opt.ville_nom + "</option>"
        );
      });

      // Filtre 'athmo'
      var athmoData = JSON.parse(data.athmo); // affichage des select dynamiques
      $.each(athmoData, function (idx, opt) {
        $("#athmo").append(
          '<option value="' +
            opt.id_athmo +
            '">' +
            opt.descr_athmo +
            "</option>"
        );
      });

      // Filtre 'luminosite'
      var lumData = JSON.parse(data.lum); // affichage des select dynamiques
      $.each(lumData, function (idx, opt) {
        $("#luminosite").append(
          '<option value="' + opt.id_lum + '">' + opt.descr_lum + "</option>"
        );
      });

      // Filtre 'etat_surf'
      var etatData = JSON.parse(data.etat_route); // affichage des select dynamiques
      $.each(etatData, function (idx, opt) {
        $("#etat_surf").append(
          '<option value="' +
            opt.id_etat_surf +
            '">' +
            opt.descr_etat_surf +
            "</option>"
        );
      });

      // Filtre 'securite'
      var securiteData = JSON.parse(data.ceinture); // affichage des select dynamiques
      $.each(securiteData, function (idx, opt) {
        $("#securite").append(
          '<option value="' +
            opt.id_dispo_secu +
            '">' +
            opt.descr_dispo_secu +
            "</option>"
        );
      });

      // Filtre 'cat_veh'
      var catVehData = JSON.parse(data.vehicule); // affichage des select dynamiques
      $.each(catVehData, function (idx, opt) {
        $("#cat_veh").append(
          '<option value="' +
            opt.id_cat_veh +
            '">' +
            opt.descr_cat_veh +
            "</option>"
        );
      });

      // Filtre 'collision'
      var collisionData = JSON.parse(data.collision); // affichage des select dynamiques
      $.each(collisionData, function (idx, opt) {
        $("#collision").append(
          '<option value="' +
            opt.id_type_col +
            '">' +
            opt.descr_type_col +
            "</option>"
        );
      });
    },
    "json"
  );

  $("#age").val($.cookie("age"));   //on met dans les options le contenu des cookies
  $("#gravite").val($.cookie("gravite"));
  $("#ville").val($.cookie("ville"));
  $("#date").val($.cookie("date"));
  $("#athmo").val($.cookie("athmo"));
  $("#luminosite").val($.cookie("lum"));
  $("#etat_surf").val($.cookie("etat_surf"));
  $("#securite").val($.cookie("securite"));
  $("#cat_veh").val($.cookie("cat_veh"));
  $("#collision").val($.cookie("collision"));
  $("#limit").val($.cookie("limit"));
  $("#bdd").val($.cookie("bdd"));

  // Fonction pour filtrer les accidents
  function filtrerAccidents() {
    var age = $("#age").val(); //on recupere le contenu des options
    var gravite = $("#gravite").val();
    var ville = $("#ville").val();
    var date = $("#date").val();
    var athmo = $("#athmo").val();
    var lum = $("#luminosite").val();
    var etat_surf = $("#etat_surf").val();
    var securite = $("#securite").val();
    var cat_veh = $("#cat_veh").val();
    var collision = $("#collision").val();
    var limit = $("#limit").val();
    var bdd = $("#bdd").val();

    $.cookie("age", age); // on redefini les cookies avec les nouvelles variables
    $.cookie("gravite", gravite);
    $.cookie("ville", ville);
    $.cookie("date", date);
    $.cookie("athmo", athmo);
    $.cookie("lum", lum);
    $.cookie("etat_surf", etat_surf);
    $.cookie("securite", securite);
    $.cookie("cat_veh", cat_veh);
    $.cookie("collision", collision);
    $.cookie("limit", limit);
    $.cookie("bdd", bdd);

    $.ajax({
      url: "php/filtre.php", //appel du filtre qui renverra le json des accidents
      method: "POST",
      data: { //envoi des differentes variables
        age: age,
        gravite: gravite,
        ville: ville,
        date: date,
        athmo: athmo,
        lum: lum,
        etat_surf: etat_surf,
        securite: securite,
        cat_veh: cat_veh,
        collision: collision,
        limit: limit,
        bdd: bdd,
      },
      dataType: "json",
      success: function (data) {
        initializeMap(data); // on initialise la map
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
      },
    });
  }

  $("#filterBtn").click(function () { //quand on clique sur fitrerBtn, on lance le filtrage et l'affichage de la map
    filtrerAccidents();
  });
  filtrerAccidents(); // on va afficher la map par defaut sans filtres
});

function initializeMap(data) { 
  var map = new mapboxgl.Map({ //appel de l'objet map
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    projection: "globe",
    center: [2.349014, 48.864716], // Coordonnées du centre de la France (Paris)
    zoom: 4, // Zoom initial pour voir la France entière
  });

  map.addControl(new mapboxgl.NavigationControl());

  map.on("load", function () {
    map.addSource("accidents", {
      type: "geojson", //on remplit le geojson avec les features et les coordonnees
      data: {
        type: "FeatureCollection",
        features: data.map(function (accident) {
          return {
            type: "Feature",
            properties: accident,
            geometry: {
              type: "Point",
              coordinates: [ 
                parseFloat(accident.longitude),
                parseFloat(accident.latitude),
              ],
            },
          };
        }),
      },
    });

    map.addLayer({ //parametres des points sur la map
      id: "accidents",
      type: "circle",
      source: "accidents",
      paint: {
        "circle-color": "red",
        "circle-radius": 5,
        "circle-stroke-width": 1,
        "circle-stroke-color": "white",
      },
    });

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });
    
    map.on('mouseenter', 'accidents', (e) => {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = 'pointer';
    
      // Retrieve accident properties.
      const accident = e.features[0].properties;
      const popupContent =
        "<h4>Accident ID: " +
        accident.acc_id +
        "</h4>" +
        "<p>Date/Time: " +
        accident.date +
        "</p>" +
        "<p>Latitude: " +
        accident.latitude +
        "</p>" +
        "<p>Longitude: " +
        accident.longitude +
        "</p>";
    
      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice();
    
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
    
      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates).setHTML(popupContent).addTo(map);
    });
    
    map.on('mouseleave', 'accidents', () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });
  });
}
