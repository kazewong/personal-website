<script>
	import { onScroll, animate, text, createTimeline } from 'animejs';
	import { onMount } from 'svelte';

	let title = $state('');

	onMount(() => {
		const fullText = 'I write a lot of code';

		let i = 0;
		function typeWriter() {
			if (i <= fullText.length) {
				title = fullText.slice(0, i);
				i++;
				setTimeout(typeWriter, 60);
			}
		}
		typeWriter();

		animate('#typewriter', {
			borderColor: [{ from: '#fff', to: '#fff0', duration: 50 }],
			loopDelay: 500,
			loop: 5,
			alternate: true,
			reversed: true
		});
	});
</script>

<div class="flex justify-center">
	<div class="border-r-4 border-tra" id="typewriter">
		<h1 class="px-2">{title}</h1>
	</div>
</div>

<div class="">
	<p>
		Outside of jumping, I am a Software Engineer/Researcher working with multiple clients for their
		projects
	</p>
</div>

<!-- CV -->

<!-- Area -->

<div>
	<h2>Data Science</h2>
</div>

<div>
	<h2>Deep learning</h2>
</div>

<div>
	<h2>Web programming</h2>
</div>

<!-- Projects -->
