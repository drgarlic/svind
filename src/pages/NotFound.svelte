<script>
    import Button from '/components/Button';
    import Page from '/templates/Page';
    import Image from '/components/Image';
</script>

<Page>
    <Image
        path="svelte.png"
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
        sm:text-5xl
        sm:leading-none
        md:text-6xl
    ">
        Page not found
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
