<script>
    let _class = '';
    export { _class as class };

    export let url = undefined;
    export let action = undefined;
    export let type = undefined;
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
        bg-orange-600
        hover:bg-orange-500
        focus:shadow-outline-orange
    `

    if (secondary) {
        colors = `
            text-orange-600
            bg-orange-50
            hover:bg-white
            hover:text-orange-500
            focus:shadow-outline-orange
        `
        if (! light) {
            colors += `
                dark:text-orange-500
                dark:hover:text-orange-400
                dark:bg-gray-900
                dark:hover:bg-gray-800
            `
        }
    } else if (tertiary) {
        colors = `
            text-orange-600
            hover:text-orange-500
            dark:text-orange-500
            dark:hover:text-orange-400
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
        select-none
        focus:outline-none
        transition
        duration-150
        ease-in-out
    `
</script>

<div class="
    rounded-md
    {! tertiary && (big ? 'shadow' : 'shadow-sm') || ''}
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
    {:else if type}
        <button
            aria-label={label}
            {type}
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
