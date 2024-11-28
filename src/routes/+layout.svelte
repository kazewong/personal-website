<script>
    import "../app.css";
    import 'katex/dist/katex.min.css';

    let innerWidth = 0;
    let isDarkMode = true;

    $: isMobile = innerWidth < 768;
</script>

<svelte:window bind:innerWidth />

{#if isMobile}
    <!-- <div class="flex md:hidden"> -->

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
    <!-- </div> -->
{:else}
    <nav id="NavBar" class="w-full mx-auto bg-indigo-50 dark:bg-gray-900 {isDarkMode ? 'dark': ''}">
        <div id="NavContainer" class = "flex flex-row py-4 max-w-[1024px] mx-auto">
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
                        <a href="/science">Science</a>
                    </li>
                    <li>
                        <a href="/highjump">High Jump</a>
                    </li>
                    <li>
                        <a href="/crafts">Crafts</a>
                    </li>
                </ul>
            </div>
            <div id="NavThemeSwitch" class="basis-1/5 swap swap-rotate">
                <button on:click={() => isDarkMode = !isDarkMode}>
                    {#if isDarkMode}
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width={1.5}
                        stroke="white"
                        class="w-8 h-8">
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
                        class="w-8 h-8">
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        />
                        </svg>
                    {/if}
                </button>
            </div>
        </div>
    </nav>
{/if}

<svelte:head>
    <link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet'>
</svelte:head>


<main class="{isDarkMode ? 'dark': ''}">
    <div class="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 my-auto mx-auto max-w-[1024px] min-w-[480px]">
        <slot />
    </div>
</main>
