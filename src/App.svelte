<script>
    import Router from 'src/router/Router.svelte';

    if ('serviceWorker' in navigator) {
        if (process.env.NODE_ENV === 'production') {
            navigator.serviceWorker.register('/service-worker.js');
        } else {
            navigator.serviceWorker.getRegistrations()
                .then((registrations) => {
                    registrations.forEach((registration) => {
                        registration.unregister();
                    });
                    return registrations.length;
                })
                .then((len) => {
                    if (len > 0) {
                        location.reload();
                    }
                });
        }
    }
</script>

<Router />
