(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
(function() {
  'use strict';

  var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
