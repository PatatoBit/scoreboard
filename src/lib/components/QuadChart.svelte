<script lang="ts">
	import { Bar } from 'svelte-chartjs';
	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
	import { colours } from '$lib/colours';

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	const chartOptions = {
		maintainAspectRatio: false,
		// responvie: true,
		scales: {
			x: { display: false } // Hide x-axis
			// y: { display: false } // Hide y-axis
		},
		plugins: {
			legend: { display: false }, // Hide legend
			datalabels: {
				display: true,
				color: 'white', // Set label color
				anchor: 'end', // Set label anchor position
				align: 'end', // Set label alignment
				offset: 4 // Set label offset from the bar
			}
		},
		elements: {
			bar: {
				borderWidth: 0, // Hide bar borders
				borderRadius: 22 // Set border radius for the bars
			}
		}
	};

	export let scores: Array<number>;

	const data = {
		labels: ['Red', 'Blue', 'Yellow', 'Green'],
		datasets: [
			{
				label: 'Victories',
				data: scores,
				backgroundColor: [colours.Red, colours.Yellow, colours.Green, colours.Blue],
				hoverBackgroundColor: [colours.Red, colours.Yellow, colours.Green, colours.Blue]
			}
		]
	};

	$: data.datasets[0].data = scores.slice();
</script>

<div class="bar-container">
	<Bar {data} options={chartOptions} />
</div>

<style lang="scss">
	.bar-container {
		position: relative;
		margin: auto;
		width: 100%;
		height: 100%;
		/* aspect-ratio: 5/3; */
	}
</style>
