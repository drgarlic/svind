import path from 'path'
import svite from 'svite'

const sviteConfig = {
    hot: true,
    useTransformCache: false, // default is true, but HMR is broken then
    svelte: {},
}

let config = {
	alias: {
		'/src/': path.resolve(__dirname, './src'),
    },
    plugins: [
        svite(sviteConfig),
    ],
	optimizeDeps: {
        include: [
            'svelte-spa-chunk/src/index',
        ],
        exclude: [
            'svelte-spa-chunk',
        ],
    },
}

export default config
