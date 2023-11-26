<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import '../styles/global.scss';
</script>

<!-- HTML Meta Tags -->
<title>ITS Sports Scoreboard</title>
<meta name="description" content="Online realtime scoreboard of the ITS Sports Festival" />

<!-- Facebook Meta Tags -->
<meta property="og:url" content="https://scoreboard-taupe.vercel.app/" />
<meta property="og:type" content="website" />
<meta property="og:title" content="ITS Sports Scoreboard" />
<meta property="og:description" content="Online realtime scoreboard of the ITS Sports Festival" />
<meta property="og:image" content="/banner.png" />

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta property="twitter:domain" content="scoreboard-taupe.vercel.app" />
<meta property="twitter:url" content="https://scoreboard-taupe.vercel.app/" />
<meta name="twitter:title" content="ITS Sports Scoreboard" />
<meta name="twitter:description" content="Online realtime scoreboard of the ITS Sports Festival" />
<meta name="twitter:image" content="/banner.png" />

<!-- Meta Tags Generated via https://www.opengraph.xyz -->

<slot />

<Footer />
