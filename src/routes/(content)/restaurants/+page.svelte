<script lang="ts">
	import { env } from '$env/dynamic/public';
	import RestaurantMap, {
		METRIC_AXES,
		RANKS,
		RANK_COLORS,
		RANK_BLURBS
	} from './RestaurantMap.svelte';
	import { restaurants } from './restaurants';

	const apiKey = env.PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
	const mapId = env.PUBLIC_GOOGLE_MAPS_MAP_ID ?? 'DEMO_MAP_ID';
</script>

<svelte:head>
	<title>Restaurants | Kaze Wong</title>
	<meta
		name="description"
		content="A map of the restaurants I have been to, each with an overall rank and a five-axis breakdown."
	/>
</svelte:head>

<div class="flex justify-center">
	<h1 class="px-2">Restaurants</h1>
</div>

<h3 class="font-sans text-justify">
	I am the well-known "picky eater" in every group I eat with — not about what kind of food, but
	about how good it is. This is the running log: every restaurant I have been to and thought about
	afterwards, pinned on a map, with an overall rank and the five things I actually judge a place on.
</h3>

<h3 class="font-sans text-justify">
	Click a pin to see how a place scored. Expand the card for the notes and what I ordered.
</h3>

<RestaurantMap {restaurants} {apiKey} {mapId} height="34rem" />

<section id="how-i-rank">
	<h2>How I rank</h2>
	<p>
		The letter is the verdict — where the place lands overall, all things considered. The pentagon
		is the reason behind the verdict, because two restaurants can land on the same letter for
		completely different reasons.
	</p>

	<ul class="!list-none !p-0 my-4 space-y-2">
		{#each RANKS as rank (rank)}
			<li class="flex items-center gap-3">
				<span
					class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold text-gray-950"
					style="background-color: {RANK_COLORS[rank]}"
				>
					{rank}
				</span>
				<span class="font-sans">{RANK_BLURBS[rank]}</span>
			</li>
		{/each}
	</ul>

	<h2>The five axes</h2>
	<ol class="list-disc px-6">
		{#each METRIC_AXES as axis (axis.key)}
			<li class="font-sans text-justify">
				<span class="font-bold">{axis.label}</span>:
				{#if axis.key === 'deliciousness'}
					how good it tastes, full stop. No context, no excuses.
				{:else if axis.key === 'dailyness'}
					could I eat this every week and still want it? Some of the best meals I have had score
					terribly here.
				{:else if axis.key === 'novelty'}
					did it show me something I had not had before, or do better than the version I already
					knew?
				{:else if axis.key === 'preference'}
					how much I personally like it, taste be damned. This is the openly biased axis.
				{:else}
					does the whole package hold up — the room, the service, the drinks, the pacing — not just
					the plate.
				{/if}
			</li>
		{/each}
	</ol>
</section>
