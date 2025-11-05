<script lang="ts">
	import { animate, stagger, createTimeline, onScroll, utils, ScrollObserver } from 'animejs';
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

	let slider_pos: number = $state(50);

	let scrollObserver: ScrollObserver = $state(null);
	let year = $state({ value: '2009' });

	let scroll_container: HTMLDivElement;
	let scroll_breakpoints: number[] = $state([]);
	let scroll_current_index: number = $state(0);
	let scroll_snap: () => void = $state(() => {});

	onMount(() => {
		const n_sections = StoryData.length + 3;
		const time_unit = scroll_container.clientHeight / (n_sections * 2); // 1 second per section
		console.log(
			'Total length in pixel:',
			scroll_container.clientHeight,
			'Number of sections:',
			n_sections,
			'Time unit (px):',
			time_unit
		);
		// Year animation
		const timeline = createTimeline({
			defaults: { duration: time_unit, easing: 'linear' },
			autoplay: false
		});
		let current_time: number = 0;
		for (let i = 0; i <= n_sections; i++) {
			scroll_breakpoints.push(i * time_unit);
		}
		console.log('Scroll breakpoints:', scroll_breakpoints);
		timeline.label('start');

		scrollObserver = onScroll({
			container: '.scroll-container',
			enter: 'bottom top',
			leave: 'top bottom',

			onUpdate: (self) => {
				timeline.currentTime = self.scroll;
			}
		});

		let scroll_snap_timeout: ReturnType<typeof setTimeout> | null = null;

		scroll_snap = () => {
			// Only snap when user stops scrolling (debounce)
			if (scroll_snap_timeout) {
				clearTimeout(scroll_snap_timeout);
			}
			scroll_snap_timeout = setTimeout(() => {
				const scroll_top = scroll_container.scrollTop;
				// Find the closest breakpoint in scroll_breakpoints
				let minDiff = scroll_top - scroll_breakpoints[scroll_current_index];
				console.log(
					'Scroll top:',
					scroll_top,
					'Current:',
					Math.trunc(scroll_top / time_unit),
					'Diff:',
					minDiff,
					'Index:',
					scroll_current_index
				);
				if (minDiff > time_unit / 10) {
					// scrolling down
					scroll_current_index += 1;
					scroll_current_index = Math.min(scroll_breakpoints.length - 1, scroll_current_index);
					scroll_container.scrollTo({ top: scroll_current_index * time_unit, behavior: 'smooth' });
				}
				if (minDiff < -time_unit / 10) {
					// scrolling down
					scroll_current_index -= 1;
					scroll_current_index = Math.max(0, scroll_current_index);
					scroll_container.scrollTo({ top: scroll_current_index * time_unit, behavior: 'smooth' });
				}
			}, 30); // 150ms debounce
		};

		timeline.add(
			'#video-section',
			{
				opacity: [{ from: 1, to: 0, duration: time_unit / 2 }],
				easing: 'inOut'
			},
			0
		);
		timeline.add(
			'#story-section',
			{
				opacity: [{ from: 0, to: 1, easing: 'inOut', duration: time_unit / 4 }]
			},
			time_unit / 2
		);

		// Story animation

		storyData.forEach((item, i) => {
			timeline
				.add(
					`#test-text-${i}`,
					{
						x: [
							{ from: 100, to: 0, easing: 'inOut' },
							{ from: 0, to: -100, easing: 'inOut', delay: time_unit }
						],
						opacity: [
							{ from: 0, to: 1, easing: 'inOut', duration: time_unit / 2 },
							{
								from: 1,
								to: 0,
								easing: 'inOut',
								duration: time_unit / 4,
								delay: time_unit / 2
							}
						]
					},
					current_time
				)
				.add(
					`#test-img-${i}`,
					{
						opacity: [
							{ from: 0, to: 1, easing: 'inOut', duration: time_unit / 2 },
							{
								from: 1,
								to: 0,
								easing: 'inOut',
								duration: time_unit / 4,
								delay: time_unit / 2
							}
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
						easing: 'inOut'
					},
					current_time
				);
			current_time += time_unit; // 1s display + 1s transition
		});

		timeline.add(
			'#story-section',
			{
				opacity: [{ from: 1, to: 0, easing: 'inOut', duration: time_unit / 2 }]
			},
			current_time
		);
		timeline.add(
			'#results-section',
			{
				opacity: [{ from: 0, to: 1, easing: 'inOut', duration: time_unit / 4 }]
			},
			current_time + time_unit / 2
		);

		current_time += time_unit * 2;

		timeline.add(
			'#results-section',
			{
				opacity: [{ from: 1, to: 0, easing: 'inOut', duration: time_unit / 2 }]
			},
			current_time
		);
		timeline.add(
			'#science-section',
			{
				opacity: [{ from: 0, to: 1, easing: 'inOut', duration: time_unit / 4 }]
			},
			current_time + time_unit / 2
		);

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
		<div class="scroll-section grid-cols-1 grid-rows-1 opacity-0" id="story-section">
			<div class="bg-base-500 min-h-4xl py-4">
				<div class=" text-center">
					<div class="perspective-dramatic perspective-origin-bottom">
						<h1 class="text-xl font-bold md:text-5xl py-2" id="highjumptitle">
							My High Jump story
						</h1>
						<h1 class="text-xl font-bold md:text-5xl py-2">{year.value}</h1>
					</div>
				</div>
			</div>

			<div class="flex flex-col justify-center gap-4 md:flex-row">
				<div class="grid m-auto w-[80%] md:w-[45%] md:place-items-center md:m-2">
					{#each storyData as item, i (item)}
						<p
							id="test-text-{i}"
							class=" opacity-0 col-start-1 row-start-1 text-sm max-h-64 overflow-y-scroll md:text-lg lg:overflow-auto md:max-h-full"
						>
							{item.text}
						</p>
					{/each}
				</div>
				<div class="grid m-auto w-[80%] md:w-[45%] md:place-items-center md:m-2">
					{#each storyData as item, i (item)}
						{#if item.image}
							<img
								id="test-img-{i}"
								src={item.image}
								alt={item.title}
								class=" opacity-0 col-start-1 row-start-1 text-sm max-h-64 overflow-y-scroll place-self-center lg:text-2xl lg:overflow-auto lg:max-h-full"
							/>
						{/if}
					{/each}
				</div>
			</div>
		</div>

		<section class="scroll-section opacity-0" id="results-section">
			<div class="hero bg-base-500 min-h-4xl py-4">
				<div class="hero-content text-center">
					<div class=" w-2xl lg:w-4xl">
						<h1 class="text-5xl font-bold">My competition results</h1>
						<div class="flex justify-center my-8 w-2xl lg:w-4xl">
							<Progression {resultsData} />
						</div>
					</div>
				</div>
			</div>
		</section>

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
		/*height: var(--scroll_container_height);*/
		height: 1000vh;
		overflow-y: scroll;
		scrollbar-width: none;
	}

	.scroll-content {
		/*height: var(
			--scroll_content_height
		); */
		height: 2000vh;
		position: relative;
	}

	.scroll-section {
		top: 0;
		overflow: hidden;
		position: sticky;
	}
</style>
