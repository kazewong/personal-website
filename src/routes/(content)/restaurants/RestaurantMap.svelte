<script module lang="ts">
	/**
	 * Self-contained restaurant map module.
	 *
	 * Drop this file anywhere in `src/`, feed it an array of `Restaurant` objects and a
	 * Google Maps JavaScript API key, and it renders:
	 *   - a Google map with one rank-coloured pin per restaurant
	 *   - a detail card (rank badge + pentagon metric chart) when a pin is clicked
	 *   - an expandable section with the tasting notes and the dishes that were ordered
	 *
	 * The only external requirement is the Google Maps JS API, which is loaded lazily at
	 * runtime from this file — there is nothing to `npm install`.
	 */

	export type Rank = 'S' | 'A' | 'B' | 'C' | 'D';

	/** Every axis of the pentagon, scored from 0 to `maxScore` (5 by default). */
	export type RestaurantMetrics = {
		deliciousness: number;
		dailyness: number;
		novelty: number;
		preference: number;
		completeness: number;
	};

	export type Restaurant = {
		/** Stable unique id, used for selection and deep links. */
		id: string;
		name: string;
		lat: number;
		lng: number;
		rank: Rank;
		metrics: RestaurantMetrics;
		cuisine?: string;
		/** Free-form location line, e.g. "Flushing, Queens". */
		area?: string;
		price?: '$' | '$$' | '$$$' | '$$$$';
		/** ISO date of the visit, e.g. "2026-05-14". */
		visited?: string;
		/** What I had. */
		dishes?: string[];
		/** The long-form note shown once the card is expanded. */
		notes?: string;
		/** Optional outbound link (their site, a Google Maps listing, a review...). */
		link?: string;
	};

	export const METRIC_AXES: { key: keyof RestaurantMetrics; short: string; label: string }[] = [
		{ key: 'deliciousness', short: 'Delicious', label: 'Deliciousness' },
		{ key: 'dailyness', short: 'Daily', label: 'Daily-ness' },
		{ key: 'novelty', short: 'Novelty', label: 'Novelty' },
		{ key: 'preference', short: 'Personal', label: 'My personal preference' },
		{ key: 'completeness', short: 'Complete', label: 'Completeness' }
	];

	export const RANKS: Rank[] = ['S', 'A', 'B', 'C', 'D'];

	export const RANK_COLORS: Record<Rank, string> = {
		S: '#f43f5e',
		A: '#fb923c',
		B: '#fbbf24',
		C: '#4ade80',
		D: '#60a5fa'
	};

	export const RANK_BLURBS: Record<Rank, string> = {
		S: 'Worth a trip on its own. I will go back at the first excuse.',
		A: 'Excellent. Happily recommend it to anyone.',
		B: 'Solid. Would return if I am in the neighbourhood.',
		C: 'Fine, but nothing pulls me back.',
		D: 'Not worth the calories.'
	};

	/* eslint-disable @typescript-eslint/no-explicit-any */

	/** Loads the Google Maps JS API once per page, no matter how many maps are mounted. */
	let mapsLoader: Promise<any> | null = null;

	function loadGoogleMaps(apiKey: string): Promise<any> {
		if (mapsLoader) return mapsLoader;
		mapsLoader = new Promise((resolve, reject) => {
			const w = window as any;
			if (w.google?.maps?.importLibrary) {
				resolve(w.google.maps);
				return;
			}
			const callbackName = '__restaurantMapReady';
			w[callbackName] = () => resolve(w.google.maps);
			const script = document.createElement('script');
			script.src =
				'https://maps.googleapis.com/maps/api/js' +
				`?key=${encodeURIComponent(apiKey)}` +
				'&v=weekly&libraries=marker&loading=async' +
				`&callback=${callbackName}`;
			script.async = true;
			script.onerror = () => {
				mapsLoader = null;
				reject(new Error('The Google Maps script failed to load.'));
			};
			document.head.appendChild(script);
		});
		return mapsLoader;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		restaurants: Restaurant[];
		/** Google Maps JS API key. Without it the map is replaced by a friendly notice. */
		apiKey?: string;
		/** A Map ID is required for advanced markers. `DEMO_MAP_ID` is fine while developing. */
		mapId?: string;
		center?: { lat: number; lng: number };
		zoom?: number;
		/** Any CSS length, applied to the map canvas. */
		height?: string;
		/** Top of the metric scale. */
		maxScore?: number;
	}

	let {
		restaurants,
		apiKey = '',
		mapId = 'DEMO_MAP_ID',
		center = { lat: 40.7128, lng: -74.006 },
		zoom = 11,
		height = '32rem',
		maxScore = 5
	}: Props = $props();

	let mapElement: HTMLDivElement | null = $state(null);
	let map: any = $state(null);
	let status: 'loading' | 'ready' | 'error' = $state('loading');
	let errorMessage = $state('');

	let selectedId: string | null = $state(null);
	let expanded = $state(false);
	let rankFilter: Rank | 'ALL' = $state('ALL');

	/** Not reactive on purpose: Google's marker objects are mutated in place. */
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	let markers = new Map<string, { marker: any; element: HTMLElement }>();
	let AdvancedMarkerElement: any = null;

	let shown = $derived(
		rankFilter === 'ALL' ? restaurants : restaurants.filter((r) => r.rank === rankFilter)
	);
	let selected = $derived(restaurants.find((r) => r.id === selectedId) ?? null);

	function select(restaurant: Restaurant, panTo = true) {
		expanded = selectedId === restaurant.id ? expanded : false;
		selectedId = restaurant.id;
		if (panTo && map) {
			map.panTo({ lat: restaurant.lat, lng: restaurant.lng });
		}
	}

	function pinStyle(rank: Rank, isSelected: boolean) {
		return [
			'display:flex',
			'align-items:center',
			'justify-content:center',
			'width:2rem',
			'height:2rem',
			'border-radius:9999px',
			'font-weight:700',
			'font-size:0.9rem',
			'line-height:1',
			'cursor:pointer',
			'color:#0b1120',
			`background:${RANK_COLORS[rank]}`,
			`border:2px solid ${isSelected ? '#ffffff' : 'rgba(255,255,255,0.7)'}`,
			`box-shadow:0 2px 6px rgba(0,0,0,0.45)${isSelected ? ',0 0 0 6px rgba(255,255,255,0.25)' : ''}`,
			`transform:scale(${isSelected ? 1.25 : 1})`,
			'transition:transform 120ms ease, box-shadow 120ms ease'
		].join(';');
	}

	function createMarker(restaurant: Restaurant, googleMap: any) {
		const element = document.createElement('div');
		element.textContent = restaurant.rank;
		element.title = restaurant.name;
		element.setAttribute('role', 'button');
		element.setAttribute('tabindex', '0');
		element.setAttribute('aria-label', `${restaurant.name}, rank ${restaurant.rank}`);
		element.addEventListener('click', () => select(restaurant, false));
		element.addEventListener('keydown', (event: KeyboardEvent) => {
			if (event.key !== 'Enter' && event.key !== ' ') return;
			event.preventDefault();
			select(restaurant, false);
		});
		const marker = new AdvancedMarkerElement({
			map: googleMap,
			position: { lat: restaurant.lat, lng: restaurant.lng },
			content: element,
			title: restaurant.name
		});
		return { marker, element };
	}

	function fitToMarkers(maps: any) {
		if (!map || restaurants.length === 0) return;
		if (restaurants.length === 1) {
			map.setCenter({ lat: restaurants[0].lat, lng: restaurants[0].lng });
			return;
		}
		const bounds = new maps.LatLngBounds();
		for (const restaurant of restaurants) {
			bounds.extend({ lat: restaurant.lat, lng: restaurant.lng });
		}
		map.fitBounds(bounds, 64);
	}

	onMount(() => {
		if (!apiKey) {
			status = 'error';
			errorMessage = 'No Google Maps API key was provided, so the map cannot be displayed.';
			return;
		}
		let cancelled = false;
		loadGoogleMaps(apiKey)
			.then(async (maps: any) => {
				if (cancelled || !mapElement) return;
				const { Map: GoogleMap } = await maps.importLibrary('maps');
				({ AdvancedMarkerElement } = await maps.importLibrary('marker'));
				if (cancelled || !mapElement) return;
				map = new GoogleMap(mapElement, {
					center,
					zoom,
					mapId,
					colorScheme: 'DARK',
					mapTypeControl: false,
					streetViewControl: false,
					fullscreenControl: false
				});
				status = 'ready';
				fitToMarkers(maps);
			})
			.catch((error: unknown) => {
				if (cancelled) return;
				status = 'error';
				errorMessage = error instanceof Error ? error.message : String(error);
			});

		return () => {
			cancelled = true;
			for (const entry of markers.values()) entry.marker.map = null;
			markers.clear();
		};
	});

	// One effect keeps the pins in sync with the data, the rank filter and the selection.
	// It only ever writes to Google's objects, never to state, so it cannot re-trigger itself.
	$effect(() => {
		const googleMap = map;
		const list = restaurants;
		const visibleIds = new Set(shown.map((r) => r.id));
		const current = selectedId;
		if (!googleMap || !AdvancedMarkerElement) return;

		for (const [id, entry] of markers) {
			if (list.some((r) => r.id === id)) continue;
			entry.marker.map = null;
			markers.delete(id);
		}

		for (const restaurant of list) {
			let entry = markers.get(restaurant.id);
			if (!entry) {
				entry = createMarker(restaurant, googleMap);
				markers.set(restaurant.id, entry);
			}
			const isSelected = restaurant.id === current;
			entry.element.style.cssText = pinStyle(restaurant.rank, isSelected);
			entry.marker.zIndex = isSelected ? 10 : 1;
			entry.marker.map = visibleIds.has(restaurant.id) ? googleMap : null;
		}
	});

	function setFilter(rank: Rank | 'ALL') {
		rankFilter = rank;
		if (rank !== 'ALL' && selected && selected.rank !== rank) {
			selectedId = null;
		}
	}

	function formatDate(value?: string) {
		if (!value) return '';
		const date = new Date(value);
		if (Number.isNaN(date.getTime())) return value;
		return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
	}

	// --- Pentagon geometry -------------------------------------------------
	// The box is wider than it is tall so the side labels have room to breathe.
	const CHART_WIDTH = 280;
	const CHART_HEIGHT = 200;
	const CHART_CX = CHART_WIDTH / 2;
	const CHART_CY = CHART_HEIGHT / 2 + 4;
	const CHART_RADIUS = 62;
	const LABEL_RADIUS = CHART_RADIUS + 20;

	function axisPoint(index: number, radius: number) {
		const angle = (-90 + index * 72) * (Math.PI / 180);
		return {
			x: CHART_CX + radius * Math.cos(angle),
			y: CHART_CY + radius * Math.sin(angle)
		};
	}

	function ringPoints(radius: number) {
		return METRIC_AXES.map((_, index) => {
			const point = axisPoint(index, radius);
			return `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
		}).join(' ');
	}

	function metricPoints(metrics: RestaurantMetrics) {
		return METRIC_AXES.map((axis, index) => {
			const score = Math.max(0, Math.min(maxScore, metrics[axis.key] ?? 0));
			const point = axisPoint(index, (score / maxScore) * CHART_RADIUS);
			return `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
		}).join(' ');
	}

	function labelAnchor(x: number) {
		if (x > CHART_CX + 1) return 'start';
		if (x < CHART_CX - 1) return 'end';
		return 'middle';
	}
