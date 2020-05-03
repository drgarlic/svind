<script>
    let _class = '';
    export { _class as class };

    export let path;
    export let alt = 'Alt';

    $: _path = 'assets/images/' + path;
    $: extension = _path.split('.').pop();
    $: pathWithoutExtension = _path.substr(0, _path.length - extension.length);
</script>

<picture>
    <source srcset={pathWithoutExtension + 'webp'} type="image/webp">
    <source srcset={_path} type={extension === 'png' ? 'image/png' : 'image/jpeg'}>
    <img
        src={_path}
        {alt}
        class="{_class}"
    >
</picture>
