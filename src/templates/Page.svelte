<svelte:head>
    <title>svind</title>
    <meta name="description" content="A functionnal, Svelte 3, SEO friendly, PWA, with Tailwind CSS and Zeit Now, boilerplate that is up to date and works out of the box."/>
</svelte:head>

<div class="
    relative
    overflow-hidden
    h-screen
">
    <div class="
        hidden
        sm:block
        sm:absolute
        sm:inset-y-0
        sm:h-full
        sm:w-full
    ">
        <div class="
            relative
            h-full
            max-w-screen-xl
            mx-auto
            text-gray-200
            dark:text-gray-800
        ">
            <svg class="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2" width="404" height="784" fill="none" viewBox="0 0 404 784">
                <defs>
                    <pattern id="svg-pattern-squares-1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="4" height="4" fill="currentColor" />
                    </pattern>
                </defs>
                <rect width="404" height="784" fill="url(#svg-pattern-squares-1)" />
            </svg>
            <svg class="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2" width="404" height="784" fill="none" viewBox="0 0 404 784">
                <defs>
                    <pattern id="svg-pattern-squares-2" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="4" height="4" fill="currentColor" />
                    </pattern>
                </defs>
                <rect width="404" height="784" fill="url(#svg-pattern-squares-2)" />
            </svg>
        </div>
    </div>

    <div class="
        relative
        flex
        items-center
        h-full
        pb-20
    ">
        <div class="
            mx-auto
            max-w-screen-xl
            px-4
            sm:px-6
        ">
            <div class="text-center">
                <slot>
                    Content
                </slot>
            </div>
        </div>
    </div>
</div>
