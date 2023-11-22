<script lang="ts">
</script>

<form action="/create">
	<input type="text" placeholder="Title" required />

	<span>
		<div>
			<input type="radio" id="duo" name="matchType" value="duo" />
			<label for="duo">คู่สี</label>
		</div>

		<div>
			<input type="radio" id="quad" name="matchType" value="duo" />
			<label for="quad">ทุกสี</label>
		</div>
	</span>

	<!-- <input type="radio" id="matchType" name="matchType" value="quad" on:change={() => matchType = event..currentTarget.value}/> -->

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

<style>
	form {
		display: flex;
		flex-direction: column;
	}
</style>
