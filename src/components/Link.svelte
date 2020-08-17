<script>
    export let href
    export let label
    export let blank = true
</script>

<a
    aria-label={label}
    title={label}
    href={href.startsWith('http') ? href : '#' + href}
    rel={blank === true ? 'noopener noreferrer' : ''}
    target={blank === true ? '_blank' : ''}
    class="
    underline
    font-semibold
    text-gray-400
    hover:text-gray-500
">
    <slot></slot>
</a>
