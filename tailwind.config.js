const defaultTheme = require('tailwindcss/defaultTheme');
const tailwindUI = require('@tailwindcss/ui');

module.exports = {
    purge: [
        './public/index.html',
        './src/**/*.svelte'
    ],
    theme: {
        extend: {
            colors: {
                coal: {
                    '50': '#f9f9f9',
                    '100': '#f7f7f7',
                    '200': '#eaeaea',
                    '300': '#dbdbdb',
                    '400': '#b2b2b2',
                    '500': '#7f7f7f',
                    '600': '#636363',
                    '700': '#515151',
                    '800': '#3f3f3f',
                    '900': '#2d2d2d',
                }
            },
            fontFamily: {
                sans: [
                    'Inter var',
                    ...defaultTheme.fontFamily.sans,
                ],
            },
            fontSize: {
                '14px': '14px',
                '16px': '16px'
            },
            screens: {
                xs: '420px',
                dark: {
                    raw: '(prefers-color-scheme: dark)',
                },
                light: {
                    raw: '(prefers-color-scheme: light)',
                },
            },
            zIndex: {
                '-10': '-10',
            }
        },
    },
    plugins: [
        tailwindUI({
            // layout: 'sidebar',
        })
    ]
};
