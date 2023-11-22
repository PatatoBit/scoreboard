<script lang="ts">
	import { db } from '$lib/firebase';
	import MatchForm from '$lib/components/MatchForm.svelte';
	import { addDoc, collection, doc, increment, updateDoc } from 'firebase/firestore';

	const mainRef = doc(db, 'matches', 'main_score');

	async function addScore(color: string) {
		await updateDoc(mainRef, {
			[color]: increment(1)
		});
	}

	const matchesRef = collection(db, 'matches');

	async function createDuo() {
		await addDoc(matchesRef, {
			title: 'บาสเกตบอลชาย',
			matchType: 'duo',
			teamColors: {
				color1: 'red',
				color2: 'yellow'
			},
			scores: {
				color1: 15,
				color2: 10
			}
		});
	}
</script>

<div class="page">
	<div>
		<h1>Admin page</h1>
		<div class="main-score">
			<button class="red" on:click={() => addScore('redScore')}>Red</button>
			<button class="yellow" on:click={() => addScore('yellowScore')}>Yellow</button>
			<button class="green" on:click={() => addScore('greenScore')}>Green</button>
			<button class="blue" on:click={() => addScore('blueScore')}>Blue</button>
		</div>

		<MatchForm />
	</div>

	<button on:click={createDuo}>TEST</button>
</div>

<style lang="scss">
	.main-score {
		display: flex;
		justify-content: center;
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
