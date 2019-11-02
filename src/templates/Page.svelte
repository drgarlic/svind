<script>
    export let title;
</script>

<section class="base">
    <div class="
        container
        mx-auto
        px-4
        py-2
    ">
        <div class="
            flex
            flex-col
            items-center
        ">
            <img
                src="https://media.giphy.com/media/WwMHQqMG0yirepFPP8/giphy.gif"
                alt="octopus"
            >
            <h1 class="title">
                {title}
            </h1>
            <slot></slot>
        </div>
    </div>
</section>
