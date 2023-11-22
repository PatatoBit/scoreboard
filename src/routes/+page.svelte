<script lang="ts">
	import { basketballData, running400, type QuadMatch } from '$lib';
	import { colours } from '$lib/colours';
	import DuoBar from '$lib/components/DuoBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import MatchPreview from '$lib/components/MatchPreview.svelte';
	import { doc, onSnapshot } from 'firebase/firestore';
	import QuadChart from '../lib/components/QuadChart.svelte';
	import { db } from '$lib/firebase';

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

	let data: QuadMatch = {
		redScore: 0,
		yellowScore: 0,
		greenScore: 0,
		blueScore: 0
	};

	const mainRef = doc(db, 'matches', 'main_score');

	const unsub = onSnapshot(mainRef, (doc) => {
		data = doc.data() as QuadMatch;
		console.table(data);
	});
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
			<QuadChart scores={[data.redScore, data.yellowScore, data.greenScore, data.blueScore]} />
		</div>

		<p style="text-align: center">
			<strong>{getLeadingColor(data)}</strong> is currently in the lead
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

<Footer />

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
