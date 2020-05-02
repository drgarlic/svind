<script>
    import Router from 'svelte-spa-router';
    import { ChunkGenerator } from 'svelte-spa-chunk';
    import ChunkComponent from 'svelte-spa-chunk/Chunk.svelte';

    const Chunk = ChunkGenerator(ChunkComponent);

    const routes = {
        '/': Chunk(() => import('./pages/Home')),
        '/date': Chunk(() => import('./pages/Date')),
        '*': Chunk(() => import('./pages/NotFound')),
    };
</script>

<Router {routes} />
