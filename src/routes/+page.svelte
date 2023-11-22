<script lang="ts">
	import { basketballData, running400, type QuadMatch } from '$lib';
	import { colours } from '$lib/colours';
	import DuoBar from '$lib/components/DuoBar.svelte';
	import MatchPreview from '$lib/components/MatchPreview.svelte';
	import QuadChart from '../lib/components/QuadChart.svelte';

	function getLeadingColor(match: QuadMatch): string {
		const { redScore, yellowScore, greenScore, blueScore } = match;

		if (yellowScore > redScore && yellowScore > greenScore && yellowScore > blueScore) {
			return 'Yellow';
		} else if (redScore > yellowScore && redScore > greenScore && redScore > blueScore) {
			return 'Red';
		} else if (greenScore > yellowScore && greenScore > redScore && greenScore > blueScore) {
			return 'Green';
		} else if (blueScore > yellowScore && blueScore > redScore && blueScore > greenScore) {
			return 'Blue';
		} else {
			return "It's a tie";
		}
	}
</script>

<div class="page">
	<div class="section">
		<div class="title">
			<img src="/sport.webp" alt="Sports" style="object-fit:contain" />
			<div class="text-title">
				<h1>ผลคะแนนรวมกีฬาสี</h1>
				<h2>Total Scores</h2>
			</div>
		</div>

		<div class="main-chart">
			<QuadChart
				scores={[
					running400.redScore,
					running400.yellowScore,
					running400.greenScore,
					running400.blueScore
				]}
			/>
		</div>

		<p style="text-align: center">
			<strong>{getLeadingColor(running400)}</strong> is currently in the lead
		</p>
	</div>

	<div class="section">
		<h2>การแข่งขันล่าสุด</h2>
		<p>Recent Matches</p>

		<hr />

		<!-- Sport previews -->
		<div class="matches">
			<MatchPreview title="บาสเกตบอลชาย" status="On Going" data={basketballData} />
			<MatchPreview title="วิ่ง 4x100" status="Finished" data={running400} />

			<MatchPreview title="บาสเกตบอลชาย" status="On Going" data={basketballData} />
			<MatchPreview title="วิ่ง 4x100" status="Finished" data={running400} />

			<MatchPreview title="บาสเกตบอลชาย" status="On Going" data={basketballData} />
			<MatchPreview title="วิ่ง 4x100" status="Finished" data={running400} />
		</div>
	</div>
</div>

<style>
	.title {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		flex: 2;

		/* text-align: center; */
	}

	.text-title {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	img {
		/* position: absolute; */
		width: 17rem;
		z-index: 0;
	}

	.matches {
		display: flex;
		flex-direction: column;
		overflow-y: scroll;

		gap: 1rem;
	}

	.main-chart {
		flex: 5;
	}
</style>
