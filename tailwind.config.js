const defaultTheme = require('tailwindcss/defaultTheme');
const tailwindUI = require('@tailwindcss/ui');

module.exports = {
    theme: {
        extend: {
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
        margin: [ 'not-first', 'responsive' ],
    },
    plugins: [
        tailwindUI({
            // layout: 'sidebar',
        }),
        function({ addVariant, e }) {
            const variants = [
                {
                    name: 'not-first',
                    css: 'not(:first-child)',
                },
                {
                    name: 'not-last',
                    css: 'not(:last-child)',
                },
            ];

            variants.forEach((variant) => {
                addVariant(variant.name, ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.${e(`${variant.name}${separator}${className}`)}:${variant.css}`;
                    });
                });
            });
        }
    ]
};
