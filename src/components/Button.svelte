<script>
    import { createEventDispatcher } from 'svelte';

    let _class = '';
    export { _class as class };

    export let href = undefined;
    export let blank = false;
    export let type = undefined;
    export let label;

    export let big = false;
    export let active = false;
    export let disabled = false;

    export let secondary = false;
    export let tertiary = false;
    export let danger = false;
    export let white = false;
    $: primary = ! secondary && ! tertiary && ! danger && ! white;

    export let customPadding = '';

    const dispatch = createEventDispatcher();

    let sizeClasses;
    $: {
        sizeClasses = `
            ${customPadding || 'px-4 py-2'}
            text-sm
            border-2
            space-x-1
            rounded-md
            sm:leading-5
        `;
        if (big) {
            sizeClasses = `
                ${customPadding || 'px-8 py-3 md:px-10 md:py-4'}
                border-4
                leading-6
                space-x-3
                rounded-lg
                md:text-lg
            `;
        }
    }

    let colorClasses;
    let hoverClasses;
    let focusClasses;
    let activeClasses;
    let activatedClasses;
    let disabledClasses;
    $: {
        hoverClasses = 'hover:-translate-y-px ';
        focusClasses = 'focus:-translate-y-px ';
        activeClasses = 'active:-translate-y-px ';
        activatedClasses = '-translate-y-px ';
        disabledClasses = 'opacity-50 cursor-wait ';

        if (primary) {
            colorClasses = 'text-white bg-orange-600';
            hoverClasses += 'hover:bg-orange-500';
            focusClasses += 'focus-not-active:bg-orange-500';
            activeClasses += 'active:bg-orange-600 active:border-orange-500';
            activatedClasses += 'bg-orange-600 border-orange-500';
        } else if (secondary) {
            colorClasses = 'text-orange-600 bg-gray-100 dark:text-orange-500 dark:bg-gray-900';
            hoverClasses += 'hover:bg-gray-50 dark:hover:bg-gray-800';
            focusClasses += 'focus-not-active:bg-gray-50 dark:focus-not-active:bg-gray-800';
            activeClasses += 'active:bg-gray-100 active:border-gray-50 dark:active:bg-gray-900 dark:active:border-gray-800';
            activatedClasses += 'bg-gray-100 border-gray-50 dark:bg-gray-900 dark:border-gray-800';
        } else if (tertiary) {
            colorClasses = 'text-gray-500 dark:text-gray-400';
            hoverClasses += 'hover:text-gray-600 hover:bg-gray-50 dark:hover:text-gray-300 dark:hover:bg-gray-900';
            focusClasses += 'focus-not-active:text-gray-600 focus-not-active:bg-gray-50 dark:focus-not-active:text-gray-300 dark:focus-not-active:bg-gray-900';
            activeClasses += 'active:text-gray-600 active:bg-white active:border-gray-50 dark:active:text-gray-300 dark:active:bg-black dark:active:border-gray-900';
            activatedClasses += 'bg-transparent text-gray-600 border-gray-50 dark:text-gray-300 dark:border-gray-900';
        } else if (danger) {
            colorClasses = 'text-red-700 bg-red-100';
            hoverClasses += 'hover:bg-red-50';
            focusClasses += 'focus-not-active:bg-red-50';
            activeClasses += 'active:bg-red-100';
            activatedClasses += 'bg-red-100';
        } else if (white) {
            colorClasses = 'text-orange-600 bg-white';
            hoverClasses += 'hover:text-orange-500';
            focusClasses += 'focus-not-active:text-orange-500';
            activeClasses += 'active:text-orange-600';
            activatedClasses += 'text-orange-600';
        }
    };

    $: classes = `
        w-full
        flex
        items-center
        justify-center
        font-medium
        select-none
        transition
        transform
        duration-150
        ease-in-out
        focus:outline-none
        ${colorClasses}
        ${sizeClasses}
        ${disabled
            ? disabledClasses
            : (active
                ? activatedClasses
                : `border-transparent ${hoverClasses} ${focusClasses} ${activeClasses}`
            )
        }
        ${_class}
    `;
</script>

{#if href}
    <a
        aria-label={label}
        title={label}
        href={href.startsWith('http') ? href : '#' + href}
        rel={blank === true ? 'noopener noreferrer' : ''}
        target={blank === true ? '_blank' : ''}
        {disabled}
        class="
        {classes}
    ">
        <slot>
            Name
        </slot>
    </a>
{:else if type}
    <button
        aria-label={label}
        title={label}
        {type}
        {disabled}
        class="
        {classes}
    ">
        <slot>
            Name
        </slot>
    </button>
{:else}
    <button
        on:click={() => { dispatch('click') }}
        aria-label={label}
        title={label}
        type="button"
        {disabled}
        class="
        {classes}
    ">
        <slot>
            Name
        </slot>
    </button>
{/if}
