<script>
    import Router from 'svelte-spa-router';

    import About from 'src/pages/About';
    import Home from 'src/pages/Home';
    import NotFound from 'src/pages/NotFound';
    
    const routes = {
        '/': Home,
        '/about': About,
        '*': NotFound,
    }
</script>

<body>
    <Router {routes}/>
</body>
