<script>
    import { createEventDispatcher } from 'svelte'

    export let value
    export let label = undefined
    export let id = undefined
    export let placeholder
    export let type = undefined

    let lines

    const dispatch = createEventDispatcher()

    const classes = `
        form-input
        block
        w-full
        transition
        duration-150
        ease-in-out
        bg-gray-100
        border-gray-100
        focus:bg-white
        focus:border-gray-600
        focus:shadow-outline-gray
        sm:text-sm
        sm:leading-5
    `
</script>

<div class="
    flex-1
    space-y-1
">
    {#if label && id}
        <label
            for={id}
            class="
            block
            text-sm
            font-medium
            leading-5
            text-gray-700
        ">
            {label}
        </label>
    {/if}
    <div class="
        rounded-md
        shadow-sm
    ">
        {#if type === 'textarea'}
            <textarea
                {id}
                {placeholder}
                rows="4"
                bind:value={value}
                on:keyup={(event) => { dispatch('update', { value }) }}
                class="
                {classes}
            " />
        {:else}
            <input
                {id}
                {placeholder}
                bind:value={value}
                on:keyup={(event) => { dispatch('update', { value }) }}
                class="
                {classes}
            " />
        {/if}
    </div>
</div>
