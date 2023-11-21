<script lang="ts">
	import { Bar } from 'svelte-chartjs';
	import { data } from './../index';

	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	const chartOptions = {
		scales: {
			x: { display: false }, // Hide x-axis
			y: { display: false } // Hide y-axis
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
</script>

<Bar {data} options={chartOptions} />
