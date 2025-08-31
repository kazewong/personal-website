<script lang="ts">
	import { animate, stagger, text, createTimeline, onScroll } from 'animejs';
	import { onMount } from 'svelte';
	import resultsData from './Results.json';
	import Progression from './Progression.svelte';

	import pov from '$lib/assets/videos/pov_small.mp4';
	import side from '$lib/assets/videos/side_small.mp4';

	let slider_pos: number = $state(50);
	let duration = $state(0);

	// animate(video_time, {
	// 	value: duration,
	// 	ease: 'linear',
	// 	autoplay: onScroll({
	// 		container: '.scroll-container',
	// 		sync: true,
	// 		debug: true,
	// 		onUpdate: ({ progress }) => {
	// 			video_time.value = progress * duration;
	// 		}
	// 	})
	// });
	onMount(() => {});
</script>


<div class="scroll-container scroll-y">
	<div class="scroll-content">
		<section class="">
			<div class="relative flex justify-center bg-base-900">
				<div class="relative w-screen aspect-video">
					<div class="w-full h-full relative overflow-hidden bg-base-200">
						<div class="absolute inset-0">
							<video src={pov} muted preload="metadata" autoplay loop>
								<track kind="captions" />
							</video>
							<div class="absolute inset-0 flex flex-col items-center justify-center">
								<h1 class="text-6xl font-bold text-white drop-shadow-lg">High Jump</h1>
								<h2 class="text-4xl font-bold text-white drop-shadow-lg">Athlete</h2>
							</div>
						</div>

						<div class="absolute inset-0" style="clip-path: inset(0 0 0 {slider_pos}%);">
							<video src={side} muted preload="metadata" autoplay loop>
								<track kind="captions" />
							</video>

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
		<section class="scroll-section">
			<div class="hero bg-base-500 min-h-4xl py-4">
				<div class="hero-content text-center">
					<div class="">
						<h1 class="text-5xl font-bold">I am a high jumper</h1>
						<div class="flex justify-center my-8 lg:w-4xl"></div>
					</div>
				</div>
			</div>
		</section>

		<section>
			<div class="hero bg-base-500 min-h-4xl py-4">
				<div class="hero-content text-center">
					<div class="">
						<h1 class="text-5xl font-bold">My competition results</h1>
						<div class="flex justify-center my-8 lg:w-4xl">
							<Progression {resultsData} />
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
						<h1 class="text-5xl font-bold">I am also a high jump scientist</h1>
					</div>
				</div>
			</div>
		</section>
	</div>
</div>

<style>
	.scroll-container {
		scroll-behavior: smooth;
	}
</style>
