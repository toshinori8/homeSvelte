<script>
	import { onMount } from "svelte";
	import * as d3 from "d3";
	import * as turf from "@turf/turf";
  import {location} from "$lib/stores/appStore"

  export let cityPolygon = {}
  let polygonPoints= {}
	// export let cityPolygon = {
		// type: 'Feature',
		// properties: {},
		// geometry: {
		// 	type: 'Polygon',
		// 	coordinates: [
		// 		[
  //         [20, 20],
		// 			[80, 100],
		// 			[100, 50],
		// 			[60, 15],
		// 			[50, 50]
		// 		]
		// 	]
		// }
	// };


  



  
function drawImage(){
 


console.log(cityPolygon)

  // cityPolygon = turf.transformScale(cityPolygon, 3);

  
  // let polygonPoints = cityPolygon.geometry.coordinates[0];
	
  
  let dotSpacing = 8;
	let shiftDistance = -dotSpacing / 3;



  const minX = Math.min(...cityPolygon.geometry.coordinates[0].map(coord => coord[0]));
    const minY = Math.min(...cityPolygon.geometry.coordinates[0].map(coord => coord[1]));

    const adjustedPoints = cityPolygon.geometry.coordinates[0].map(coord => [coord[0] - minX, coord[1] - minY]);
    polygonPoints = adjustedPoints.map(coord => `${coord[0]},${coord[1]}`).join(' ');


		let svg = d3.select('.polygonMAP').append('svg').attr('width', 400).attr('height', 460);
		svg.append('polygon').attr('points', polygonPoints)
			.style('fill', 'red').style('stroke', 'red');


      // svg.append("polygon")
      // .attr("points", polygonPoints)
      // .style("fill", t.url());


		// var xAxis = d3.range(0, 500, dotSpacing);
		// var yAxis = d3.range(0, 500, dotSpacing);

		// yAxis.forEach((y, i) => {
		// 	xAxis.forEach(x => {
		// 		if (turf.booleanPointInPolygon([x, y], polygonPoints)) {
		//           svg.append('circle')
		// 				.attr('cx', x + (i % 2 === 0 ? 0 : shiftDistance))
		// 				.attr('cy', y)
		// 				.attr('r', dotSpacing/3)
		// 				.style('fill', 'rgba(72, 165, 227, 1.000)');
		// 		}
		// 	});
		// });


}

$: cityPolygon = {

  
};

$: {
		if (cityPolygon.geometry) {
		
    console.log("Building");
      drawImage();
		}
	}



</script>

<div class="polygonMAP"></div>

<style>
    .polygonMAP {
        border: 1px solid #ccc;
        height: 500px;
        width: 500px;
    }
	.circle {
		transform-origin: center;
	}
</style>