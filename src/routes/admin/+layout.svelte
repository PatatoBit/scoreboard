<script>
	import { authUser } from '$lib/auth';
	import AdminLogin from '$lib/components/AdminLogin.svelte';
</script>

{#if $authUser}
	<slot />
{:else}
	<div class="page">
		<AdminLogin />
	</div>
{/if}
