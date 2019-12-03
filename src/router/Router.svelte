<script>
    import Router from 'svelte-spa-router';

    import Date from 'src/pages/Date.svelte';
    import Home from 'src/pages/Home.svelte';
    import NotFound from 'src/pages/NotFound.svelte';
    
    const routes = {
        '/': Home,
        '/date': Date,
        '*': NotFound,
    }
</script>

<Router {routes} />
