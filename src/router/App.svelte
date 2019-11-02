<script>
    import Router from 'svelte-spa-router';

    import About from '@/pages/About';
    import Home from '@/pages/Home';
    import NotFound from '@/pages/NotFound';
    
    const routes = {
        '/': Home,
        '/about': About,
        '*': NotFound,
    }
</script>

<body>
    <Router {routes}/>
</body>
