<script>
    import "../app.css";

    let innerWidth = 0;

    $: isMobile = innerWidth < 768;
</script>

<svelte:window bind:innerWidth />


{#if isMobile}
    <style>
        nav {
            display: none;
        }
    </style>
{:else}
    <nav id="NavBar" class="w-full mx-auto bg-gray-900">
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
                        <a href="/blog">Science</a>
                    </li>
                    <li>
                        <a href="/blog">High Jump</a>
                    </li>
                </ul>
            </div>
            <div id="NavThemeSwitch" class="basis-1/5">
                <p>Placeholder</p>
            </div>
        </div>
    </nav>

{/if}


<slot />