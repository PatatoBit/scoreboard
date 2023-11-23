<script lang="ts">
</script>

<main class="page">
	<form action="/create">
		<input type="text" placeholder="Title" required />

		<label for="color1">Color 1:</label>
		<select>
			<option value="red">Red</option>
			<option value="yellow">Yellow</option>
			<option value="green">Green</option>
			<option value="blue">Blue</option>
		</select>

		<label for="color2">Color 2:</label>
		<select>
			<option value="red">Red</option>
			<option value="yellow">Yellow</option>
			<option value="green">Green</option>
			<option value="blue">Blue</option>
		</select>

		<button type="submit" value="Submit">Create</button>
	</form>
</main>

<style>
	form {
		display: flex;
		flex-direction: column;
	}
</style>
