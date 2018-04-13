/*eslint-disable*/

import async from 'async'
export default {
  getBoundsZoomLevel(bounds, mapDim) {
    console.log('bounds ' + bounds);
    var WORLD_DIM = {height: 256, width: 256};
    var ZOOM_MAX = 21;

    function latRad(lat) {
      var sin = Math.sin(lat * Math.PI / 180);
      var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
      return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function zoom(mapPx, worldPx, fraction) {
      return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }

    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();

    var latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

    var lngDiff = ne.lng() - sw.lng();
    var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

    var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
    var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

    return Math.min(latZoom, lngZoom, ZOOM_MAX);
  },
  getBounds: (coordinates) => {
    var bounds = new google.maps.LatLngBounds();
    var i;
    for (i = 0; i < coordinates.length; i++) {
      bounds.extend(coordinates[i]);
    }
    return bounds;
  },
  constructCoordinatesFromLand(land){
    let coordinates = [];
    async.forEachOf(land.info.pins, (p, index) => {
      coordinates.push({
        lat: p.latitude,
        lng: p.longitude
      });
    });
    return coordinates;
  },
  constructPolygon(land){
    let polygon = new google.maps.Polygon({
      paths: constructCoordinatesFromLand(land),
      strokeColor: color,
      strokeOpacity: 1,
      strokeWeight: 4,
      fillColor: randomColor(),
      fillOpacity: 0.5
    });
    return polygon;
  }
}
