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
			alt_des: item.alt_des
		};
	});

	let highlight_current_id = $state(0);
</script>

<h1 class="flex justify-center text-6xl">I Do Science</h1>

<div class="divider dark:divider-primary divider-start">
	<h3 class="text-4xl">Who am I</h3>
</div>

<div class="w-full flex justify-center">
	<div class="md:flex justify-items-center py-8 md:w-[720px]">
		<!-- Portrait -->
		<div class="flex-col justify-center w-4/5 md:w-2/5">
			<div class="justify-center flex">
				<img src={portrait} alt="" width={147} height={147} class="rounded-full" />
			</div>
			<div class="justify-center flex-col">
				<h2 class="text-4xl text-center p-0">Kaze W. K Wong</h2>
				<h3 class="text-xl text-center p-0">Assistant Research Professor</h3>
				<h3 class="text-xl text-center p-0">Research Software Engineer</h3>
				<h3 class=" text-xl text-center p-0">Johns Hopkins University</h3>
			</div>
		</div>

		<!-- Description -->
		<div class=" md:w-3/5 text-justify">
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

<div class="divider dark:divider-primary divider-start">
	<h3 class="text-4xl">Profile Summary</h3>
</div>

<h1 class="bg-linear-to-r from-red-500 via-yellow-300 to-indigo-40 text-transparent bg-clip-text">
	Under constrcution
</h1>

<!-- <p>
Number of papers:
Awards:
Grants:
Softwares:
</p> -->

<div class="divider dark:divider-primary divider-start">
	<h3 class="text-4xl">Research Highlights</h3>
</div>

<div class="carousel w-full">
	<div class="w-full">
		<HighlightItem
			image={highlight_data[highlight_current_id].image}
			title={highlight_data[highlight_current_id].title}
			description={highlight_data[highlight_current_id].description}
			alt_des={highlight_data[highlight_current_id].alt_des}
		/>
		<div class="flex justify-center w-full py-4">
			<button
				onclick={() => (highlight_current_id = (highlight_current_id + 1) % highlight_data.length)}
				class="btn btn-circle">&lt</button>
			<button
				onclick={() => (highlight_current_id = (highlight_current_id + 1) % highlight_data.length)}
				class="btn btn-circle">&gt</button>
		</div>
	</div>
</div>

<h1 class="bg-linear-to-r from-red-500 via-yellow-300 to-indigo-40 text-transparent bg-clip-text">
	Under constrcution
</h1>

<div class="divider dark:divider-primary divider-start">
	<h3 class="text-4xl">Research Group</h3>
</div>

<!-- <p>
I enjoy 
</p> -->

<p>
I only take students that are either directly recommended by my collaborators or students at Johns Hopkins University.
</p>



<div class="divider dark:divider-primary divider-start">
	<h3 class="text-4xl">Students</h3>
</div>

<p>
	Here is a list of students I have mentored

</p>
<h1 class="bg-linear-to-r from-red-500 via-yellow-300 to-indigo-40 text-transparent bg-clip-text">
	Under constrcution
</h1>
