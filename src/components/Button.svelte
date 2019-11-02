<script>
    import {link} from 'svelte-spa-router';

    export let name;
    export let url;
</script>

<a
    href="{url}"
    use:link
    class="
    btn-blue
">
    { name }
</a>
