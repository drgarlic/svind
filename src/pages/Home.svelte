<script>
    import Button from '/components/Button';
    import Page from '/templates/Page';

    import {
        updateAvailable,
    } from '/store';
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
        Simplify Svelte
        <br class="xl:hidden" />
        with
        <span class="
            text-pink-600
            dark:text-pink-500
        ">Svind</span>
    </h2>
    <p class="
        mt-3
        max-w-md
        mx-auto
        text-base
        text-gray-500
        sm:text-lg
        md:mt-5
        md:text-xl
        md:max-w-3xl
        dark:text-gray-400
    ">
        A functionnal, Svelte 3, SEO friendly, PWA, with Tailwind CSS and Zeit Now, boilerplate that is up to date and works out of the box.
    </p>
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
            url="https://github.com/gawlk/svind"
        >
            Get started
        </Button>
        <Button
            big
            secondary
            url="/date"
        >
            API demo
        </Button>
    </div>
    <div class="
        mt-3
        max-w-md
        mx-auto
        sm:flex
        sm:justify-center
        md:mt-5
    ">
        <Button
            big
            tertiary
            action={() => { $updateAvailable = true }}
        >
            Simulate new version's banner
        </Button>
    </div>
</Page>
