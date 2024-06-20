// Initiate the map
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([106, -2]), // Centered on Indonesia
    zoom: 5 // Zoom level adjusted for better visibility
  })
});

// Define Jakarta's coordinates
var jakartaCoordinates = [106.8272, -6.1751];

// Create a vector source and layer for city markers
var vectorSource = new ol.source.Vector();
var vectorLayer = new ol.layer.Vector({
  source: vectorSource,
});
map.addLayer(vectorLayer);

// Function to add Jakarta marker
function addJakartaMarker() {
  var marker = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat(jakartaCoordinates)),
    name: 'Jakarta' // Store city name in feature for tooltip
  });

  // Style for the marker
  var markerStyle = new ol.style.Style({
    image: new ol.style.Icon({
      src: 'https://cdn.jsdelivr.net/gh/Leaflet/Leaflet@1.7.1/dist/images/marker-icon.png',
    }),
  });

  // Apply style to the marker
  marker.setStyle(markerStyle);

  // Add the marker to the vector source
  vectorSource.addFeature(marker);

  return marker; // Return the feature for further interaction
}

// Add Jakarta marker
var jakartaFeature = addJakartaMarker();

// Style for the highlighted feature
var highlightStyle = new ol.style.Style({
  image: new ol.style.Icon({
    src: 'https://cdn.jsdelivr.net/gh/Leaflet/Leaflet@1.7.1/dist/images/marker-icon-2x.png',
  }),
});

// Variable to hold the feature being highlighted
var highlight;

// Event listener for pointermove to handle city hover
map.on('pointermove', function(event) {
  var feature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
    return feature;
  });

  // Remove highlight from previously hovered feature
  if (feature && feature === jakartaFeature) {
    if (highlight) {
      highlight.setStyle(null);
    }
    highlight = feature;
    highlight.setStyle(highlightStyle);
  } else {
    if (highlight) {
      highlight.setStyle(null);
    }
    highlight = null;
  }
});