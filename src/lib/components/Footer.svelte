<!-- simple responsive footer -->
<script>
	let year = new Date().getFullYear();
</script>

<footer>
	<p>&copy; {year} Made with 🪄 by Patato</p>
	<a href="/admin">Admin</a>
</footer>

<style>
	footer {
		background-color: var(--blackbg);
		padding: 1em;
		text-align: center;
		width: 100%;
		color: var(--whitebg);
	}

	@media (max-width: 600px) {
		footer {
			position: static;
		}
	}
</style>
