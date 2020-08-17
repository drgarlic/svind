<script>
    import { createEventDispatcher } from 'svelte'
    import Transition from 'svelte-class-transition'

    export let toggle
    export let title = 'Title'
    export let description = 'This is a description'

    const dispatch = createEventDispatcher()
</script>

<div class="
    fixed
    inset-0
    z-50
    flex
    items-end
    justify-center
    px-4
    py-6
    pointer-events-none
    xl:p-6
    xl:items-start
    xl:justify-end
">
    <Transition
        {toggle}
        inState="translate-y-2 opacity-0 xl:translate-y-0 xl:translate-x-2"
        onState="translate-y-0 opacity-100 xl:translate-x-0"
        outState="opacity-0"
        transitions="transition transform"
        inTransition="ease-out duration-300"
        outTransition="ease-in duration-100"
    >
        <div class="
            max-w-sm
            w-full
            bg-white
            shadow-lg
            rounded-lg
            pointer-events-auto
        ">
            <div class="
                rounded-lg
                overflow-hidden
            ">
                <div class="p-4">
                    <div class="
                        flex
                        items-start
                    ">
                        <div class="
                            flex-shrink-0
                            h-6
                            w-6
                            flex
                            items-center
                            justify-center
                        ">
                            <slot></slot>
                        </div>
                        <div class="
                            ml-3
                            w-0
                            flex-1
                            pt-0.5
                        ">
                            <p class="
                                text-sm
                                leading-5
                                font-medium
                                text-gray-900
                            ">
                                {title}
                            </p>
                            <p class="
                                mt-1
                                text-sm
                                leading-5
                                text-gray-500
                            ">
                                {description}
                            </p>
                        </div>
                        <div class="
                            ml-4
                            flex-shrink-0
                            h-6
                            w-6
                            flex
                            items-center
                            justify-center
                        ">
                            <button
                                on:click={() => { dispatch('close') }}
                                class="
                                inline-flex
                                text-gray-400
                                focus:outline-none
                                focus:text-gray-500
                                transition
                                ease-in-out
                                duration-150
                            ">
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</div>
