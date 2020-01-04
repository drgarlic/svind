<script>
    import Button from 'src/components/ButtonLink.svelte';
    import Page from 'src/templates/Page.svelte';
</script>

<Page title="Welcome ! 👋">
    <Button
        name="Get current date ⏰"
        url="/date"
        class="mb-2"
    />
    <Button
        name="Checkout the repository"
        url="https://github.com/gawlk/svind"
    />
</Page>
