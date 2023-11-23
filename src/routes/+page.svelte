<script lang="ts">
	import type { DuoMatch, QuadMatch } from '$lib';
	import { colours } from '$lib/colours';
	import DuoBar from '$lib/components/DuoBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import MatchPreview from '$lib/components/MatchPreview.svelte';
	import { collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
	import QuadChart from '../lib/components/QuadChart.svelte';
	import { db } from '$lib/firebase';
	import { onDestroy } from 'svelte';

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
			return 'No one';
		}
	}

	let data: QuadMatch = {
		title: 'Loading...',
		createdAt: 'Loading...',
		redScore: 0,
		yellowScore: 0,
		greenScore: 0,
		blueScore: 0
	};

	let matches: Array<DuoMatch | QuadMatch> = [];

	const mainRef = doc(db, 'matches', 'main_score');

	const ubsubMain = onSnapshot(mainRef, (doc) => {
		data = doc.data() as QuadMatch;
	});

	const matchQuery = query(collection(db, 'matches'), orderBy('createdAt'));

	const ubsubMatches = onSnapshot(matchQuery, (snapshot) => {
		matches = [];
		snapshot.forEach((doc) => {
			matches = [...matches, doc.data() as DuoMatch | QuadMatch];
		});

		console.table(matches);
	});

	onDestroy(() => {
		ubsubMain();
		ubsubMatches();
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
			{#each matches as match}
				<!-- content here -->
				<MatchPreview title={match.title} status="On Going" data={match} />
			{/each}
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
