<script>
    import Router from 'src/router/Router.svelte';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Registration successful, scope is:', registration.scope);
            })
            .catch((error) => {
                console.log('Service worker registration failed, error:', error);
            });
    }
</script>

<Router />
