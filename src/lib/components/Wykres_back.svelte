<script>
	import { location, newLocation } from '$lib/stores/appStore';
	import { onMount, onDestroy } from 'svelte';
	import Loading from '$lib/components/loading.svelte';
	import { dayjs } from 'svelte-time';
	import * as d3 from 'd3';

	let date;
	let quarters = [];
	let currentQuarter_;
	let ready = false;
  	let data = [];
  	let mode = "edit"
  	const calculateQuarters = () => {
		quarters = [];

		for (let i = 0; i < 8; i++) {
			let date = dayjs().subtract(i * 3, 'month');
			let quarter = Math.floor(date.month() / 3) + 1;
			let year = date.year();
			let polishQuarter = `Kwartal ${quarter}, ${year}`;
			quarters.push(polishQuarter);
		}
	};
	calculateQuarters();
	const offset = 50;
	let generateWykres = () => {
		const margin = { top: 10, right: 90, bottom: 30, left: 40 };
		const width = 760 - margin.left - margin.right;
		const height = 280 - margin.top - margin.bottom;

		// Funkcja do generowania losowych danych dla każdego kwartału
		const generateData = () => {
		
			let currentDate = new Date();
			let currentYear = currentDate.getFullYear();
			let currentQuarter = Math.floor(currentDate.getMonth() / 3) + 1;
			let specificValue = $location.params.price; // Set specific value here

			let quarterCounter = 0;
			currentQuarter_ = `${currentQuarter} kw ${currentYear}`;

			// for (let i = currentYear; quarterCounter < 6; i--) {
			// 	for (let j = currentQuarter; j > 0 && quarterCounter < 6; j--, quarterCounter++) {
			// 		let timeLabel = `${j} kw ${i}`;
			// 		let value;

			// 		if (i === currentYear && j === currentQuarter) {
			// 			value = specificValue;
			// 		} else {
			// 			value = Math.floor(Math.random() * (32200 - 31200)) + 101200;
			// 		}

			// 		data.push({ timeLabel: timeLabel, value: value });
			// 	}
			// 	currentQuarter = 4; // reseting quarter to 4 after year change
			// }

			console.log(data);
			return data;
		};

		// Mock data dla każdego kwartału
		

		// Dodaj SVG do elementu o id "tablePrices"
		const svg = d3
			.select('#tablePrices')
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);
		// Add X axis
		const x = d3
			.scaleBand()
			.domain(data.map((d) => d.timeLabel).reverse())
			.range([0, width]);
		const xAxis = d3.axisBottom(x);
		xAxis.tickSize(0);
		svg.append('g').attr('transform', `translate(0, ${height})`).call(xAxis);

		// Add Y axis
		const y = d3
			.scaleLinear()
			.domain([d3.min(data, (d) => d.value), d3.max(data, (d) => d.value)])
			.range([height, 0]);
		svg
			.append('g')
			.call(d3.axisLeft(y))
			.selectAll('.tick line')
			.attr('stroke', 'var(--brand-green)');

		// Qurrent quarter

		const currentQuarterData = data.find((d) => d.timeLabel === currentQuarter_);

		svg
			.append('line')
			.attr('x1', 0)
			.attr('y1', y(currentQuarterData.value))
			.attr('x2', width)
			.attr('y2', y(currentQuarterData.value))
			.attr('stroke', 'var(--brand-green)')
			.attr('stroke-dasharray', '24');

		// Add the line
		const line = d3
			.line()
			.x((d) => x(d.timeLabel) + 40)
			.y((d) => y(d.value));

		svg
			.selectAll('myLines')
			.data([data])
			.join('path')
			.attr('d', (d) => line(d))
			.attr('stroke', 'var(--brand-green)')
			.style('stroke-width', 4)
			.style('fill', 'none');

		// Add the points
		const points = svg
			.selectAll('myDots')
			.data(data)
			.join('g')
			.attr('transform', (d) => `translate(${x(d.timeLabel) + 40}, ${y(d.value)})`);

		points
			.append('circle')
			.attr('r', 6)
			.attr('stroke', (d, i) => (i === 0 ? 'var(--brand-green)' : 'var(--brand-green)'))

			.attr('fill', (d, i) => (i === 0 ? 'var(--brand-green)' : 'white'));

		points
			.append('text')
			.text((d) => d.value)
			.attr('dx', +28)
			.attr('dy', +5)

			.attr('text-anchor', 'middle')
			.style('font-size', 12)
			.style('fill', 'var(--brand-dark)')
			.attr('transform', 'rotate(-90)');

		// Add legend
		// Calculate average value
		const averageValue = data.reduce((sum, point) => sum + point.value, 0) / data.length;

		svg
			.append('text')
			.attr('transform', `translate(${width + 10},${y(data[data.length - 1].value)})`)
			.attr('x', -120)
			.attr('y', data[data.length - 1].value > averageValue ? -10 : +40)
			.text('TO MIESZKANIE')
			.style('fill', 'var(--brand-green)')
			.style('font-size', 15);
	};

	onMount(async () => {
console.log('mount');
		data = 
          { timeLabel: '1 kw 2024', value: 100000 },
					{ timeLabel: '4 kw 2023', value: 101274 },
					{ timeLabel: '3 kw 2023', value: 102140 },
					{ timeLabel: '2 kw 2023', value: 101990 },
					{ timeLabel: '1 kw 2023', value: 102063 },
					{ timeLabel: '4 kw 2022', value: $location.params.price }
          

		// 	if ($location.params) {
			
	// 		if ($location.params.page03.wykresData.length =="") {
	// 			console.log('brak danych'); mode = 'create';
	// 			data = 
    //       { timeLabel: '1 kw 2024', value: 100000 },
	// 				{ timeLabel: '4 kw 2023', value: 101274 },
	// 				{ timeLabel: '3 kw 2023', value: 102140 },
	// 				{ timeLabel: '2 kw 2023', value: 101990 },
	// 				{ timeLabel: '1 kw 2023', value: 102063 },
	// 				{ timeLabel: '4 kw 2022', value: $location.params.price }
          
	// 			$location.params.page03.wykresData = data;
    //     ready= true
	// 		} else if($location.params.page03.wykresData.length > 0) {
    //     mode= 'edit';
	// 			data = $location.params.page03.wykresData;
       
    //     ready= true
    //   }

      

		}
    // console.log('$location.params.page03.wykresData',$location.params.page03.wykresData)
	);
</script>

{#if ready == false}
	<Loading />
{:else if ready == true}
	<div id="tablePrices" />
{/if}
