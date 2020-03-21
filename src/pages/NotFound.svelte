<script>
    import Button from 'src/components/Button.svelte';
    import Page from 'src/templates/Page.svelte';
    import Image from 'src/components/Image.svelte';
</script>

<Page>
    <Image
        path="logo.png"
        alt="Svelte logo"
        class="
        h-32
        sm:h-40
        md:h-56
        w-auto
        transform
        -translate-y-6
        -skew-y-12
        mx-auto
    "/>
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
        Page not found
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
