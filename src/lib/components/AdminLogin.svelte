<script lang="ts">
	import { signIn } from '$lib/auth';

	let email: string;
	let password: string;
	let error: boolean = false;

	function submit(email: string, password: string) {
		try {
			signIn(email, password);
		} catch (error) {
			console.error(error);
			error = true;
		}
	}
</script>

<div class="page">
	<form on:submit|preventDefault={() => submit(email, password)}>
		<input type="text" placeholder="Email" required bind:value={email} />
		<input type="password" placeholder="Password" required bind:value={password} />
		<button type="submit" value="Submit">Login</button>

		{#if error}
			<p>Try Again</p>
		{/if}
	</form>

	<a href="/">Go Back</a>
</div>

<style lang="scss">
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
</style>
