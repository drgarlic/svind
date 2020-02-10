<script>
    export let title;

    export let description = 'A functionnal Svelte with Tailwind boilerplate';
</script>

<svelte:head>
    <title>{title}</title>
    {#if description}
        <meta name="description" content="{description}">
    {/if}
</svelte:head>

<div
    style="background-color: #1db9ce"
    class="
    font-medium
    min-h-screen
    max-width
    text-blue-100
">
    <div
        class="
        container
        mx-auto
        px-4
        py-2
    ">
        <div class="
            flex
            flex-col
            items-center
        ">
            <img
                src="https://media.giphy.com/media/WwMHQqMG0yirepFPP8/giphy.gif"
                alt="octopus"
            >
            
            <h1 class="
                font-black
                pb-4
                text-3xl
                md:text-4xl
            ">
                {title}
            </h1>
            <slot></slot>
        </div>
    </div>
</div>
