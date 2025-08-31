<script lang="ts">
	import { animate, stagger, createTimeline, onScroll } from 'animejs';
	import { onMount } from 'svelte';
	import resultsData from './Results.json';
	import StoryData from './StoryData.json';
	import Progression from './Progression.svelte';

	import pov from '$lib/assets/videos/pov_small.mp4';
	import side from '$lib/assets/videos/side_small.mp4';

	type StoryItem = {
		image: string | null;
		year: string;
		title: string;
		text: string;
	};

	const storyData: StoryItem[] = StoryData as StoryItem[];

	let slider_pos: number = $state(50);
	let scroll_progress = $state(0);
	// const getValues = () => {
	// 	scroll_progress = observer.scroll;
	// 	console.log(scroll_progress);
	// };
	let scrollObserver: ScrollObserver = $state(null);

	let year = $state({ value: '2009' });

	const rolling_effect = () => {
		const duration: number = 600;
		return {
			perspective: '100px',
			rotateX: [{ from: -25, to: 0, duration: duration, easing: 'easeInOutQuad' }],
			y: [{ from: 50, to: 0, duration: duration, easing: 'easeInOutQuad' }],
			opacity: [{ from: 0, to: 1, duration: duration, easing: 'easeInOutQuad' }],
			delay: stagger(50),
			onUpdate: () => {
				scroll_progress = scrollObserver.scroll;
			},
			autoplay: onScroll({
				container: '.scroll-container',
				sync: true,
				debug: true,
				enter: 'bottom top',
				leave: 'top bottom'
			})
		};
	};

	onMount(() => {
		scrollObserver = onScroll({
			container: '.scroll-container',
			sync: true,
			debug: true,
			enter: 'bottom top',
			leave: 'top bottom'
		});

		// Year animation
		const timeline = createTimeline({
			defaults: { duration: 750 },
			autoplay: onScroll({
				container: '.scroll-container',
				sync: true,
				debug: true,
				enter: 'bottom top',
				leave: 'top bottom'
			})
		});
		let current_time: number = 0;
		timeline.label('start');

		// Main text animation

		timeline.label('text-start');
		storyData.forEach((item, i) => {
			timeline
				.add(
					`#test-text-${i}`,
					{
						x: [
							{ from: 100, to: 0, easing: 'easeInOutQuad' },
							{ from: 0, to: -100, easing: 'easeInOutQuad', delay: 1000 }
						],
						opacity: [
							{ from: 0, to: 1, easing: 'easeInOutQuad', duration: 1000 },
							{ from: 1, to: 0, easing: 'easeInOutQuad', delay: 1000, duration: 500 }
						]
					},
					current_time
				)
				.add(
					`#test-img-${i}`,
					{
						opacity: [
							{ from: 0, to: 1, easing: 'easeInOutQuad', duration: 1000 },
							{ from: 1, to: 0, easing: 'easeInOutQuad', delay: 1000, duration: 500 }
						]
					},
					current_time
				)
				.add(
					year,
					{
						value: item.year,
						round: 1,
						easing: 'easeInOutQuad'
					},
					current_time
				);
			current_time += 2000; // 1s display + 1s transition
		});

		// Image animation

		// Chart animation

		animate('#highjumptitle', rolling_effect());
		animate('#scientisttitle', rolling_effect());
	});
</script>

<div class="sticky top-0">
	<h1>I am revmaping this page, and it is going to be so sick soon</h1>
	<h1>slider_pos: {scroll_progress}</h1>
</div>

<div class="scroll-container">
	<div class="scroll-content">
		<section class="scroll-section">
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

		<!-- High Jump story -->
		<div class="scroll-section">
			<div class="hero bg-base-500 min-h-4xl py-4">
				<div class="hero-content text-center">
					<div class="perspective-dramatic perspective-origin-bottom">
						<h1 class="text-5xl font-bold" id="highjumptitle">My High Jump story</h1>
					</div>
				</div>
			</div>
		</div>

		<h1>{year.value}</h1>
		<div class="flex justify-center">
			<div class="min-w-[50%]">
				<div class="relative">
					{#each storyData as item, i}
						<p id="test-text-{i}" class="text-2xl absolute opacity-0">{item.text}</p>
					{/each}
				</div>
			</div>
			<div class="min-w-[50%]">
				<div class="relative">
					{#each storyData as item, i}
						{#if item.image}
							<img
								id="test-img-{i}"
								src={item.image}
								alt={item.title}
								class=" absolute opacity-0"
							/>
						{/if}
					{/each}
				</div>
			</div>
		</div>

		<!-- <section class="scroll-section">
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
		</section> -->

		<!-- Science part -->
		<section class="scroll-section">
			<div class="hero bg-base-500">
				<div class="hero-content text-center">
					<div class="">
						<h1 class="text-5xl font-bold" id="scientisttitle">I am also a high jump scientist</h1>
					</div>
				</div>
			</div>
		</section>
	</div>
</div>

<!-- This is needed for the scrolling to work -->
<style>
	.scroll-container {
		height: 100vh;
		overflow-y: scroll;
		scrollbar-width: none;
	}
</style>
