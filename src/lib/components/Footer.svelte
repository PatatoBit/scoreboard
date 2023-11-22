<!-- simple responsive footer -->
<script>
	let year = new Date().getFullYear();
</script>

<footer>
	<p>&copy; {year} Made with 🪄 by Patato</p>
</footer>

<style>
	footer {
		background-color: #333;
		color: white;
		padding: 1em;
		text-align: center;
		width: 100%;
	}

	@media (max-width: 600px) {
		footer {
			position: static;
		}
	}
</style>
