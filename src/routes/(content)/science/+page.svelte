<script>
	import portrait from '$lib/assets/images/portrait.jpg';
	import ResponsiveCard from '../../../components/ResponsiveCard.svelte';
	import HighlightItem from './HighlightItem.svelte';

	import highlight_data_file from './highlight_data.json';

	const highlight_data = highlight_data_file.items.map((item) => {
		return {
			image: item.image,
			title: item.title,
			description: item.description,
			alt_des: item.alt_des,
			date: item.date,
			link: item.link,
		};
	});

	let highlight_current_id = $state(0);
</script>

<h1 class="flex justify-center">I Do Science</h1>

<div class="block">
	<div class="divider dark:divider-primary divider-start">
		<h2 class="text-4xl">Who am I</h2>
	</div>
	
	<div class="w-full flex justify-center">
		<div class="lg:flex justify-items-center py-8 lg:w-4xl">
			<!-- Portrait -->
			<div class="flex-col justify-center w-4/5 lg:w-2/5">
				<div class="justify-center flex">
					<img src={portrait} alt="" width={147} height={147} class="rounded-full" />
				</div>
				<div class="justify-center flex-col">
					<h2 class="text-4xl text-center p-0">Kaze W. K Wong</h2>
					<h2 class="text-xl text-center p-0">Assistant Research Professor</h2>
					<h2 class="text-xl text-center p-0">Research Software Engineer</h2>
					<h2 class=" text-xl text-center p-0">Johns Hopkins University</h2>
				</div>
			</div>
	
			<!-- Description -->
			<div class=" lg:w-3/5 text-justify">
				<p>
					I am an assistant research professor in the Department of Applied Mathematics and Statistics
					at Johns Hopkins University. I am also a software engineer with the Data Science and AI
					Institute. I have very broad interest in many different subjects. In brief, I spend 20-30%
					of my time thinking about <strong>astrophysics</strong>, ~40% of my time trying to
					<strong>understand to make neural network robust and how to tune them</strong>, and the
					remaining time <strong>building production-grade domain science applications</strong>. My
					work is primarily computational and I care about <strong>open source software</strong> a lot.
					See below for some of the topics I am currently working on.
				</p>
			</div>
		</div>
	</div>
	
</div>

<div class="block">
	<div class="divider dark:divider-primary divider-start">
		<h2 class="text-4xl">Link tree</h2>
	</div>
	
	<div class="flex justify-center gap-4">
		<a href="https://github.com/kazewong/CV/blob/main/cv.pdf">
			<button class="btn btn-accent btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
					CV
			</button>
		</a>
		<a href="https://inspirehep.net/authors/1789361?ui-citation-summary=true">
			<button class="btn btn-accent btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
					InspireHEP
			</button>
		</a>
		<a href="https://scholar.google.com/citations?user=oQDoPMsAAAAJ&hl=en">
			<button class="btn btn-accent btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
					Google Scholar
			</button>
		</a>
		<a href="https://ui.adsabs.harvard.edu/search/p_=0&q=%3Dauthor%3A%22Wong%2C%20Kaze%20W.%20K.%22&sort=date%20desc%2C%20bibcode%20desc">
			<button class="btn btn-accent btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
					NASA/ADS
			</button>
		</a>
	</div>	
</div>

<div class="block">
	<div class="divider dark:divider-primary divider-start pb-4">
		<h2>Research Interest</h2>
	</div>

	<p>
		Here are a list of my current research interests
	</p>
	
	{#each highlight_data as item,index}
		<div class="w-full py-4">
			<HighlightItem
				image={item.image}
				title={item.title}
				description={item.description}
				alt_des={item.alt_des}
				date={item.date}
				left={index % 2 == 0}
				link={item.link}
			/>
		</div>	
	{/each}
</div>


<!-- <h1 class="bg-linear-to-r from-red-500 via-yellow-300 to-indigo-40 text-transparent bg-clip-text">
	Under constrcution
</h1> -->

<div class="block">
	<div class="divider dark:divider-primary divider-start">
		<h2 class="text-4xl">Research projects</h2>
	</div>
	
	<h2></h2>
	<p>
	I only take students that are either directly recommended by my collaborators or students at Johns Hopkins University.
	</p>
</div>

