<script>
	import portrait from '$lib/assets/images/portrait.jpg';
	import HighlightItem from './HighlightItem.svelte';

	import highlight_data_file from './highlight_data.json';

	const highlight_data = highlight_data_file.items.map((item) => {
		return {
			image: item.image,
			title: item.title,
			description: item.description,
			alt_des: item.alt_des,
			date: item.date,
			link: item.link
		};
	});
</script>

<h3 class="flex justify-center text-red-600">This is a page in the past, information on this page is outdated.</h3>

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
					I am an assistant research professor in the Department of Applied Mathematics and
					Statistics at Johns Hopkins University. I am also a software engineer with the Data
					Science and AI Institute. I have very broad interest in many different subjects. In brief,
					I spend 20-30% of my time thinking about <strong>astrophysics</strong>, ~40% of my time
					trying to
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
			<button class="btn btn-accent btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"> CV </button>
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
		<a
			href="https://ui.adsabs.harvard.edu/search/p_=0&q=%3Dauthor%3A%22Wong%2C%20Kaze%20W.%20K.%22&sort=date%20desc%2C%20bibcode%20desc"
		>
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

	<p>Here are a list of my current research interests</p>

	{#each highlight_data as item, index}
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

	<h3>Requirements for working with me</h3>

	<p>
		I am trying to be more and more careful in taking in student these days, mainly because since I
		begun my faculty position, I have received many more requests from students wanting to join my
		research group. If I say yes to everyone, then it is inevitable that I will spend less time on
		each student.
	</p>
	<p>
		I am a person who if I decide to do something, I do it well, and this applies to supervising
		students. If I consider someone a student of mine, then I will make an effort to make sure the
		person is happy and improve over time.
	</p>

	<p>Here are some of the criteria that I use to decide whether to accept a student:</p>
	<ol>
		<li>
			I only take students that are either directly recommended by my collaborators or students at
			Johns Hopkins University. Please <b>do not </b> reach out to me if you do not satisfy this condition.
			If you violate this condition, I will block your email address, and veto your application whenever
			I have the chance. Please take this seriously.
		</li>
		<li>
			Prospective students should have a strong background in computing. This includes but not
			limited to being proficient in linux, programming languages such as Python, Julia, C/C++ or
			Rust, and experience with version control. You can still consider joining if you don't have
			these skills, but you will need to learn them quickly.
		</li>
		<li>
			Being able to commit at least 10 hours per week and be responsible, including being punctual
			and reliable.
		</li>
	</ol>

	<p>
		While I tend to be easygoing in general, I am quite demanding when it comes to work-related
		matters. I believe professionalism is the most important thing I can teach my students: If I
		take up a job, I will complete with all of my soul no matter what adversarial conditions I face.
		Of course I understand things never go as planned and life gets in the way, but I will push you
		to go beyond your limits and be a better version of yourself. That process is not always
		pleasant, but I believe this professional mindset will carve a path for you to success.
	</p>

	<h3>Open Projects</h3>
	<p>
		If you still decide to send me an email to work with me after reading the paragraphs above, we
		are in game! Here below is a list of open projects I have for new students who are interested in
		working with me:
	</p>

	<ol>
		<li>Machine learning analysis for sports performance</li>
		<li>Development of adaptive monte carlo methods</li>
		<li>Observational astronomy data analysis</li>
	</ol>

	They are ordered by required skills. Sport analytics being the most beginner friendly and
	observational astronomy being the most advanced.

	<h3>Perks you will receive</h3>

	<p>
		If you are eligible, and find a project that excites you, then let me further entice you with
		perks you will receive while working with me:
	</p>

	<ol>
		<li>Access to my GPU cluster</li>
		<li>Learn practical computing skills such as MLOps and high performance computing</li>
		<li>
			Opportunity to a publication. I ground all of my research in the context of a publication.
		</li>
	</ol>
</div>
