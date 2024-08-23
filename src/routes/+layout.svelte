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
    <nav>
        <div>
            <div>
                <p>Kaze Wong</p>
            </div>
            <div>
                <ul class="flex flex-row">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/blog">Blog</a>
                    </li>
        
                </ul>    
            </div>    
        </div>
    </nav>

{/if}


<slot />