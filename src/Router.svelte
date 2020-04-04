<script>
    import Router from 'svelte-spa-router';

    import Date from '/pages/Date';
    import Home from '/pages/Home';
    import NotFound from '/pages/NotFound';
    
    const routes = {
        '/': Home,
        '/date': Date,
        '*': NotFound,
    }
</script>

<Router {routes} />
