<script lang="ts">
	import { signIn } from '$lib/auth';

	let email: string;
	let password: string;
</script>

<form on:submit|preventDefault={() => signIn(email, password)}>
	<input type="text" placeholder="Email" required bind:value={email} />
	<input type="password" placeholder="Password" required bind:value={password} />
	<button type="submit" value="Submit">Login</button>
</form>

<a href="/">Go Back</a>
