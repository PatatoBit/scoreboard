<script>
	import QuadChart from '../lib/components/QuadChart.svelte';
</script>

<div class="page">
	<div class="section">
		<div class="title">
			<img src="/sport.webp" alt="Sports" />
			<div>
				<h1>ผลคะแนนกีฬาสี</h1>
				<h2>Sports Scoreboard</h2>
			</div>
		</div>

		<QuadChart />

		<p style="text-align: center"><strong>Red</strong> is currently in the lead</p>
	</div>

	<div class="section">
		<h2>การแข่งขันล่าสุด</h2>
		<h3>Recent Matches</h3>

		<hr />

		<!-- Sport previews -->
	</div>
</div>

<style>
	.title {
		display: flex;
		flex-direction: row;
	}

	img {
		/* position: absolute; */
		width: 17rem;
		z-index: 0;
	}
</style>
