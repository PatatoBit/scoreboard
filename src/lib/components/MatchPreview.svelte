<script lang="ts">
	import QuadChart from './QuadChart.svelte';
	import type { DuoMatch, QuadMatch } from '$lib';
	import DuoBar from './DuoBar.svelte';

	export let title: string;
	export let status: string;
	export let data: DuoMatch[] | QuadMatch;
</script>

<div class="preview">
	<span>
		<h3><strong>{title}</strong></h3>
		<p>• {status}</p>
	</span>

	<!-- Sport previews -->

	{#if Array.isArray(data)}
		{#each data as match}
			<DuoBar
				score1={match.score1}
				score2={match.score2}
				color1={match.team1}
				color2={match.team2}
			/>
		{/each}
	{:else}
		<div class="preview-chart">
			<QuadChart scores={[data.redScore, data.yellowScore, data.greenScore, data.blueScore]} />
		</div>
	{/if}

	<hr />
</div>

<style lang="scss">
	.preview {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	hr {
		border: 1px dashed rgb(177, 177, 177);
	}

	.preview-chart {
		width: 100%;
		height: 10rem;
	}
</style>
