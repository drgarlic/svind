<script>
    import Button from 'src/components/ButtonLink.svelte';
    import Page from 'src/templates/Page.svelte';

    const promise = (async () => {
        const res = await fetch('/api/date');
        const date = await res.json();
        return date;
    })();
</script>

<Page title="Date">
    <p class="pb-4">
        The date is:
        {#await promise}
            <b class="text-gray-200">Waiting...</b>
        {:then date}
            <b>{date}</b>
        {:catch error}
            <b class="text-red-600">ERROR: Server unavailable !</b>
        {/await}
    </p>
    <Button
        name="Go back"
        url="/"
    />
</Page>
