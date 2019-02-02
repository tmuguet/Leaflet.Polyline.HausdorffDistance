const L = require('leaflet');

if (L.Polyline === undefined) {
  throw new Error('Cannot find L.Polyline');
}

function getLatLngsFlatten(polyline) {
  const latlngs = polyline.getLatLngs();

  if (latlngs.length > 0 && Array.isArray(latlngs[0])) {
    let result = [];
    for (let j = 0; j < latlngs.length; j += 1) {
      result = result.concat(latlngs[j]);
    }

    return result;
  }
  return latlngs;
}

L.Polyline.include({
  distanceTo(o) {
    const xLatLng = getLatLngsFlatten(this);
    const yLatLng = getLatLngsFlatten(o);

    const distances = {};

    const sizeX = xLatLng.length;
    const sizeY = yLatLng.length;

    let supX = Number.MIN_VALUE;
    let supY = Number.MIN_VALUE;

    for (let x = 0; x < sizeX; x += 1) {
      let infY = Number.MAX_VALUE;
      for (let y = 0; y < sizeY; y += 1) {
        const key = `${x}/${y}`;
        distances[key] = xLatLng[x].distanceTo(yLatLng[y]);
        if (distances[key] < infY) {
          infY = distances[key];
        }
      }

      if (infY > supX) {
        supX = infY;
      }
    }

    for (let y = 0; y < sizeY; y += 1) {
      let infX = Number.MAX_VALUE;
      for (let x = 0; x < sizeX; x += 1) {
        const key = `${x}/${y}`;
        if (distances[key] < infX) {
          infX = distances[key];
        }
      }

      if (infX > supY) {
        supY = infX;
      }
    }

    return Math.max(supX, supY);
  },
});
