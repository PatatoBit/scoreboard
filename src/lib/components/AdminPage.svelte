<script lang="ts">
	import {
		collection,
		doc,
		increment,
		onSnapshot,
		orderBy,
		query,
		updateDoc
	} from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { signOut } from '$lib/auth';
	import { onDestroy } from 'svelte';
	import type { DuoMatch, QuadMatch } from '$lib';

	import { page } from '$app/stores';

	const mainRef = doc(db, 'matches', 'main_score');

	async function addScore(color: string) {
		await updateDoc(mainRef, {
			[color]: increment(1)
		});
	}

	const matchesRef = query(collection(db, 'matches'), orderBy('createdAt'));

	let matches: Array<DuoMatch | QuadMatch> = [];

	const matchesUnsub = onSnapshot(matchesRef, (snapshot) => {
		matches = [];
		snapshot.forEach((doc) => {
			matches = [...matches, doc.data() as DuoMatch | QuadMatch];
		});
	});

	onDestroy(() => {
		matchesUnsub();
	});
</script>

<div>
	<h1>Admin page</h1>

	<button on:click={signOut}>Sign Out</button>

	<div class="main-score">
		<button class="red" on:click={() => addScore('redScore')}>Red</button>
		<button class="yellow" on:click={() => addScore('yellowScore')}>Yellow</button>
		<button class="green" on:click={() => addScore('greenScore')}>Green</button>
		<button class="blue" on:click={() => addScore('blueScore')}>Blue</button>
	</div>

	<h2>Matches</h2>

	<br />
	<hr />
	<br />

	<div class="matches">
		{#each matches as match}
			<div class="admin-match">
				<h3><strong>{match.title}</strong></h3>
				<p>{new Date(match.createdAt).toLocaleString()}</p>

				<a href="/admin/{match.createdAt}">Edit 📝</a>
			</div>
		{/each}
	</div>
</div>

<div class="create-buttons">
	<a href="/admin/duo">Duo</a>
	<a href="/admin/quad">Quad</a>
</div>

<style lang="scss">
	.main-score {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.matches {
		display: flex;
		flex-direction: column;

		gap: 0.5rem;
	}

	.admin-match {
		display: flex;
		flex-direction: row;

		border: 1px solid var(--text);
		border-radius: 0.4rem;
		padding: 0.5rem;

		gap: 1rem;
		align-items: center;
	}

	.red {
		background-color: var(--red);
	}

	.yellow {
		background-color: var(--yellow);
	}

	.green {
		background-color: var(--green);
	}

	.blue {
		background-color: var(--blue);
	}
</style>
