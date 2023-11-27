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
	import { isDuoMatch, type DuoMatch, type QuadMatch } from '$lib';

	import { page } from '$app/stores';

	import Fa from 'svelte-fa';

	const mainRef = doc(db, 'matches', 'main_score');

	async function addScore(color: string) {
		await updateDoc(mainRef, {
			[color]: increment(1)
		});
	}

	const matchesRef = query(collection(db, 'matches'), orderBy('createdAt', 'desc'));

	let matches: Array<DuoMatch | QuadMatch> = [];

	const matchesUnsub = onSnapshot(matchesRef, (snapshot) => {
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

			console.table(data);
		});
	});

	onDestroy(() => {
		matchesUnsub();
	});
</script>

<div class="page">
	<div class="admin">
		<h1>Admin page</h1>

		<button on:click={signOut}>Sign Out</button>

		<div class="main-score">
			<button class="red" on:click={() => addScore('redScore')}>Red</button>
			<button class="yellow" on:click={() => addScore('yellowScore')}>Yellow</button>
			<button class="green" on:click={() => addScore('greenScore')}>Green</button>
			<button class="blue" on:click={() => addScore('blueScore')}>Blue</button>
		</div>

		<h2>Matches</h2>

		<hr />

		<div class="create-buttons">
			<a href="/admin/duo"><button>Duo</button></a>
			<a href="/admin/quad"><button>Quad</button></a>
		</div>

		<div class="matches">
			{#each matches as match}
				<div class="admin-match">
					<p><strong>{match.title}</strong></p>
					<!-- <p>{new Date(match.createdAt).toLocaleString()}</p> -->

					<a href="/admin/{match.id}"
						><img class="icon-button" src="/icons/edit.svg" alt="Edit" /></a
					>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.page {
		justify-content: center;
	}

	.admin {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

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

		border-radius: 0.4rem;
		background-color: white;

		box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
		padding: 1rem;

		gap: 1rem;
		align-items: center;

		* {
			flex: 1;
		}

		a {
			flex: 0;
			display: flex;
			justify-content: center;
		}
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
