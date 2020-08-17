<script>
    export let onClick
    export let text
    export let onClickBis = undefined
</script>

<div class="
    flex
    py-1
">
    <button
        on:click={onClick}
        aria-label={text}
        class="
        flex-1
        group
        flex
        items-center
        p-2
        text-sm
        leading-5
        text-gray-600
        hover:text-gray-900
        focus:outline-none
        focus:text-gray-900
        truncate
    ">
        <div class="
            flex-none
            mr-3
            text-gray-400
            group-hover:text-gray-500
        ">
            <slot name="icon"></slot>
        </div>
        <p class="
            flex-1
            truncate
            text-left
        ">
            {text}
        </p>
    </button>
    {#if onClickBis}
        <button
            on:click={onClickBis}
            aria-label={text + '-additional-button'}
            class="
            flex-none
            p-2
            text-gray-400
            hover:text-gray-500
            focus:text-gray-500
            focus:outline-none
        ">
            <slot name="icon2"></slot>
        </button>
    {/if}
</div>
