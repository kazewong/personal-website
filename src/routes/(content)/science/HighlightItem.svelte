<script lang="ts">
    let { image, title, description, alt_des } = $props();
</script>


<div class="card card-compact w-full min-h-[300px] max-h-[600px]">
    <figure class="max-h-[600px]">
      <img src={image} alt={alt_des} class="rounded-t-lg" height=600px width=auto>
    </figure>
    <div class="card-body">
      <h2 class="card-title">{title}</h2>
      <p>{description}</p>
    </div>
</div>