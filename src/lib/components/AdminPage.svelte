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

	async function addScore(color: string, amount: number) {
		await updateDoc(mainRef, {
			[color]: increment(amount)
		});
	}

	const matchesRef = query(collection(db, 'matches'), orderBy('createdAt', 'desc'));

	let matches: Array<DuoMatch | QuadMatch> = [];

	let mainScores: QuadMatch = {
		title: 'Main Score',
		id: 'main_score',
		createdAt: new Date().toISOString(),
		redScore: 0,
		yellowScore: 0,
		greenScore: 0,
		blueScore: 0
	};

	const mainScoreRef = doc(db, 'matches', 'main_score');

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

	const mainScoreUnsub = onSnapshot(mainScoreRef, (doc) => {
		const data = doc.data();

		if (data) {
			mainScores = {
				id: doc.id,
				...data
			} as QuadMatch;
		}
	});

	onDestroy(() => {
		matchesUnsub();
		mainScoreUnsub();
	});
</script>

<div class="page">
	<div class="admin">
		<h1>Admin page</h1>

		<button on:click={signOut}>Sign Out</button>

		<div class="main-score">
			<div class="score-changer red">
				<h3>{mainScores.redScore}</h3>

				<div>
					<button on:click={() => addScore('redScore', 1)}>+</button>
					<button on:click={() => addScore('redScore', -1)}>-</button>
				</div>
			</div>

			<div class="score-changer yellow">
				<h3>{mainScores.yellowScore}</h3>

				<div>
					<button on:click={() => addScore('yellowScore', 1)}>+</button>
					<button on:click={() => addScore('yellowScore', -1)}>-</button>
				</div>
			</div>

			<div class="score-changer green">
				<h3>{mainScores.greenScore}</h3>

				<div>
					<button on:click={() => addScore('greenScore', 1)}>+</button>
					<button on:click={() => addScore('greenScore', -1)}>-</button>
				</div>
			</div>

			<div class="score-changer blue">
				<h3>{mainScores.blueScore}</h3>

				<div>
					<button on:click={() => addScore('blueScore', 1)}>+</button>
					<button on:click={() => addScore('blueScore', -1)}>-</button>
				</div>
			</div>
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
		max-width: 40rem;
		gap: 1rem;
	}

	.main-score {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;

		gap: 1rem;
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
</style>
