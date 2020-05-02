<script>
    import Landing from 'src/templates/Landing';
    import Button from 'src/components/Button';

    const promise = (async () => {
        const res = await fetch('/api/date');
        const date = await res.json();
        return date;
    })();
</script>

<Landing>
    <span slot="title">
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
    </span>
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
</Landing>
