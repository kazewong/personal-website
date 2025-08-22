<script lang="ts">
	import { animate, stagger, text, createTimeline } from 'animejs';
	import { onMount } from 'svelte';

	onMount(() => {
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
	
	var slider_pos: number = $state(50);
</script>

<!-- Hero section: High jump athlete + scientist -->
<section>
	<div class="relative min-h-screen flex items-center justify-center bg-base-200">
		<!-- Image Comparison Slider Container -->
		<div class="w-full h-screen relative overflow-hidden">
			<!-- Left Side: Athlete (placeholder color) -->
			<div class="absolute inset-0 bg-blue-400" style="width: var(--slider-pos, 50%); transition: width 0.2s;">
				<div class="flex items-center justify-center h-full">
					<h2 class="text-4xl font-bold text-white drop-shadow-lg">Athlete</h2>
				</div>
			</div>
			<!-- Right Side: Scientist (placeholder color) -->
			<div class="absolute inset-0 bg-green-400" style="clip-path: inset(0 0 0 calc(var(--slider-pos, 50%))); transition: clip-path 0.2s;">
				<div class="flex items-center justify-center h-full">
					<h2 class="text-4xl font-bold text-white drop-shadow-lg">Scientist</h2>
				</div>
			</div>
			<!-- Slider Handle -->
			<input
				type="range"
				min="0"
				max="100"
				value="50"
				class="absolute z-10 w-full h-full opacity-0 cursor-ew-resize"
				style="top:0; left:0;"
				oninput={(e) => {
                    slider_pos = parseInt(e.target.value);
                    document.documentElement.style.setProperty('--slider-pos', `${slider_pos}%`);
                }}
			/>
			<!-- Visible Slider Bar -->
			<div
				class="absolute top-0 bottom-0"
				style="left: calc(var(--slider-pos, 50%) - 2px); width: 4px; background: rgba(255,255,255,0.8); pointer-events: none; transition: left 0.2s;"
			></div>
		</div>
	</div>
</section>

<!-- Athlete Intro -->
<section>
	<div class="hero bg-base-500 min-h-screen">
		<div class="hero-content text-center">
			<div class="">
				<h1 class="text-5xl font-bold">Athlete</h1>
			</div>
		</div>
	</div>
</section>

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

<h1 class="flex justify-center text-6xl">
	<span id="title_hj" class="px-2">High Jump</span>
	<span id="title_athlete" class="px-2">Athlete</span>
	<span id="title_plus" class="px-2">+</span>
	<span id="title_scientist" class="px-2">Scientist</span>
</h1>

<!-- Make countdown to LA2028 -->

<!-- Track progression -->

<!-- Show ) ()-->

