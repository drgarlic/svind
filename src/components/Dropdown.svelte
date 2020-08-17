<script>
    import { createEventDispatcher } from 'svelte'
    import Transition from 'svelte-class-transition'

    import Button from './Button.svelte'

    export let toggle
    export let label

    let button
    let dropdown

    const dispatch = createEventDispatcher()

    let position = '-right-22 origin-center'

    // $: {
    //     if (button) {
    //         const bb = button.getBoundingClientRect()
    //         const center = (bb.left + bb.right) / 2

    //         if (bb.left = )
    //         position = 'origin-top-right right-0'
    //         position = '-right-22 origin-center'
    //     }
    // }

    const onClickOutside = (event) => {
        if (toggle) {
            const x = event.clientX
            const y = event.clientY

            const bb = button.getBoundingClientRect()
            const bd = dropdown.getBoundingClientRect()

            const between = (low, value, high) => value >= low && value <= high

            if (
                ! (between(bb.left, x, bb.right) && between(bb.top, y, bb.bottom))
                && ! (between(bd.left, x, bd.right) && between(bd.top, y, bd.bottom))
            ) {
                dispatch('update', { value: false })
            }
        }
    }
</script>

<svelte:body on:click={onClickOutside} />

<div class="
    relative
    inline-block
    text-left
">
    <div bind:this={button}>
        <Button
            on:click={() => { dispatch('update', { value: ! toggle }) }}
            active={toggle}
            tertiary
            {label}
            customPadding="p-2"
        >
            <slot name="button">
            </slot>
        </Button>
    </div>

    <Transition
        {toggle}
        inState="opacity-0 scale-95"
        onState="opacity-100 scale-100"
        transitions="transition transform"
        inTransition="ease-out duration-100"
        outTransition="ease-in duration-75"
    >
        <div
            bind:this={dropdown}
            class="
            absolute
            z-20
            mt-2
            w-56
            rounded-lg
            shadow-lg
            bg-white
            px-2
            py-1
            {position}
        ">
            <slot name="content"></slot>
        </div>
    </Transition>
</div>
