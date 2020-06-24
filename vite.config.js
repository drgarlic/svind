import path from 'path';
import svelte from 'vite-plugin-svelte';

let config = {
	alias: {
		'/src/': path.resolve(__dirname, './src'),
    },
    plugins: [
        svelte(),
    ],
	optimizeDeps: {
        include: [
            'svelte-spa-chunk/src/index',
        ],
        exclude: [
            'svelte-spa-chunk',
        ]
    },
};

export default config;
