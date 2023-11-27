<script lang="ts">
	import { doc, onSnapshot } from 'firebase/firestore';
	import type { matchPage } from './+page';
	import { db } from '$lib/firebase';
	import type { DuoMatch, QuadMatch } from '$lib';
	import { onDestroy } from 'svelte';
	import DuoBar from '$lib/components/DuoBar.svelte';
	import QuadChart from '$lib/components/QuadChart.svelte';

	export let data: matchPage;
	let match = {} as DuoMatch | QuadMatch;

	const docRef = doc(db, 'matches', data.id);

	const ubsub = onSnapshot(docRef, (doc) => {
		match = doc.data() as DuoMatch | QuadMatch;
	});

	onDestroy(() => {
		ubsub();
	});
</script>

<div class="page">
	<h1 id="title">{match.title}</h1>

	{#if match && 'scores' in match}
		<div class="score">
			<DuoBar
				score1={match.scores.score1}
				score2={match.scores.score2}
				color1={match.colors.color1}
				color2={match.colors.color2}
				numberSize="5rem"
			/>
		</div>
	{:else if match && 'redScore' in match}
		<!-- else if content here -->
		<div class="score">
			<QuadChart scores={[match.redScore, match.yellowScore, match.greenScore, match.blueScore]} />
		</div>
	{/if}
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	#title {
		flex: 0;
	}

	.score {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		flex: 1 1 0;
	}
</style>
