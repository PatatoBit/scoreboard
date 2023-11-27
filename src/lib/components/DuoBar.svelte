<script lang="ts">
	export let score1: number;
	export let score2: number;

	export let color1: string;
	export let color2: string;

	export let numberSize: string;
</script>

<div class="bar-container" style="--numberSize: {numberSize}">
	<div class="bar1" style="--score1:{score1 ? score1 : 1}; --color1:{color1}">
		{score1}
	</div>
	<div class="bar2" style="--score2:{score2 ? score2 : 1}; --color2:{color2}">
		{score2}
	</div>
</div>

<style lang="scss">
	.bar-container {
		display: flex;
		min-height: 100%;
		height: 100%;
		border-radius: 2rem;
		overflow: hidden;
		font-size: var(--numberSize);
	}

	.bar1,
	.bar2 {
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: bold;
	}

	.bar1 {
		flex: var(--score1);
		background-color: var(--color1);
	}

	.bar2 {
		flex: var(--score2);
		background-color: var(--color2);
	}
</style>
