// Initiate the map
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([106.8272, -6.1751]),
    zoom: 16
  })
});

var vectorSource = new ol.source.Vector();
var vectorLayer = new ol.layer.Vector({
  source: vectorSource,
});
map.addLayer(vectorLayer);

var clickListener; // Declare clickListener globally
var markerEnabled = false; // Flag to track marker placement
var markerCoordinates = []; // Array to store marker coordinates

// Function to add marker
function addMarker(coordinates) {
  var marker = new ol.Feature({
    geometry: new ol.geom.Point(coordinates),
  });

  // Style for the marker
  var markerStyle = new ol.style.Style({
    image: new ol.style.Icon({
      src: "https://cdn.jsdelivr.net/gh/Leaflet/Leaflet@1.7.1/dist/images/marker-icon.png",
    }),
  });

  // Apply style to the marker
  marker.setStyle(markerStyle);

  // Add the marker to the vector source
  vectorSource.addFeature(marker);

  // Add coordinates to the array
  markerCoordinates.push(coordinates);

  // Draw lines between consecutive markers
  if (markerCoordinates.length > 1) {
    var lineCoordinates = [markerCoordinates[markerCoordinates.length - 2], coordinates];
    var line = new ol.Feature({
      geometry: new ol.geom.LineString(lineCoordinates),
    });
    vectorSource.addFeature(line);
  }
}

// Function to handle keydown event
function handleKeyDown(event) {
  if (event.key === 'c' && !markerEnabled) {
    console.log("c key pressed");
    markerEnabled = true;
    clickListener = map.on('click', handleMapClick);
  }
}

// Function to handle keyup event
function handleKeyUp(event) {
  if (event.key === 'c' && markerEnabled) {
    console.log("c key released");
    markerEnabled = false;
    ol.Observable.unByKey(clickListener);
  }
}

// Function to handle map click event
function handleMapClick(event) {
  var coordinates = event.coordinate;
  addMarker(coordinates);
}

// Listen for keydown and keyup events on the document
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
