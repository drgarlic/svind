<script>
    import { createEventDispatcher } from 'svelte';

    import Transition from './Transition.svelte';

    export let hasButton;
    export let toggle;

    const dispatch = createEventDispatcher();
</script>

<Transition
    toggle={toggle}
    inTransition="ease-out duration-500"
    inState="opacity-0 scale-95 translate-y-2"
    onState="opacity-100 scale-100 translate-y-0"
    outTransition="ease-in duration-300"
    startsHidden
    let:transitions={transitions}
>
    <div class="
        z-50
        fixed
        bottom-0
        inset-x-0
        pb-3
        {transitions}
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
                bg-pink-600
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
                        <p class="
                            px-3
                            font-medium
                            text-white
                            truncate
                        ">
                            <slot name="message">
                                Message
                            </slot>
                        </p>
                    </div>
                    {#if hasButton}
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
                    {/if}
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
                            flex
                            p-2
                            rounded-md
                            hover:bg-pink-500
                            focus:outline-none
                            focus:bg-pink-500
                            transition
                            ease-in-out
                            duration-150
                        ">
                            <svg class="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Transition>
