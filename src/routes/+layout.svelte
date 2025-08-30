<script lang="ts">
	import '../app.css';
	import 'katex/dist/katex.min.css';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	import Github_logo_trans from '$lib/assets/favicons/Github_logo_trans.png';
	import Linkedin_logo_trans from '$lib/assets/favicons/Linkedin_logo_trans.png';
	import Twitter_logo_trans from '$lib/assets/favicons/Twitter_logo_trans.png';
	import Youtube_logo_trans from '$lib/assets/favicons/Youtube_logo_trans.png';

	injectAnalytics({ mode: dev ? 'development' : 'production' });
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let innerWidth = $state(0);
	let isDarkMode = $state(true);

	let isMobile = $derived(innerWidth < 768);
</script>

<svelte:window bind:innerWidth />

{#if isMobile}
	<!-- <div class="flex md:hidden"> -->
	<div class="flex justify-between bg-indigo-50 dark:bg-gray-900 {isDarkMode ? 'dark' : ''}">
		<div class="px-4">
			<details class="dropdown">
				<summary class="btn p-0 bg-transparent border-0 hover:bg-transparent">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke={isDarkMode ? 'white' : 'currentColor'}
						class="w-12 h-12 fill-blue-500"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</summary>
				<ul
					class="menu dropdown-content rounded-box z-1 w-52 p-2 shadow-sm bg-indigo-50 dark:bg-gray-900"
				>
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a href="/blog">Blog</a>
					</li>
					<li>
						<a href="/highjump">Jump</a>
					</li>
					<li>
						<a href="/code">Code</a>
					</li>
					<li>
						<a href="/animation">Animation</a>
					</li>
					<li>
						<a href="/cooking">Cooking</a>
					</li>
					<li>
						<details class="dropdown">
							<summary
								class="px-2 py-1 bg-transparent border-0 hover:underline cursor-pointer list-none"
							>
								Others
							</summary>
							<ul
								class="menu dropdown-content rounded-box z-10 w-44 p-2 shadow-sm bg-indigo-50 dark:bg-gray-900 text-gray-100"
							>
								<li>
									<a href="/jhu_science">Science</a>
								</li>
							</ul>
						</details>
					</li>
				</ul>
			</details>
		</div>

		<!-- <div id="NavThemeSwitch" class="px-4 swap swap-rotate">
			<button onclick={() => (isDarkMode = !isDarkMode)}>
				{#if isDarkMode}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width={1.5}
						stroke="white"
						class="w-8 h-8"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width={1.5}
						stroke="black"
						class="w-8 h-8"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
						/>
					</svg>
				{/if}
			</button>
		</div> -->
	</div>
	<!-- </div> -->
{:else}
	<nav
		id="NavBar"
		class="sticky top-0 z-20 shadow-md w-full mx-auto bg-indigo-50 dark:bg-gray-900 {isDarkMode
			? 'dark'
			: ''}"
	>
		<div id="NavContainer" class="flex flex-row py-4 max-w-[1024px] mx-auto">
			<div id="NavLogo" class="basis-1/5 px-8">
				<p class="text-nowrap">Kaze Wong</p>
			</div>
			<div id="NavItems" class="basis-3/5">
				<ul class="flex flex-row justify-center space-x-4">
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a href="/blog">Blog</a>
					</li>
					<li>
						<a href="/highjump">Jump</a>
					</li>
					<li>
						<a href="/code">Code</a>
					</li>
					<li>
						<a href="/animation">Animation</a>
					</li>
					<li>
						<a href="/cooking">Cooking</a>
					</li>
					<li>
						<details class="dropdown">
							<summary
								class=" bg-transparent border-0 hover:underline cursor-pointer list-none text-gray-100"
							>
								Others
							</summary>
							<ul
								class="menu dropdown-content rounded-box z-10 w-44 p-2 shadow-sm bg-indigo-50 dark:bg-gray-900"
							>
								<li>
									<a href="/jhu_science">Science</a>
								</li>
							</ul>
						</details>
					</li>
				</ul>
			</div>
			<!-- <div id="NavThemeSwitch" class="basis-1/5 swap swap-rotate">
				<button onclick={() => (isDarkMode = !isDarkMode)}>
					{#if isDarkMode}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width={1.5}
							stroke="white"
							class="w-8 h-8"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
							/>
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width={1.5}
							stroke="black"
							class="w-8 h-8"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
							/>
						</svg>
					{/if}
				</button>
			</div> -->
		</div>
	</nav>
{/if}

<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" />
</svelte:head>

<main class={isDarkMode ? 'dark' : ''}>
	<div class="flex flex-col max-w-[1920px] min-h-screen my-auto mx-auto">
		{@render children?.()}
	</div>
	<footer
		class="w-full mt-auto py-4 bg-indigo-50 dark:bg-gray-900 text-center text-gray-700 dark:text-gray-300"
	>
		<div class="flex flex-col items-center space-y-2">
			<div class="flex flex-row justify-center space-x-4">
				<a
					href="https://github.com/kazewong"
					class="dark:invert"
					title="Github"
					target="_blank"
					rel="noopener"
				>
					<img src={Github_logo_trans} width="28" height="28" alt="Github" />
				</a>
				<a
					href="https://www.youtube.com/channel/UCt6jkLTx5GBkGQ57HiPaeLg"
					class="dark:invert"
					title="Youtube"
					target="_blank"
					rel="noopener"
				>
					<img src={Youtube_logo_trans} width="28" height="28" alt="Youtube" />
				</a>
				<a href="https://twitter.com/physicskaze" title="Twitter" target="_blank" rel="noopener">
					<img src={Twitter_logo_trans} width="28" height="28" alt="Twitter" />
				</a>
				<a
					href="https://www.linkedin.com/in/kazewkwong/"
					title="Linkedin"
					target="_blank"
					rel="noopener"
				>
					<img src={Linkedin_logo_trans} width="28" height="28" alt="Linkedin" />
				</a>
			</div>
			<div>
				&copy; {new Date().getFullYear()} Kaze Wong
			</div>
		</div>
	</footer>
</main>
