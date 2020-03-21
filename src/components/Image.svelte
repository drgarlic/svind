<script>
    // Because Svelte doesn't allow to add css classes to a component, here's a workaround
    let _class = '';
    export { _class as class };

    export let path;
    export let alt = '';

    path = 'assets/images/' + path;

    const extension = path.split('.').pop();
    const pathWithoutExtension = path.substr(0, path.length - extension.length);
</script>

<picture>
    <source srcset={pathWithoutExtension + 'webp'} type="image/webp">
    <source srcset={path} type={extension === 'png' ? 'image/png' : 'image/jpeg'}>
    <img
        src={path}
        {alt}
        class="{_class}"
    >
</picture>
