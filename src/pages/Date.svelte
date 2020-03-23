<script>
    import Button from 'src/components/Button.svelte';
    import Page from 'src/templates/Page.svelte';

    const promise = (async () => {
        const res = await fetch('/api/date');
        const date = await res.json();
        return date;
    })();
</script>

<Page>
    <h2 class="
        text-4xl
        tracking-tight
        leading-10
        font-extrabold
        text-gray-900
        sm:text-5xl
        sm:leading-none
        md:text-6xl
        dark:text-gray-100
    ">
        {#await promise}
            <span class="
                text-gray-600
                dark:text-gray-400
            ">
                Waiting...
            </span>
        {:then date}
            {date}
        {:catch error}
            Server unavailable !
        {/await}
    </h2>
    <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
        <Button
            big
            url="/"
        >
            Go back
        </Button>
    </div>
</Page>
