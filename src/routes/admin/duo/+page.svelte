<script lang="ts">
	import { goto } from '$app/navigation';
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
			createdAt: Date.now().toString(),
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
			<option value="red">Red</option>
			<option value="yellow">Yellow</option>
			<option value="green">Green</option>
			<option value="blue">Blue</option>
		</select>

		<label for="color2">Color 2:</label>
		<select bind:value={color2}>
			<option value="red">Red</option>
			<option value="yellow">Yellow</option>
			<option value="green">Green</option>
			<option value="blue">Blue</option>
		</select>

		<input type="submit" value="Submit" />
	</form>

	<a href="/admin">Back</a>
</main>

<style>
	form {
		display: flex;
		flex-direction: column;
	}
</style>
