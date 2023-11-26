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

{#if match && 'scores' in match}
	<h1>{match.title}</h1>
	<DuoBar
		score1={match.scores.score1}
		score2={match.scores.score2}
		color1={match.colors.color1}
		color2={match.colors.color2}
	/>
{:else if match && 'redScore' in match}
	<!-- else if content here -->
	<h1>{match.title}</h1>
	<QuadChart scores={[match.redScore, match.yellowScore, match.greenScore, match.blueScore]} />
{/if}
