<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import textures from 'textures';

  let cityPolygon = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [0, 0],
          [400, 280],
          [20, 280],
          [120, 180],
          [0, 0]
        ]
      ]
    }
  };

  let polygonPoints = '';

  onMount(() => {
    const minX = Math.min(...cityPolygon.geometry.coordinates[0].map(coord => coord[0]));
    const minY = Math.min(...cityPolygon.geometry.coordinates[0].map(coord => coord[1]));

    const adjustedPoints = cityPolygon.geometry.coordinates[0].map(coord => [coord[0] - minX, coord[1] - minY]);
    polygonPoints = adjustedPoints.map(coord => `${coord[0]},${coord[1]}`).join(' ');

    console.log(polygonPoints);

    const svg = d3.select(".polygonMAP")
      .append("svg")
      .attr("width", 400)
      .attr("height", 300);

    const t = textures.circles()
      .radius(4)
      .fill("darkorange")
      .strokeWidth(2)
      .stroke("firebrick")
      .complement();

    svg.call(t);

    svg.append("polygon")
      .attr("points", polygonPoints)
      .style("fill", t.url());
  });
</script>
<style>
  .polygonMAP {
    border: 1px solid #ccc;
  }
</style>

<!-- Map container -->
<div class="polygonMAP"></div>