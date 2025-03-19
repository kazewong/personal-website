<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="flex justify-center content-start py-16">
	<div class="w-[420px] md:w-[840px]">
		{@render children?.()}
	</div>
</div>
