<script lang="ts">
	import { animate, stagger, text, createTimeline, onScroll, utils } from 'animejs';
	import { onMount } from 'svelte';
	import resultsData from './Results.json';
	import Progression from './Progression.svelte';

	import pov from '$lib/assets/videos/pov_small.mp4';
	import side from '$lib/assets/videos/side_small.mp4';

	let slider_pos: number = $state(50);

	const [container] = utils.$('.scroll-container');

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
		<section class="scroll-section">
			<div class="hero bg-base-500 min-h-4xl py-4">
				<div class="hero-content text-center">
					<div class="">
						<h1 class="text-5xl font-bold">My High Jump story</h1>
						<div class="flex justify-center my-8 lg:w-4xl"></div>
					</div>
				</div>
			</div>

			<ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
				<li>
					<div class="timeline-middle"></div>
					<div class="timeline-start mb-10 md:text-end flex-1 flex flex-col justify-center">
						<time class="font-mono italic">2009</time>
						<div class="text-lg font-black">A humble beginning</div>
						<p class="text-justify">
							I learned about high jump when I was 14, more like I was forced to compete for my
							secondary school because I was doing better than anyone in my school at my age. That
							didn't mean I was good, I was just better than others. It wasn't until 17 I started
							liking high jump and actually started practicing consistently. But I wasn't really
							talented. I cleared 185cm in my freshman year, which is not terrible but nothing too
							shiny, and I didn't really do well in the open competition in Hong Kong. Choosing
							between High Jump and Physics I chose physics when I was 20, and went to the US for my
							graduate study.
						</p>
					</div>
					<div class="timeline-end md:mb-10 flex justify-center items-center flex-1">
						<img
							src="/highschool_hj.jpg"
							alt="High School High Jump"
							class="timeline-img rounded-lg shadow-lg w-full h-full object-cover"
						/>
					</div>
					<hr />
				</li>
				<li>
					<hr />
					<div class="timeline-middle"></div>
					<div class="timeline-end md:mb-10 flex-1 flex flex-col justify-center">
						<time class="font-mono italic">2017</time>
						<div class="text-lg font-black">Goodbye for science</div>
						<p class="text-justify">
							I didn't do any high jump because I thought to myself I had officially gave up high
							jump, it's better to focus on physics. I still work out when I was in grad school, but
							didn't really think about jumping for 3 years. During that period, whenever people
							asked me what was the highest I ever cleared, I always took the libraty of being a
							physicist and approximated the answer to 190cm, which was a lie. Then Covid hit, while
							I was trapped in my own apartment, I kept asking myself what would be the one regret I
							have in my life if I died of Covid tomorrow. The answer kept changing, but after some
							conincidental YouTube recommendation, the answer settled as lying about clearing
							190cm. It's not too much about I feel guilty about lying to others, but lying to
							myself knowing the fact all too well, and not been able to feel how jumping over a
							height taller than myself would feel like. So I decided to try graduating and get back
							into jumping.
						</p>
					</div>
					<div class="timeline-start mb-10 md:text-end flex justify-center items-center flex-1">
						<img
							src="/graduate_hj.jpg"
							alt="Graduate School High Jump"
							class="timeline-img rounded-lg shadow-lg w-full h-full object-cover"
						/>
					</div>
					<hr />
				</li>
				<li>
					<hr />
					<div class="timeline-middle"></div>
					<div class="timeline-start mb-10 md:text-end flex-1 flex flex-col justify-center">
						<time class="font-mono italic">2021</time>
						<div class="text-lg font-black">Back into the pond</div>
						<p class="text-justify">
							I was lucky that I was able to get a job at the Flatiron Institute in New York as a
							postdoc, and I decided to graduate from my PhD in 4 years to go high jump again. At
							the time I didn't know I could use the facility in Johns Hopkins to practice, so I
							thought I have to move somewhere that has a facility that is open to the public. I
							moved to NYC, and started getting back into jumping. It started out quite rough: the
							facility, Armory indoor track, is not opened until November, so I was just lifting and
							sprinting outside, which I got some injuries. In November 2021, it was a struggle to
							get over 170cm, which was pretty demotivating. But as I kept working on it, I got back
							to 180cm in Feburary 2022.
						</p>
					</div>
					<div class="timeline-end md:mb-10 flex justify-center items-center flex-1">
						<img
							src="/backtohj.png"
							alt="Back to High Jump"
							class="timeline-img rounded-lg shadow-lg w-full h-full object-cover"
						/>
					</div>
					<hr />
				</li>
				<li>
					<hr />
					<div class="timeline-middle"></div>
					<div class="timeline-end md:mb-10 flex-1 flex flex-col justify-center">
						<time class="font-mono italic">2022</time>
						<div class="text-lg font-black">Breaking new ground</div>
						<p class="text-justify">
							To be honest, I didn't know how far I would have gotten when I decided to jump again.
							Growing up from Hong Kong, we were constantly told that we expire after the college,
							which is about 21. Any age after that is too old for track and field, and we should
							move on. I listened at the time, put my spikes away, and tried to be an adult (!?).
							But in June 2022, I finally got it for the first time, my first 190cm. Half a year
							later, I went up
						</p>
					</div>
					<div class="timeline-start mb-10 md:text-end flex justify-center items-center">
						<img src="/195.png" alt="195cm Jump" class="rounded-lg max-w-xs shadow-lg" />
					</div>
					<hr />
				</li>
				<li>
					<hr />
					<div class="timeline-middle"></div>
					<div class="timeline-start mb-10 md:text-end">
						<time class="font-mono italic">2024</time>
						<div class="text-lg font-black">Full speed forward</div>
						<p class="text-justify">
							It's been more then a year and half I haven't had a new PB in competition at the time
							of writing. Many things happen in between: I got injured a couple of times, I have a
							good coach line now, I am fully dedicated to pushing my limit. I moved back to JHU to
							mostly make high jump the next step in my career, and that is for a dream that is
							insanely difficult: to go to the Olympics. Sometime when I bring it up to someone who
							doesn't do high jump, they will try to convince me that is very difficult and
							basically impossible. I know, probably better than anyone else, afterall I am the one
							who is failing all the bars everyday. But I still want to try pushing my limits, and
							give everything to high jump this time. I just want to see how it looks like when I am
							competing at the highest level, and want to feel soaring over those high bars. No one
							can talk me out of it this time, not even me. As such, the story continues...
						</p>
					</div>
					<hr />
				</li>
			</ul>
		</section>

		<section  class="scroll-section">
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


		<!-- Science part -->
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
