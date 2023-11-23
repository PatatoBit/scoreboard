<script lang="ts">
	import QuadChart from './QuadChart.svelte';
	import type { DuoMatch, QuadMatch } from '$lib';
	import DuoBar from './DuoBar.svelte';

	export let title: string;
	export let data: DuoMatch | QuadMatch;

	function instanceOfDuoMatch(object: any): object is DuoMatch {
		return 'scores' in object;
	}

	function instanceOfQuadMatch(object: any): object is QuadMatch {
		return 'redScore' in object;
	}
</script>

<div class="preview">
	<span>
		<h3><strong>{title}</strong></h3>
	</span>

	<!-- Sport previews -->

	{#if instanceOfDuoMatch(data)}
		<DuoBar
			score1={data.scores.score1}
			score2={data.scores.score2}
			color1={data.colors.color1}
			color2={data.colors.color2}
		/>
	{:else if instanceOfQuadMatch(data)}
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
