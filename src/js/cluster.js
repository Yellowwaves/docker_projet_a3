// Elouan Teissere - Lucas Le Bihan

mapboxgl.accessToken =
  "pk.eyJ1IjoiZWxvdWFudCIsImEiOiJjbHZtNmQ3dXgybnB5MnJwNnZuZXc1aGRqIn0.IfS0GAp6yiHak2ALm8_yKA";

$(document).ready(function () {
  $.ajax({
    url: "php/cluster.php", //appel de la fonction cluster, recuperation des points pour clustering sur map
    method: "POST",
    dataType: "json",
    success: function (data) {
      initializeMap(data);
    },
    error: function (xhr, resp, text) {
      console.log(xhr, resp, text);
    },
  });
});

function initializeMap(data) {
  var map = new mapboxgl.Map({
    //definition de la map exactement comme dans carte.js avec des parametres differents
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    projection: "globe",
    center: [2.349014, 48.864716], // Coordonnées du centre de la France (Paris)
    zoom: 4, // Zoom initial pour voir la France entière
  });

  map.addControl(new mapboxgl.NavigationControl());

  map.on("load", function () {
    map.addSource("accidents", {
      type: "geojson",
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

    var clusterColors = {
      //definition des couleurs des 13 clusters
      0: "red",
      1: "blue",
      2: "green",
      3: "yellow",
      4: "orange",
      5: "purple",
      6: "cyan",
      7: "magenta",
      8: "brown",
      9: "pink",
      10: "teal",
      11: "lime",
      12: "gray",
    };

    map.addLayer({
      //definition des points avec leurs couleurs
      id: "accidents",
      type: "circle",
      source: "accidents",
      paint: {
        "circle-color": [
          "get",
          ["to-string", ["get", "cluster"]], // Convertit en chaîne de caractères
          ["literal", clusterColors],
        ],
        "circle-radius": 5,
        "circle-stroke-width": 1,
        "circle-stroke-color": "white",
      },
    });

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    map.on("mouseenter", "accidents", (e) => {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = "pointer";

      // Retrieve accident properties.
      const accident = e.features[0].properties;
      const popupContent =
        "<h4>Accident ID: " +
        accident.acc_id +
        "</h4>" +
        "<p>Latitude: " +
        accident.latitude +
        "</p>" +
        "<p>Longitude: " +
        accident.longitude +
        "</p>" +
        "<p>Cluster: " +
        accident.cluster +
        "</p>";

      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice();

      // Parametres de mapbox
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates).setHTML(popupContent).addTo(map);
    });

    map.on("mouseleave", "accidents", () => {
      map.getCanvas().style.cursor = "";
      popup.remove();
    });
  });
}
