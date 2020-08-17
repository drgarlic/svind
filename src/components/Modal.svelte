<script>
    import Transition from 'svelte-class-transition'

    export let toggle
    export let positionAbsolute = false
    export let noBackground = false
    export let full = false
</script>

<Transition
    {toggle}
>
    <div
        id="modal"
        class="
        {positionAbsolute ? 'absolute' : 'fixed'}
        z-30
        bottom-0
        inset-0
        p-6
    ">
        <div class="
            flex
            items-end
            sm:items-center
            sm:justify-center
            w-full
            h-full
        ">

            {#if ! noBackground}
                <Transition
                    transitions="transition-opacity"
                    inTransition="ease-out duration-300"
                    inState="opacity-0"
                    onState="opacity-100"
                    outTransition="ease-in duration-200"
                >
                    <div class="
                        {positionAbsolute ? 'absolute' : 'fixed'}
                        inset-0
                    ">
                        <div class="
                            absolute
                            inset-0
                            bg-gray-500
                            opacity-75
                        "/>
                    </div>
                </Transition>
            {/if}

            <Transition
                transitions="transition transform"
                inTransition="ease-out duration-300"
                inState="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                onState="opacity-100 translate-y-0 sm:scale-100"
                outTransition="ease-in duration-200"
            >
                <div class="
                    rounded-lg
                    shadow-xl
                    {full ? 'max-h-full h-full w-full' : 'sm:max-w-lg sm:w-full'}
                ">
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                        class="
                        bg-white
                        rounded-lg
                        {full ? 'max-h-full flex flex-col' : ''}
                    ">
                        <slot>
                            Content
                        </slot>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</Transition>
