<script>
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

		tl.label('title'). sync(hj_animation, 0);
	});
</script>

<!-- Hero section: High jump athlete + scientist -->
<section>
    <div class="hero bg-base-200 min-h-screen">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Hello there</h1>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
</section>

<h1 class="flex justify-center text-6xl">
	<span id="title_hj" class="px-2">High Jump</span>
	<span id="title_athlete"class="px-2">Athlete</span>
	<span id="title_plus"class="px-2">+</span>
	<span id="title_scientist"class="px-2">Scientist</span>
</h1>
    

<div class="divider dark:divider-primary divider-start">
	<h3 class="text-4xl">As an athlete</h3>
</div>

<!-- Make countdown to LA2028 -->

<!-- Track progression -->

<!-- Show ) ()-->

<div class="divider dark:divider-primary divider-start">
	<h3 class="text-4xl">As a scientist</h3>
</div>
