const defaultTheme = require('tailwindcss/defaultTheme');
const tailwindUI = require('@tailwindcss/ui');

module.exports = {
    purge: [
        './index.html',
        './src/**/*.js',
        './src/**/*.svelte',
    ],
    theme: {
        extend: {
            borderRadius: {
                xl: '1rem',
                '2xl': '2rem',
                '3xl': '4rem',
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
    variants: {
        backgroundColor: [ 'responsive', 'hover', 'active', 'focus', 'focus-not-active', 'even', 'odd' ],
        borderColor: [ 'responsive', 'hover', 'focus', 'active' ],
        borderWidth: [ 'responsive', 'first', 'last', 'not-first', 'not-last' ],
        margin: [ 'responsive', 'first', 'last', 'not-first', 'not-last' ],
        textColor: [ 'responsive', 'hover', 'focus', 'active', 'focus-not-active' ],
    },
    plugins: [
        tailwindUI({
            // layout: 'sidebar',
        }),
        function({ addVariant, e }) {
            const variants = [
                {
                    name: 'not-first',
                    rule: 'not(:first-child)',
                },
                {
                    name: 'not-last',
                    rule: 'not(:last-child)',
                },
                {
                    name: 'focus-not-active',
                    rule: 'focus:not(:active)',
                }
            ];

            variants.forEach((variant) => {
                addVariant(variant.name, ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `${variant.parent ? `${variant.parent} ` : ''}.${e(`${variant.name}${separator}${className}`)}${variant.rule ? `:${variant.rule}` : ''}`;
                    });
                });
            });
        }
    ]
};
