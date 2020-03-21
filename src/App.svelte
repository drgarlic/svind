<script>
    import Banner from './components/Banner.svelte';
    import Button from './components/Button.svelte';
    import Router from './router/Router.svelte';

    import {
        updateAvailable,
    } from './store';

    if ('serviceWorker' in navigator) {
        if (process.env.NODE_ENV === 'production') {
            navigator.serviceWorker.register('/service-worker.js')
                .then((registration) => {
                    registration.addEventListener('updatefound', () => {
                        console.log('[Service Worker] Update found');
                        setTimeout(() => {
                            $updateAvailable = true;
                        }, 500);
                    })
                });
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

<Banner
    hasButton
    toggle={$updateAvailable}
    on:close={() => { $updateAvailable = false }}
>
    <span slot="message">
        <span class="md:font-semibold">
            A new version is available.
        </span>
        <span class="
            hidden
            md:inline
        ">
            You can refresh now or wait until your next launch.
        </span>
    </span>
    <div slot="button">
        <Button
            secondary
            light
            action={() => { location.reload() }}
            label="Reloads the page"
        >
            Refresh
        </Button>
    </div>
</Banner>

<Router />
