<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="flex justify-center content-start py-4">
	<div class="w-xl md:w-2xl lg:w-5xl">
		{@render children?.()}
	</div>
</div>
