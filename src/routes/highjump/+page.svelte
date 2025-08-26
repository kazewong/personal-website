<script lang="ts">
	import { animate, stagger, text, createTimeline } from 'animejs';
	import { onMount } from 'svelte';
	import chartjs from 'chart.js/auto';
	import resultsData from './Results.json';

	let slider_pos: number = $state(50);

	let canvas: HTMLCanvasElement = $state();

	// Read and preprocess Results.json for plotting
	type ResultItem = {
		Competition: string;
		Date: string;
		Height: string;
		timestamp?: number ;
	};

	// Parse date into timestamp
	const processedResults: ResultItem[] = resultsData.items.map(item => {
		// Parse date string "DD-MM-YYYY" into timestamp (ms since epoch)
		let timestamp: number | undefined = undefined;
		if (item.Date && item.Date.match(/^\d{2}-\d{2}-\d{4}$/)) {
			const [day, month, year] = item.Date.split('-').map(Number);
			timestamp = new Date(year, month - 1, day).getTime();
		}
		return { ...item, timestamp };
	});
	// Sort by timestamp
	processedResults.sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0));
	const startDate = new Date(2021, 10, 1).getTime(); // November is month 10 (0-based)
	processedResults.forEach(item => {
		if (item.timestamp !== undefined) {
			item.timestamp = (item.timestamp - startDate) / 1000; // convert ms to seconds
		}
	});
	
	
	$effect(() => {
		const context = canvas.getContext('2d');
		if (!context) return;

		// Prepare data for plotting: x-axis is Month and Year (e.g., "Feb 2023")
		const labels = processedResults.map(item => {
			if (item.timestamp !== undefined) {
				const dateObj = new Date(item.timestamp * 1000 + startDate);
				const month = dateObj.toLocaleString('default', { month: 'short' });
				const year = dateObj.getFullYear();
				return `${month} ${year}`;
			} else {
				// For items without a valid timestamp, fallback to original date string
				return item.Date;
			}
		});

		const data = processedResults.map(item => {
			const heightNum = Number(item.Height);
			return !isNaN(heightNum) ? heightNum : null;
		});

		new chartjs(context, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Height (cm)',
						data: data,
						borderWidth: 2,
						fill: false,
						tension: 0.2,
						pointRadius: 6,
						pointBackgroundColor: data.map(v => v === null ? '#a3a3a3' : '#2563eb'),
						borderColor: '#2563eb',
						spanGaps: true
					}
				]
			},
			options: {
				scales: {
					y: {
						beginAtZero: false,
						title: {
							display: true,
							text: 'Height (cm)'
						},
						suggestedMin: Math.min(...data.filter(v => v !== null), 180) - 5,
						suggestedMax: Math.max(...data.filter(v => v !== null), 200) + 5
					},
					x: {
						title: {
							display: true,
							text: 'Competition'
						}
					}
				}
			}
		});
	});

	onMount(() => {
		// Slider Animation

	});
</script>

<section>
	<div class="relative flex justify-center bg-base-900">
		<div class="relative w-screen aspect-video">
			<div class="w-full h-full relative overflow-hidden bg-base-200">
				<div class="absolute inset-0">
					<iframe
						loading="lazy"
						title="Gumlet video player"
						src="https://play.gumlet.io/embed/68ace4a90a8c57042db4d12f?background=true&autoplay=true&loop=true&disableControls=true"
						style="border:none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;filter: brightness(85%);"
						allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
					>
					</iframe>
					<div class="absolute inset-0 flex flex-col items-center justify-center">
						<h1 class="text-6xl font-bold text-white drop-shadow-lg">High Jump</h1>
						<h2 class="text-4xl font-bold text-white drop-shadow-lg">Athlete</h2>
					</div>
				</div>

				<div class="absolute inset-0" style="clip-path: inset(0 0 0 {slider_pos}%);">
					<iframe
						loading="lazy"
						title="Gumlet video player"
						src="https://play.gumlet.io/embed/68ace4a919535c52ef283c0a?background=true&autoplay=true&loop=true&disableControls=true"
						style="border:none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;filter: brightness(85%)"
						allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
					>
					</iframe>
					<div class="absolute inset-0 flex flex-col items-center justify-center">
						<h1 class="text-6xl font-bold text-white drop-shadow-lg">High Jump</h1>
						<h2 class="text-4xl font-bold text-white drop-shadow-lg">Scientist</h2>
					</div>
				</div>

				<input
					type="range"
					min="0"
					max="100"
					class="absolute z-10 w-full h-full opacity-0 cursor-ew-resize"
					style="top:0; left:0;"
					bind:value={slider_pos}
				/>
				<div
					class="absolute top-0 bottom-0"
					style="left: calc({slider_pos}% - 2px); width: 4px; background: rgba(255,255,255,0.8); pointer-events: none;"
				></div>
			</div>
		</div>
	</div>
</section>

<!-- Athlete Intro -->
<section></section>
<section>
	<div>
		<div class="hero bg-base-500 min-h-4xl py-4">
			<div class="hero-content text-center">
				<div class="">
					<h1 class="text-5xl font-bold">My competition results</h1>
					<div class="flex justify-center my-8 lg:w-4xl">
						<canvas bind:this={canvas} width="800" height="400"></canvas>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Chart showing PB over time and upcoming big competition -->

<!-- Scientist Intro -->
<section>
	<div class="hero bg-base-500 min-h-screen">
		<div class="hero-content text-center">
			<div class="">
				<h1 class="text-5xl font-bold">Scientist</h1>
			</div>
		</div>
	</div>
</section>
