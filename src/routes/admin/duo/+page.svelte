<script lang="ts">
	import { goto } from '$app/navigation';
	import { colours } from '$lib/colours';
	import { db } from '$lib/firebase';
	import { addDoc, collection } from 'firebase/firestore';

	let title: string;
	let color1: string;
	let color2: string;

	async function createDuo() {
		console.table({ title, color1, color2 });

		const duoRef = collection(db, 'matches');

		await addDoc(duoRef, {
			title,
			createdAt: Date.now(),
			colors: {
				color1,
				color2
			},
			scores: {
				score1: 0,
				score2: 0
			}
		}).then(() => {
			alert('Created!');
			goto('/admin');
		});
	}
</script>

<main class="page">
	<form on:submit|preventDefault={createDuo}>
		<input type="text" placeholder="Title" required bind:value={title} />

		<label for="color1">Color 1:</label>
		<select bind:value={color1}>
			<option value={colours.Red}>Red</option>
			<option value={colours.Yellow}>Yellow</option>
			<option value={colours.Green}>Green</option>
			<option value={colours.Blue}>Blue</option>
		</select>

		<label for="color2">Color 2:</label>
		<select bind:value={color2}>
			<option value={colours.Red}>Red</option>
			<option value={colours.Yellow}>Yellow</option>
			<option value={colours.Green}>Green</option>
			<option value={colours.Blue}>Blue</option>
		</select>

		<input type="submit" value="Submit" />
	</form>

	<a href="/admin">Back</a>
</main>

<style>
	.page {
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	form {
		display: flex;
		flex-direction: column;
	}
</style>
