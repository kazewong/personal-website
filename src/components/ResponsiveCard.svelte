<script lang="ts">
	interface Props {
		image: any;
		alt?: string;
		title: any;
		description: any;
	}

	let { image, alt = '', title, description }: Props = $props();
</script>

<div class="card card-compact glass lg:card-side shadow-xl bg-slate-700 w-max[840px]">
	<figure class="lg:w-3/5">
		<img class="" src={image} {alt} />
	</figure>

	<div class="card-body">
		<h2 class="card-title p-0">{title}</h2>
		<p>{description}</p>
	</div>
</div>
