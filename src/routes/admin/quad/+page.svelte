<script lang="ts">
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase';
	import { addDoc, collection } from 'firebase/firestore';

	let title: string;

	async function createQuad() {
		const quadRef = collection(db, 'matches');

		await addDoc(quadRef, {
			title,
			createdAt: Date.now(),
			redScore: 0,
			yellowScore: 0,
			greenScore: 0,
			blueScore: 0
		}).then(() => {
			goto('/admin');
		});
	}
</script>

<main class="page">
	<form on:submit|preventDefault={createQuad}>
		<input type="text" placeholder="Title" required bind:value={title} />
		<button type="submit" value="Submit">Create</button>
	</form>

	<a href="/admin">Back</a>
</main>

<style lang="scss">
	.page {
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
