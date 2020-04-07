<script>
    import Button from '/components/Button';
    import Page from '/templates/Page';

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
        sm:text-5xl
        sm:leading-none
        md:text-6xl
    ">
        {#await promise}
            <span class="
                text-gray-600
                dark:text-gray-500
            ">
                Waiting...
            </span>
        {:then date}
            {date}
        {:catch error}
            Server unavailable !
        {/await}
    </h2>
    <div class="
        mt-5
        max-w-md
        mx-auto
        sm:flex
        sm:justify-center
        md:mt-8
    ">
        <Button
            big
            url="/"
        >
            Go back
        </Button>
    </div>
</Page>
