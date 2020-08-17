<script>
    import { createEventDispatcher } from 'svelte'
    import Transition from 'svelte-class-transition'

    export let hasButton
    export let hasIcon
    export let toggle

    const dispatch = createEventDispatcher()
</script>

<Transition
    {toggle}
    transitions="transition transform"
    inTransition="ease-out duration-300"
    inState="opacity-0 scale-95 translate-y-2"
    onState="opacity-100 scale-100 translate-y-0"
    outTransition="ease-in duration-200"
>
    <div class="
        z-50
        fixed
        bottom-0
        inset-x-0
        pb-3
        select-none
        sm:pb-5
    ">
        <div class="
            max-w-screen-xl
            mx-auto
            px-3
            sm:px-6
            lg:px-8
        ">
            <div class="
                p-2
                rounded-lg
                bg-orange-600
                shadow-lg
                sm:p-3
            ">
                <div class="
                    flex
                    items-center
                    justify-between
                    flex-wrap
                ">
                    <div class="
                        w-0
                        flex-1
                        flex
                        items-center
                        truncate
                    ">
                        {#if hasIcon}
                            <Transition
                                inTransition="transition ease-in-out duration-1000"
                                inState="opacity-0"
                                onState="opacity-100"
                            >
                                <span class="
                                    p-2
                                    rounded-lg
                                    bg-orange-800
                                    text-white
                                ">
                                    <slot name="icon">
                                        <svg class="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24" />
                                    </slot>
                                </span>
                            </Transition>
                        {/if}
                        <Transition
                            inTransition="transition ease-in-out delay-100 duration-1000"
                            inState="opacity-0"
                            onState="opacity-100"
                        >
                            <p class="
                                mx-3
                                font-medium
                                text-white
                                truncate
                            ">
                                <slot name="message">
                                    Message
                                </slot>
                            </p>
                        </Transition>
                    </div>
                    {#if hasButton}
                        <Transition
                            inTransition="transition ease-in-out delay-200 duration-1000"
                            inState="opacity-0"
                            onState="opacity-100"
                        >
                            <div class="
                                order-3
                                mt-2
                                flex-shrink-0
                                w-full
                                sm:order-2
                                sm:mt-0
                                sm:w-auto
                            ">
                                <slot name="button"></slot>
                            </div>
                        </Transition>
                    {/if}
                    <Transition
                        inTransition="transition ease-in-out delay-300 duration-1000"
                        inState="opacity-0"
                        onState="opacity-100"
                    >
                        <div class="
                            order-2
                            flex-shrink-0
                            sm:order-3
                            sm:ml-2
                        ">
                            <button
                                on:click={() => { dispatch('close') }}
                                type="button"
                                aria-label="Closes the banner"
                                class="
                                p-2
                                rounded-md
                                hover:bg-orange-500
                                focus:outline-none
                                focus:bg-orange-500
                                transition
                                ease-in-out
                                duration-150
                            ">
                                <svg class="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
</Transition>
