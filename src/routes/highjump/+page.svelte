<script lang="ts">
	import { animate, stagger, text, createTimeline } from 'animejs';
	import { onMount } from 'svelte';
	import chartjs from 'chart.js/auto';
	import resultsData from './Results.json';

	let slider_pos: number = $state(50);

	let size = $state(50);
	let color = $state('#ff3e00');

	let canvas;

	$effect(() => {
		const context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);

		// this will re-run whenever `color` or `size` change
		context.fillStyle = color;
		context.fillRect(0, 0, size, size);
	});

	onMount(() => {
		// Slider Animation
		const tl = createTimeline({ defaults: { duration: 750 } });

		const hj_animation = animate(text.split(title[0], { words: false, chars: true }).chars, {
			scale: [
				{ from: '1', to: '2', ease: 'inOutCirc', duration: 400 },
				{ from: '2', to: '1', ease: 'outExpo', duration: 400 }
			],
			opacity: [{ from: 0, to: 1, duration: 600, ease: 'inOutCirc' }],
			delay: stagger(50),
			ease: 'inOutCirc'
		});

		tl.label('title').sync(hj_animation, 0);
	});
</script>

<section>
	<div class="relative flex justify-center bg-base-900">
		<div class="relative w-full max-w-screen-2xl aspect-video">
			<div class="w-full h-full relative overflow-hidden bg-base-200">
				<div class="absolute inset-0">
					<iframe
						loading="lazy"
						title="Gumlet video player"
						src="https://play.gumlet.io/embed/68ace4a90a8c57042db4d12f?background=true&autoplay=true&loop=true&disableControls=true"
						style="border:none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;filter: brightness(85%)"
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
<section>
	<div class="hero bg-base-500 min-h-screen">
		<div class="hero-content text-center">
			<div class="">
				<h1 class="text-5xl font-bold">Road to LA</h1>
			</div>
		</div>
	</div>
</section>

<!-- Chart showing PB over time and upcoming big competition -->
<div class="flex justify-center my-8">
	<canvas bind:this={canvas} width="800" height="400"></canvas>
</div>

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
