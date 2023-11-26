<script lang="ts">
	import { isDuoMatch, type DuoMatch, type QuadMatch, QuadColourIndex } from '$lib';
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
		id: '000000',
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

	const matchQuery = query(collection(db, 'matches'), orderBy('createdAt', 'desc'));

	const ubsubMatches = onSnapshot(matchQuery, (snapshot) => {
		matches = [];
		snapshot.forEach((doc) => {
			const data = doc.data();

			if (!isDuoMatch(data)) {
				// It's a QuadMatch
				matches.push({
					id: doc.id,
					...data
				} as QuadMatch);
			} else {
				// It's a DuoMatch
				matches.push({
					id: doc.id,
					...data
				} as DuoMatch);
			}
		});
	});

	onDestroy(() => {
		ubsubMain();
		ubsubMatches();
	});
</script>

<div class="page">
	<div class="section main-section">
		<div class="title">
			<img src="/rainbow.webp" alt="hand holding paper" style="object-fit:contain" />
			<div class="text-title">
				<h2 class="green-round">ผลคะแนนรวม</h2>
				<h1>Total Scores</h1>
			</div>
		</div>

		<div class="main-chart">
			<QuadChart scores={[data.redScore, data.yellowScore, data.greenScore, data.blueScore]} />
		</div>

		<p style="text-align: center">
			<strong>{getLeadingColor(data)}</strong> is currently in the lead
		</p>
	</div>

	<div class="section match-section">
		<h2>การแข่งขันล่าสุด</h2>
		<p>Recent Matches</p>

		<hr />

		<!-- Sport previews -->
		<div class="matches">
			{#each matches as match}
				<!-- content here -->
				<a href={`/${match.id}`}>
					<MatchPreview title={match.title} data={match} />
				</a>
			{/each}
		</div>
	</div>
</div>

<style>
	.title {
		display: flex;
		flex-direction: row;
		/* flex-wrap: wrap; */

		justify-content: center;
		align-content: center;
		margin: 2rem auto 0;
		width: 100%;

		gap: 1rem;

		/* text-align: center; */
	}

	.text-title {
		display: flex;
		flex-direction: column;
		justify-content: center;

		text-align: center;
		gap: 0.5rem;

		&:h1 {
			font-size: 5rem;
			margin: 0;
		}

		&:h2 {
			font-size: 1rem;
			margin: 0;
		}

		@media (max-width: 768px) {
			&:h1 {
				font-size: 3rem;
			}

			&:h2 {
				font-size: 1rem;
			}
		}
	}
	img {
		/* position: absolute; */
		/* width: 100%; */
		height: 13em;
		/* flex: 0; */
		z-index: 0;
	}
	.main-section {
		flex: 3;
	}

	.match-section {
		flex: 2;
		gap: 2rem;
	}

	.main-chart {
		height: 40rem;
	}

	.matches {
		display: flex;
		flex-direction: column;
		overflow-y: scroll;

		gap: 1rem;
	}

	.green-round {
		background-color: var(--green);
		border-radius: 3rem;
		padding: 1rem;
	}
</style>
