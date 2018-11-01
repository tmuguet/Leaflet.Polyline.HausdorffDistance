# Leaflet Hausdorff Distance

This plugins enables you to compute distance between two `L.PolyLine` objects using the [Hausdorff distance](https://en.wikipedia.org/wiki/Hausdorff_distance).

## Installing

Put the _L.Polyline.HausdorffDistance_ script after the Leaflet one:

```
<script src="leaflet.js"></script>
<script src="L.Polyline.HausdorffDistance.min.js"></script>
```

## Usage

This plugins adds a method `distanceTo(L.Polyline other)` to the `L.Polyline` object.

Given two `L.Polyline` objects `a` and `b`, get the distance between `a` and `b` simply by calling `a.distanceTo(b)`.