</script>

{#snippet rankBadge(rank: Rank, size: 'sm' | 'lg')}
	<span
		class="inline-flex items-center justify-center rounded-lg font-bold text-gray-950 {size === 'lg'
			? 'h-10 w-10 text-2xl'
			: 'h-7 w-7 text-base'}"
		style="background-color: {RANK_COLORS[rank]}"
		aria-label="Rank {rank}"
	>
		{rank}
	</span>
{/snippet}

{#snippet pentagon(metrics: RestaurantMetrics, color: string)}
	<svg
		viewBox="0 0 {CHART_WIDTH} {CHART_HEIGHT}"
		class="mx-auto w-full max-w-[17rem]"
		role="img"
		aria-label={METRIC_AXES.map(
			(axis) => `${axis.label}: ${metrics[axis.key]} of ${maxScore}`
		).join(', ')}
	>
		{#each [1, 2, 3, 4, 5] as ring (ring)}
			<polygon
				points={ringPoints((ring / 5) * CHART_RADIUS)}
				fill="none"
				stroke="currentColor"
				stroke-width="1"
				class="text-gray-600"
				opacity={ring === 5 ? 0.9 : 0.35}
			/>
		{/each}
		{#each METRIC_AXES as axis, index (axis.key)}
			{@const outer = axisPoint(index, CHART_RADIUS)}
			{@const label = axisPoint(index, LABEL_RADIUS)}
			<line
				x1={CHART_CX}
				y1={CHART_CY}
				x2={outer.x}
				y2={outer.y}
				stroke="currentColor"
				stroke-width="1"
				class="text-gray-600"
				opacity="0.5"
			/>
			<text
				x={label.x}
				y={label.y}
				text-anchor={labelAnchor(label.x)}
				dominant-baseline="middle"
				class="fill-gray-300 text-[11px]"
				font-size="11"
			>
				{axis.short}
			</text>
		{/each}
		<polygon
			points={metricPoints(metrics)}
			fill={color}
			fill-opacity="0.3"
			stroke={color}
			stroke-width="2"
			stroke-linejoin="round"
		/>
		{#each METRIC_AXES as axis, index (axis.key)}
			{@const score = Math.max(0, Math.min(maxScore, metrics[axis.key] ?? 0))}
			{@const point = axisPoint(index, (score / maxScore) * CHART_RADIUS)}
			<circle cx={point.x} cy={point.y} r="3" fill={color} />
		{/each}
	</svg>
{/snippet}

{#snippet detailCard(restaurant: Restaurant)}
	<div class="flex items-start justify-between gap-3">
		<div>
			<h3 class="!py-0 !text-2xl font-bold text-gray-100">{restaurant.name}</h3>
			<p class="!py-0 !text-sm !text-gray-400 !text-left">
				{[restaurant.cuisine, restaurant.area, restaurant.price].filter(Boolean).join(' · ')}
			</p>
		</div>
		<div class="flex items-center gap-2">
			{@render rankBadge(restaurant.rank, 'lg')}
			<button
				type="button"
				class="btn btn-ghost btn-sm btn-circle text-gray-300"
				aria-label="Close"
				onclick={() => (selectedId = null)}
			>
				✕
			</button>
		</div>
	</div>

	<p class="!py-1 !text-sm !text-gray-400 !text-left">{RANK_BLURBS[restaurant.rank]}</p>

	{@render pentagon(restaurant.metrics, RANK_COLORS[restaurant.rank])}

	<ul class="!list-none !p-0 grid grid-cols-1 gap-x-4 sm:grid-cols-2">
		{#each METRIC_AXES as axis (axis.key)}
			<li class="!py-0.5 flex items-center justify-between !text-sm text-gray-300">
				<span>{axis.label}</span>
				<span class="font-semibold text-gray-100">
					{restaurant.metrics[axis.key]}<span class="text-gray-500">/{maxScore}</span>
				</span>
			</li>
		{/each}
	</ul>

	<button
		type="button"
		class="btn btn-secondary btn-sm mt-3 w-full"
		aria-expanded={expanded}
		onclick={() => (expanded = !expanded)}
	>
		{expanded ? 'Hide the details' : 'What I had & my notes'}
	</button>

	{#if expanded}
		<div class="mt-3 space-y-3 border-t border-gray-700 pt-3">
			{#if restaurant.visited}
				<p class="!py-0 !text-xs !uppercase !tracking-wide !text-gray-500 !text-left">
					Visited {formatDate(restaurant.visited)}
				</p>
			{/if}
			{#if restaurant.dishes?.length}
				<div>
					<h4 class="text-sm font-semibold uppercase tracking-wide text-gray-400">What I had</h4>
					<ul class="!list-disc !py-1 !pl-5">
						{#each restaurant.dishes as dish (dish)}
							<li class="!py-0.5 !text-base text-gray-200">{dish}</li>
						{/each}
					</ul>
				</div>
			{/if}
			{#if restaurant.notes}
				<div>
					<h4 class="text-sm font-semibold uppercase tracking-wide text-gray-400">Notes</h4>
					<p class="!text-base !text-gray-300">{restaurant.notes}</p>
				</div>
			{/if}
			{#if restaurant.link}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external link -->
				<a class="link text-sm text-sky-400" href={restaurant.link} target="_blank" rel="noopener">
					More about this place →
				</a>
			{/if}
		</div>
	{/if}
{/snippet}

<section class="w-full">
	<div class="mb-3 flex flex-wrap items-center gap-2">
		<button
			type="button"
			class="btn btn-xs sm:btn-sm {rankFilter === 'ALL' ? 'btn-secondary' : 'btn-outline'}"
			onclick={() => setFilter('ALL')}
		>
			All ({restaurants.length})
		</button>
		{#each RANKS as rank (rank)}
			{@const count = restaurants.filter((r) => r.rank === rank).length}
			<button
				type="button"
				class="btn btn-xs sm:btn-sm gap-1 {rankFilter === rank ? 'btn-secondary' : 'btn-outline'}"
				disabled={count === 0}
				onclick={() => setFilter(rank)}
			>
				<span
					class="inline-block h-3 w-3 rounded-full"
					style="background-color: {RANK_COLORS[rank]}"
				></span>
				{rank} ({count})
			</button>
		{/each}
	</div>

	<div class="relative overflow-hidden rounded-box border border-gray-700 bg-gray-900">
		<div bind:this={mapElement} style="height: {height}" class="w-full"></div>

		{#if status !== 'ready'}
			<div
				class="absolute inset-0 flex items-center justify-center bg-gray-900/95 p-6 text-center"
				aria-live="polite"
			>
				{#if status === 'loading'}
					<span class="loading loading-spinner loading-lg text-secondary"></span>
				{:else}
					<div class="max-w-md">
						<p class="!text-base !text-gray-300">{errorMessage}</p>
						<p class="!text-sm !text-gray-500">
							The list below still works — every restaurant, rank and note is there.
						</p>
					</div>
				{/if}
			</div>
		{/if}

		{#if selected}
			<div
				class="absolute inset-x-2 bottom-2 max-h-[70%] overflow-y-auto rounded-box border border-gray-700 bg-gray-900/95 p-4 shadow-xl backdrop-blur-sm lg:inset-x-auto lg:bottom-auto lg:right-4 lg:top-4 lg:max-h-[calc(100%-2rem)] lg:w-96"
			>
				{@render detailCard(selected)}
			</div>
		{/if}
	</div>

	<div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
		{#each shown as restaurant (restaurant.id)}
			<button
				type="button"
				class="flex w-full items-center gap-3 rounded-box border p-3 text-left transition-colors hover:border-gray-500 {selectedId ===
				restaurant.id
					? 'border-gray-300 bg-gray-800'
					: 'border-gray-700 bg-gray-900'}"
				onclick={() => select(restaurant)}
			>
				{@render rankBadge(restaurant.rank, 'sm')}
				<span class="flex min-w-0 flex-col">
					<span class="truncate font-semibold text-gray-100">{restaurant.name}</span>
					<span class="truncate text-sm text-gray-400">
						{[restaurant.cuisine, restaurant.area].filter(Boolean).join(' · ')}
					</span>
				</span>
			</button>
		{:else}
			<p class="!text-base !text-gray-400">Nothing ranked {rankFilter} yet.</p>
		{/each}
	</div>
</section>
