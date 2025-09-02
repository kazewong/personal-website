<script lang="ts">
	import { animate, stagger, createTimeline, onScroll, utils } from 'animejs';
	import { onMount } from 'svelte';
	import resultsData from './Results.json';
	import StoryData from './StoryData.json';
	import Progression from './Progression.svelte';

	import pov from '$lib/assets/videos/pov_small.mp4';
	import side from '$lib/assets/videos/side_small.mp4';
	import Scene from '../(experimental)/threejs/Scene.svelte';

	type StoryItem = {
		image: string | null;
		year: string;
		title: string;
		text: string;
	};

	const storyData: StoryItem[] = StoryData as StoryItem[];
	const time_unit: number = 750; // 1 second per year

	let slider_pos: number = $state(50);
	let scroll_container: HTMLDivElement;

	let scrollObserver: ScrollObserver = $state(null);
	let year = $state({ value: '2009' });

	const rolling_effect = () => {
		const duration: number = 600;
		return {
			perspective: '100px',
			rotateX: [{ from: -25, to: 0, duration: duration, easing: 'easeInOutQuad' }],
			y: [{ from: 50, to: 0, duration: duration, easing: 'easeInOutQuad' }],
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

	let scroll_breakpoints: number[] = $state([]);

	function scroll_snap() {
		// Only snap when user stops scrolling (debounce)
		if (scroll_snap._timeout) clearTimeout(scroll_snap._timeout);
		scroll_snap._timeout = setTimeout(() => {
			const scroll_top = scroll_container.scrollTop;
			// Find the closest breakpoint in scroll_breakpoints
			let closest = scroll_breakpoints[0];
			let minDiff = Math.abs(scroll_top - closest);
			for (let i = 1; i < scroll_breakpoints.length; i++) {
				const diff = Math.abs(scroll_top - scroll_breakpoints[i]);
				if (diff < minDiff) {
					minDiff = diff;
					closest = scroll_breakpoints[i];
				}
			}
			scroll_container.scrollTo({ top: closest, behavior: 'smooth' });
		}, 120); // 120ms after last scroll event
	}
	onMount(() => {
		// Year animation
		const timeline = createTimeline({
			defaults: { duration: time_unit },
			autoplay: false
		});
		let current_time: number = 0;
		timeline.label('start');

		timeline.add(
			'#video-section',
			{
				opacity: [{ from: 1, to: 0 }],
				easing: 'easeInOutQuad'
			},
			0
		);
		timeline.add(
			'#story-section',
			{
				opacity: [{ from: 0, to: 1, easing: 'easeInOutQuad' }]
			},
			0
		);

		// Story animation

		storyData.forEach((item, i) => {
			timeline
				.add(
					`#test-text-${i}`,
					{
						x: [
							{ from: 100, to: 0, easing: 'easeInOutQuad' },
							{ from: 0, to: -100, easing: 'easeInOutQuad', delay: time_unit }
						],
						opacity: [
							{ from: 0, to: 1, easing: 'easeInOutQuad' },
							{ from: 1, to: 0, easing: 'easeInOutQuad', delay: 1000 }
						]
					},
					current_time
				)
				.add(
					`#test-img-${i}`,
					{
						opacity: [
							{ from: 0, to: 1, easing: 'easeInOutQuad' },
							{ from: 1, to: 0, easing: 'easeInOutQuad', delay: 1000 }
						]
					},
					current_time
				)
				.add(
					year,
					{
						value: item.year,
						modifier: utils.snap(1),
						round: 1,
						easing: 'easeInOutQuad'
					},
					current_time
				);
			current_time += time_unit * 2; // 1s display + 1s transition
		});

		scrollObserver = onScroll({
			container: '.scroll-container',
			debug: true,
			enter: 'bottom top',
			leave: 'top bottom',

			onUpdate: (self) => {
				timeline.currentTime = self.scroll;
			}
		});

		timeline.add('#story-section', {
			opacity: [{ from: 1, to: 0, easing: 'easeInOutQuad' }]
		}, current_time);
		timeline.add('#science-section', {
			opacity: [{ from: 0, to: 1, easing: 'easeInOutQuad' }]
		}, current_time);

		const total_duration = timeline.duration;
		const scroll_length = scrollObserver.distance;
		const n_sections = 6;
		console.log(total_duration, scroll_length);
		for (let i = 0; i <= n_sections; i++) {
			scroll_breakpoints.push((i * total_duration) / n_sections);
		}
		// animate('#highjumptitle', rolling_effect());
		// animate('#scientisttitle', rolling_effect());
	});
</script>

<div class="scroll-container" bind:this={scroll_container} onscroll={scroll_snap}>
	<div class="scroll-content">
		<div class="scroll-section" id="video-section">
			<div class="relative flex justify-center bg-base-900">
				<div class="relative w-screen aspect-video">
					<div class="w-full h-full relative overflow-hidden bg-base-200">
						<div class="absolute inset-0" id="video-left">
							<video src={pov} muted preload="metadata" autoplay loop>
								<track kind="captions" />
							</video>
							<div class="absolute inset-0 flex flex-col items-center justify-center">
								<h1 class="text-6xl font-bold text-white drop-shadow-lg">High Jump</h1>
								<h2 class="text-4xl font-bold text-white drop-shadow-lg">Athlete</h2>
							</div>
						</div>

						<div
							class="absolute inset-0"
							style="clip-path: inset(0 0 0 {slider_pos}%);"
							id="video-right"
						>
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
		</div>

		<!-- High Jump story -->
		<div class="scroll-section grid-cols-1 grid-rows-1" id="story-section">
			<div class="hero bg-base-500 min-h-4xl py-4">
				<div class="hero-content text-center">
					<div class="perspective-dramatic perspective-origin-bottom">
						<h1 class="text-5xl font-bold" id="highjumptitle">My High Jump story</h1>
						<h1>{year.value}</h1>
					</div>
				</div>
			</div>

			<div class="flex justify-center">
				<div class="grid place-items-center w-[40%]">
					{#each storyData as item, i}
						<p id="test-text-{i}" class="text-2xl opacity-0 col-start-1 row-start-1">
							{item.text}
						</p>
					{/each}
				</div>
				<div class="grid place-items-center w-[40%]">
					{#each storyData as item, i}
						{#if item.image}
							<img
								id="test-img-{i}"
								src={item.image}
								alt={item.title}
								class=" opacity-0 col-start-1 row-start-1"
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
		<div class="scroll-section opacity-0" id="science-section">
			<div class="hero bg-base-500 py-4">
				<div class="hero-content text-center">
					<div class="">
						<h1 class="text-5xl font-bold" id="scientisttitle">I am also a high jump scientist</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- This is needed for the scrolling to work -->
<style>
	.scroll-container {
		height: 2000vh;
		overflow-y: scroll;
		scrollbar-width: none;
	}

	.scroll-content {
		height: 4000vh; /* Make sure this is taller than the container */
		position: relative;
	}

	.scroll-section {
		top: 0;
		overflow: hidden;
		position: sticky;
	}
</style>
