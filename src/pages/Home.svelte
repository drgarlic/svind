<script>
    import Landing from '/src/templates/Landing.svelte'
    import Button from '/src/components/Button.svelte'

    import {
        updateAvailable,
    } from '/src/js/store'
</script>

<Landing>
    <span slot="title">
        Make Svelte better
        <br class="xl:hidden" />
        with
        <span class="
            text-orange-600
            dark:text-orange-500
        ">Svind</span>
    </span>
    <p class="
        mt-3
        max-w-md
        mx-auto
        text-sm
        text-gray-500
        sm:text-lg
        md:mt-5
        md:max-w-3xl
        dark:text-gray-400
    ">
        The Svind stack (Svelte, Vite, Vercel, Tailwind) brings a whole new DX. This boilerplate aims to bring this experience to you with everything already setup with a few extras (such as full PWA support with custom service worker).
    </p>
    <div class="
        max-w-md
        mx-auto
        mt-5
        space-y-3
        md:mt-8
        md:space-y-5
    ">
        <div class="
            space-y-5
            sm:flex
            sm:justify-center
            sm:space-y-0
            sm:space-x-3
        ">
            <Button
                big
                href="https://github.com/gawlk/svind"
                label="Go to github page"
            >
                Get started
            </Button>
            <Button
                big
                secondary
                href="/date"
                label="Go to API demo page"
            >
                API demo
            </Button>
        </div>
        <Button
            big
            tertiary
            on:click={() => { $updateAvailable = ! $updateAvailable }}
            label="Toggle update banner"
        >
            Toggle update
        </Button>
    </div>
</Landing>
