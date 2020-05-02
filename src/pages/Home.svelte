<script>
    import Landing from 'src/templates/Landing';
    import Button from 'src/components/Button';

    import {
        updateAvailable,
    } from 'src/store';
</script>

<Landing>
    <span slot="title">
        Simplify Svelte
        <br class="xl:hidden" />
        with
        <span class="
            text-pink-600
            dark:text-pink-500
        ">Svind</span>
    </span>
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
        <Button
            big
            tertiary
            action={() => { $updateAvailable = ! $updateAvailable }}
        >
            Toggle update
        </Button>
    </div>
</Landing>
