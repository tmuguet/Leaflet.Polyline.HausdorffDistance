(function() {
  'use strict';

  var L = require('leaflet');

  if (L.Polyline === undefined) {
    throw new Error('Cannot find L.Polyline');
  }

  function getLatLngsFlatten(polyline) {
    var latlngs = polyline.getLatLngs();

    if (latlngs.length > 0 && Array.isArray(latlngs[0])) {
      var result = [];
      for (var j = 0; j < latlngs.length; j++) {
        result = result.concat(latlngs[j]);
      }

      return result;
    } else {
      return latlngs;
    }
  }

  L.Polyline.include({
    distanceTo: function(o) {
      var xLatLng = getLatLngsFlatten(this);
      var yLatLng = getLatLngsFlatten(o);

      var distances = {};

      var sizeX = xLatLng.length;
      var sizeY = yLatLng.length;

      var supX = Number.MIN_VALUE;
      var supY = Number.MIN_VALUE;

      var x, y, key;

      for (x = 0; x < sizeX; x++) {
        var infY = Number.MAX_VALUE;
        for (y = 0; y < sizeY; y++) {
          key = x + '/' + y;
          distances[key] = xLatLng[x].distanceTo(yLatLng[y]);
          if (distances[key] < infY) {
            infY = distances[key];
          }
        }

        if (infY > supX) {
          supX = infY;
        }
      }

      for (y = 0; y < sizeY; y++) {
        var infX = Number.MAX_VALUE;
        for (x = 0; x < sizeX; x++) {
          key = x + '/' + y;
          if (distances[key] < infX) {
            infX = distances[key];
          }
        }

        if (infX > supY) {
          supY = infX;
        }
      }

      return Math.max(supX, supY);
    }
  });
})();
