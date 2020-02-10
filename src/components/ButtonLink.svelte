<script>
    import { link } from 'svelte-spa-router';

    // Because Svelte doesn't allow to add css classes to a component, here's a workaround
    let _class = '';
    export { _class as class };

    export let name;
    export let url;

    const defaultClasses = `
        cursor-pointer
        font-bold
        px-4
        py-2
        rounded-lg
        bg-teal-600
        text-white
        select-none
        shadow-inner
        hover:bg-teal-700
        focus:shadow-none
    `
</script>

{#if url.startsWith('http')}
    <a
        href={url}
        class="
        {defaultClasses}
        {_class}
    ">
        { name }
    </a>
{:else}
    <a
        href={url}
        use:link
        class="
        {defaultClasses}
        {_class}
    ">
        { name }
    </a>
{/if}
