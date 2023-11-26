<script lang="ts">
	import { page } from '$app/stores';
	import { db } from '$lib/firebase';
	import {
		collection,
		deleteDoc,
		doc,
		increment,
		onSnapshot,
		query,
		updateDoc,
		where
	} from 'firebase/firestore';
	import type { matchPage } from './+page';
	import { getColorName, type DuoMatch, type QuadMatch, QuadColourIndex } from '$lib';
	import { onDestroy } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: matchPage;

	export let match: DuoMatch | QuadMatch;

	const docRef = doc(db, 'matches', data.id);

	const unsub = onSnapshot(docRef, (doc) => {
		match = doc.data() as DuoMatch | QuadMatch;
	});

	async function addDuo(index: 1 | 2, amount: number) {
		await updateDoc(docRef, {
			[`scores.score${index}`]: increment(amount)
		});
	}

	async function addQuad(index: 1 | 2 | 3 | 4, amount: number) {
		await updateDoc(docRef, {
			[`${QuadColourIndex[index]}Score`]: increment(amount)
		});

		console.log(`colors.${QuadColourIndex[index]}Score`);
	}

	async function deleteMatch() {
		try {
			await deleteDoc(docRef).then(() => {
				goto('/admin', { replaceState: true }).then(() => location.reload());
			});
		} catch (error) {
			console.error('Error removing document: ', error);
		}
	}

	onDestroy(() => {
		unsub();
	});
</script>

<main class="page">
	{#if match}
		<h1>{match.title}</h1>

		{#if match && 'scores' in match}
			<div class="colours">
				<div class="colour-side">
					<p>{getColorName(match.colors.color1)}</p>
					<p>{match.scores.score1}</p>

					<button on:click={() => addDuo(1, 1)}>+</button>
					<button on:click={() => addDuo(1, -1)}>-</button>
				</div>

				<div class="colour-side">
					<p>{getColorName(match.colors.color2)}</p>
					<p>{match.scores.score2}</p>

					<button on:click={() => addDuo(2, 1)}>+</button>
					<button on:click={() => addDuo(2, -1)}>-</button>
				</div>
			</div>
		{:else if match && 'redScore' in match}
			<div class="colours">
				<div>
					<h3>Red</h3>
					<p>{match.redScore}</p>
					<button on:click={() => addQuad(1, 1)}>+</button>
					<button on:click={() => addQuad(1, -1)}>-</button>
				</div>

				<div>
					<h3>Yellow</h3>
					<p>{match.yellowScore}</p>
					<button on:click={() => addQuad(2, 1)}>+</button>
					<button on:click={() => addQuad(2, -1)}>-</button>
				</div>

				<div>
					<h3>Green</h3>
					<p>{match.greenScore}</p>
					<button on:click={() => addQuad(3, 1)}>+</button>
					<button on:click={() => addQuad(3, -1)}>-</button>
				</div>

				<div>
					<h3>Blue</h3>
					<p>{match.blueScore}</p>
					<button on:click={() => addQuad(4, 1)}>+</button>
					<button on:click={() => addQuad(4, -1)}>-</button>
				</div>
			</div>
		{:else}
			<p>else</p>
		{/if}

		<button on:click={deleteMatch}>Delete</button>
		<a href="/admin">Back</a>
	{:else}
		<p>No Data</p>
		<a href="/admin">Go Back</a>
	{/if}
</main>

<style lang="scss">
	.page {
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.colours {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 2rem;
	}
</style>
