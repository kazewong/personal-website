<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class=" flex justify-center">
	<div class="w-[420px] md:w-[840px]">
		{@render children?.()}
	</div>
</div>
