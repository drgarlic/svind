<script>
    import Router from 'svelte-spa-router';
    import { ChunkGenerator } from 'svelte-spa-chunk/src/index';
    import ChunkComponent from 'svelte-spa-chunk/Chunk.svelte';

    const Chunk = ChunkGenerator(ChunkComponent);

    const routes = {
        '/': Chunk(() => import('./pages/Home.svelte')),
        '/date': Chunk(() => import('./pages/Date.svelte')),
        '*': Chunk(() => import('./pages/NotFound.svelte')),
    };
</script>

<Router {routes} />
