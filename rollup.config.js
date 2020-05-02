import svelte from 'rollup-plugin-svelte';
import del from 'rollup-plugin-delete';
import livereload from 'rollup-plugin-livereload';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import * as packageJson from './package.json';

const production = ! process.env.ROLLUP_WATCH;

export default {
    input: packageJson.main,
    output: {
        sourcemap: true,
        format: 'es',
        name: 'app',
        dir: 'public/build/'
    },
    plugins: [
        del({
            targets: 'public/build/*',
            runOnce: true // Otherwise you'll have livereload bugs
        }),

        svelte({
            dev: ! production,
        }),

        alias({
            entries: {
                'src': `${__dirname}/src`
            },
        }),

        replace({
            'PRODUCTION': production,
        }),

        resolve({
            browser: true,
            dedupe: ['svelte'],
            extensions: [
                '.mjs',
                '.js',
                '.json',
                '.node',
                '.svelte'
            ]
        }),

        commonjs(),

        ! production && serve(),

        ! production && livereload('public'),

        production && terser(),
    ]
};

function serve() {
    let started = false;

    return {
        writeBundle() {
            if (! started) {
                started = true;

                require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                    stdio: ['ignore', 'inherit', 'inherit'],
                    shell: true
                });
            }
        }
    };
}
