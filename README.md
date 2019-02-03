# Leaflet Hausdorff Distance

This plugins enables you to compute distance between two `L.PolyLine` objects using the [Hausdorff distance](https://en.wikipedia.org/wiki/Hausdorff_distance).

## Installing

Put the _L.Polyline.HausdorffDistance_ script after the Leaflet one:

```
<script src="leaflet.js"></script>
<script src="L.Polyline.HausdorffDistance.min.js"></script>
```

## Usage

This plugins adds two methods to `L.Polyline` objects:

- `distanceTo(other: L.Polyline, resampling?: number)`: computes the distance
- `furthestFrom(other: L.Polyline, resampling?: number)`: returns the two furthest points

Given two `L.Polyline` objects `a` and `b`, get the distance between `a` and `b` simply by calling `a.distanceTo(b)`.

For better results, the methods resample the polylines down to at least one point every 10 meters. You can turn it off by passing `null` as `resampling` parameter.
