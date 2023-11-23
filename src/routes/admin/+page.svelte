<script lang="ts">
	import AdminLogin from '$lib/components/AdminLogin.svelte';
	import AdminPage from '$lib/components/AdminPage.svelte';

	import { authUser } from '$lib/auth';
</script>

<div class="page">
	{#if $authUser}
		<!-- content here -->
		<AdminPage />
	{:else}
		<!-- else content here -->
		<AdminLogin />
	{/if}
</div>
