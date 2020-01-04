<script>
    import { link } from 'svelte-spa-router';

    // Because Svelte doesn't allow to add css classes to a component, here's a workaround
    let _class = '';
    export { _class as class };

    export let name;
    export let url;
</script>

{#if url.startsWith('http')}
    <a
        href={url}
        class="
        btn
        {_class}
    ">
        { name }
    </a>
{:else}
    <a
        href={url}
        use:link
        class="
        btn
        {_class}
    ">
        { name }
    </a>
{/if}
