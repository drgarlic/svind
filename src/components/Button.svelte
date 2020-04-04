<script>
    let _class = '';
    export { _class as class };

    export let url = undefined;
    export let action = undefined;
    export let label = '';

    export let big = false;

    export let secondary = false;
    export let tertiary = false;
    export let light = false;

    let size = `
        px-4
        py-2
        text-sm
        leading-5
    `

    if (big) {
        size = `
            px-8
            py-3
            text-base
            leading-6
            md:py-4
            md:text-lg
            md:px-10
        `
    }

    let colors = `
        text-white
        bg-pink-600
        hover:bg-pink-500
        focus:shadow-outline-pink
    `

    if (secondary) {
        colors = `
            text-pink-600
            bg-pink-50
            hover:bg-white
            hover:text-pink-500
            focus:shadow-outline-pink
        `
        if (! light) {
            colors += `
                dark:text-pink-500
                dark:hover:text-pink-400
                dark:bg-gray-900
                dark:hover:bg-gray-800
            `
        }
    } else if (tertiary) {
        colors = `
            text-pink-600
            hover:text-pink-500
            dark:text-pink-500
            dark:hover:text-pink-400
        `
    }

    const classes = `
        ${size}
        ${colors}
        ${_class}
        w-full
        flex
        items-center
        justify-center
        border
        border-transparent
        font-medium
        rounded-md
        focus:outline-none
        transition
        duration-150
        ease-in-out
    `
</script>

<div class="
    rounded-md
    not-first:mt-3
    sm:not-first:mt-0
    sm:not-first:ml-3
    {! tertiary && (big ? 'shadow' : 'shadow-sm')}
">
    {#if url}
        <a
            href={url.startsWith('http') ? url : '#' + url}
            class="
            {classes}
        ">
            <slot>
                Name
            </slot>
        </a>
    {:else if action}
        <button
            on:click={action}
            aria-label={label}
            type="button"
            class="
            {classes}
        ">
            <slot>
                Name
            </slot>
        </button>
    {:else}
        Needs an action or url prop
    {/if}
</div>
