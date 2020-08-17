<script>
    import Landing from '/src/templates/Landing.svelte'
    import Button from '/src/components/Button.svelte'
    import Image from '/src/components/Image.svelte'
</script>

<Landing>
    <div slot="title">
        <Image
            src="svelte.png"
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
        Page not found
    </div>
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
