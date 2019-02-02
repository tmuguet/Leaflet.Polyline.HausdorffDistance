(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
(function (global){
"use strict";

var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null);

if (L.Polyline === undefined) {
  throw new Error('Cannot find L.Polyline');
}

function getLatLngsFlatten(polyline) {
  var latlngs = polyline.getLatLngs();

  if (latlngs.length > 0 && Array.isArray(latlngs[0])) {
    var result = [];

    for (var j = 0; j < latlngs.length; j += 1) {
      result = result.concat(latlngs[j]);
    }

    return result;
  }

  return latlngs;
}

L.Polyline.include({
  distanceTo: function distanceTo(o) {
    var xLatLng = getLatLngsFlatten(this);
    var yLatLng = getLatLngsFlatten(o);
    var distances = {};
    var sizeX = xLatLng.length;
    var sizeY = yLatLng.length;
    var supX = Number.MIN_VALUE;
    var supY = Number.MIN_VALUE;

    for (var x = 0; x < sizeX; x += 1) {
      var infY = Number.MAX_VALUE;

      for (var y = 0; y < sizeY; y += 1) {
        var key = "".concat(x, "/").concat(y);
        distances[key] = xLatLng[x].distanceTo(yLatLng[y]);

        if (distances[key] < infY) {
          infY = distances[key];
        }
      }

      if (infY > supX) {
        supX = infY;
      }
    }

    for (var _y = 0; _y < sizeY; _y += 1) {
      var infX = Number.MAX_VALUE;

      for (var _x = 0; _x < sizeX; _x += 1) {
        var _key = "".concat(_x, "/").concat(_y);

        if (distances[_key] < infX) {
          infX = distances[_key];
        }
      }

      if (infX > supY) {
        supY = infX;
      }
    }

    return Math.max(supX, supY);
  }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
