<script>
	import Github_logo_trans from '$lib/assets/favicons/Github_logo_trans.png';
	import Linkedin_logo_trans from '$lib/assets/favicons/Linkedin_logo_trans.png';
	import Twitter_logo_trans from '$lib/assets/favicons/Twitter_logo_trans.png';
	import Youtube_logo_trans from '$lib/assets/favicons/Youtube_logo_trans.png';
	import { animate, stagger, text, createTimeline } from 'animejs';
	import { onMount } from 'svelte';

	onMount(() => {
		const tl = createTimeline({ defaults: { duration: 750 } });
		const hello_animation = animate(text.split('#hello', { words: false, chars: true }).chars, {
			// Property keyframes
			y: [
				{ to: '-2.75rem', ease: 'outExpo', duration: 600 },
				{ to: 0, ease: 'outBounce', duration: 800, delay: 100 }
			],
			// Property specific parameters
			rotate: {
				from: '-1turn',
				delay: 0
			},
			delay: stagger(50),
			ease: 'inOutCirc'
		});
		const name_animation = animate('#name', {
			// Property keyframes
			x: [
				{ to: '+2.75rem', ease: 'outExpo', duration: 600 },
				{ to: 0, ease: 'outBounce', duration: 800, delay: 100 }
			],
			opacity: [
				{ to: 0, duration: 600, ease: 'outExpo' },
				{ to: 1, duration: 800, delay: 100 }
			]
		});
		tl.label('hello').sync(hello_animation, 0).sync(name_animation, 50);
	});
</script>

<div
	class="flex flex-col min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 my-auto mx-auto max-w-[1024px]"
>
	<div class="flex">
		<h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold" id="hello">Hello, I am</h1>
		<h1
			class="text-4xl sm:text-5xl lg:text-6xl font-bold px-2 bg-linear-to-r dark:from-blue-500 dark:to-cyan-300 from-indigo-400 to-blue-700 text-transparent bg-clip-text"
			id="name"
		>
			Kaze Wong
		</h1>
	</div>
	<h2 class="text-2xl sm:text-3xl md:text-4xl">I jump, I do science, and I make stuff</h2>
	<div class="flex flex-row">
		<a href="https://github.com/kazewong" class="px-2 dark:invert">
			<img src={Github_logo_trans} width={40} height={40} alt="Github" />
		</a>
		<a href="https://www.youtube.com/channel/UCt6jkLTx5GBkGQ57HiPaeLg" class="px-2 dark:invert">
			<img src={Youtube_logo_trans} width={40} height={40} alt="Youtube" />
		</a>

		<a href="https://twitter.com/physicskaze" class="px-2">
			<img src={Twitter_logo_trans} width={40} height={40} alt="Twitter" />
		</a>
		<a href="https://www.linkedin.com/in/kazewkwong/" class="px-2">
			<img src={Linkedin_logo_trans} width={40} height={40} alt="Linkedin" />
		</a>
	</div>
</div>
