<script lang="ts">
	import { db } from '$lib/firebase';
	import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
	import type { matchPage } from './+page';
	import type { DuoMatch, QuadMatch } from '$lib';

	export let data: matchPage;

	export let match: DuoMatch | QuadMatch;

	const docRef = doc(db, 'matches', data.id);

	const unsub = onSnapshot(docRef, (doc) => {
		match = doc.data() as DuoMatch | QuadMatch;

		console.table(match);
	});
</script>

<h1>{data.id}</h1>
<p>{JSON.stringify(match)}</p>

<!-- If match is a type of DuoMatch -->
