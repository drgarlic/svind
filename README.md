# Svind

## Description

`svind` is a very simple boilerplate that bundles `svelte`, `tailwind`, `now` and a few extras.

I tried to keep the project as simple as possible but with enough to be able to write code right away without having to think about the boring things.

## Warning

For the rest of this `README`, I'll assume that you're using `yarn`, if not change the commands accordingly.

## How to use

### Download

```bash
git clone https://github.com/gawlk/svind.git
cd svind
yarn install
```

### Commands

Here are the available scripts of this boilerplate.

```bash
yarn dev                    Runs the server in development mode
yarn build                  Builds your static files
yarn start                  Starts the server
yarn prod                   Shortcut for build+start
yarn now                    Starts a deployment
yarn now:dev                Runs now in development mode
yarn now:prod               Starts a production deployment
yarn gulp                   Runs Gulp
yarn test                   Runs all tests
yarn test:unit              Runs Jest tests
yarn test:unit:watch        Runs Jest tests in watch mode
yarn test:unit:coverage     Runs Jest coverage calculator
yarn test:lint              Checks your code with ESLint
yarn test:size              Runs a size-limit test
yarn test:ui                Runs Cypress tests
yarn test:audit             Runs Lighthouse tests
```

## Step by step (work in progress)

If you prefer to build your project yourself, here's a very detailed guide with all the steps.

### 1. Svelte

#### 1.1 Initialize a Svelte project

First you'll have to download the official Svelte template:

```bash
npx degit sveltejs/template PROJECT_NAME
bash PROJECT_NAME
```

Then install the packages with: `yarn install`

#### 1.2 Aliases (optionnal)

You might want to have aliases in your project just like in `Vue`. For example being able to do `src/components/X.svelte` instead of `../../../../../../components/X.svelte` when you're in a deep component.

If so, you can run the following command in your terminal to install a `rollup` package that let you do just that: `yarn add -D @rollup/plugin-alias`

Then add this code in your `rollup.config.js` file in the `plugins` array before `svelte({...})`:

```js
alias({
    entries: {
        'src': `${__dirname}/src`
    },
    resolve: [
        ''
    ],
}),
```

Here we just create a shortcut to the root of our source folder.

#### 1.3 `process.env` variables (optionnal)

`process.env` variables are very common in `webpack` projects. You probably used them in `Vue`, `React` or even `Angular` but here, they don't exist in `rollup`.

But ! There is a way to add them. All you have to do is run this command in your terminal:

```bash
yarn add -D @rollup/plugin-replace
```

Then add these code in your `rollup.config.js` file in the `plugins` array before `svelte({...})`:

```js
replace({
    'process.browser': true,
    'process.env.NODE_ENV': JSON.stringify(mode),
}),
```

and finally add the following line in the same file just after `const production = ! process.env.ROLLUP_WATCH;`:

```js
const mode = production ? 'production' : 'development';
```

Now, you'll be able to call `process.env.NODE_ENV` just like you did with your `webpack` projects !

### 2. Tailwind

#### 2.1 Installation

The installation of `Tailwind` is a bit harder than those of other CSS libraries but the benefits definitely outweigh the long installation process.

First run this in your terminal to install the packages:

```bash
yarn add -D tailwindcss @tailwindcss/ui postcss autoprefixer cssnano postcss-import @fullhuman/postcss-purgecss
```

Then create a `main.css` file in `src/` with the following code:

```css
/* purgecss start ignore */

@import "tailwindcss/base";

@import "tailwindcss/components";

/* purgecss end ignore */

@import "tailwindcss/utilities";
```

Then create a `tailwind.config.js` file with the following code:

```js
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
        },
    },
    plugins: [
        tailwindUI()
    ]
};
```

Then you have to create a `postcss.config.js` file with the following code:

```js
const production = ! process.env.ROLLUP_WATCH;
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssimport = require('postcss-import');
const purgecss = require('@fullhuman/postcss-purgecss');
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    postcssimport(),
    tailwindcss,
    autoprefixer,

    production && purgecss({
      content: [
        './public/**/*.html',
        './src/**/*.html',
        './src/**/*.svelte'
      ],
      defaultExtractor: (content) => {
        const matches = content.match(/[\w-/.:]+(?<!:)/g) || [];
        // Special Svelte case when binding a class
        return matches.map(match => match.startsWith('class:') ? match.substr(6) : match);
      }
    }),

    production && cssnano({
      preset: 'default',
    })
  ]
};
```

Finally you'll need to add in your `rollup.config.js` file this line: `import postcss from 'rollup-plugin-postcss';`

And in the same file add the following block of code in the `plugins` array before `svelte({...})`:

```js
postcss({
    extract: 'public/build/bundle.tailwind.css'
}),
```

#### 2.2 An extended Tailwind CSS (optionnal)

Here's a more complete configuration which add support for browser dark and light theme, adds a new Z index and adds two variants, not first child and not last child:

```js
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
            screens: {
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
                        return `.${e(`${variant.name}${separator}${className}`)}:${variant.css}`
                    })
                })
            });
        }
    ]
};
```

### 3. Zeit now

#### 3.1 Installation

Run `yarn add -D now` to add `now` to your project. You might want to create to `api` folder right away, that's where your serverless functions will be located.

Don't forget to add `.now` to your `.gitignore` file, that's where `now` keeps important and secret data.

#### 3.2 Function example (optionnal)

Here's a little example of a serverless function

```js
export default (req, res) => {
    res.status(200).json(new Date());
};
```

If you put these code in a file called `date.js` in your `api` folder, after deploying via `now` you'll be able to go to `YOUR_ADDRESS/api/date` and get the result of this function. (Here's a live [example](https://svind.now.sh/api/date))

#### 3.3 SEO - Dynamic sitemap.xml (optionnal)

You might want to add a `sitemap.xml` to your website but having to maintain can be painful really fast but you could create a function that generates and returns a sitemap each time. Such function could be very useful for website such as blogs for example.

Here's an example, for this to work you'll need to change `YOUR_ADDRESS` by your actual address and to launch `yarn add -D sitemap` in your terminal.

```js
import {
    SitemapStream,
    streamToPromise,
} from 'sitemap';

const urls = [
    {
        url: '/',
    },
    {
        url: '/date',
    },
];

export default (req, res) => {
    res.setHeader('Content-Type', 'application/xml');

    const sitemap = new SitemapStream({
        hostname: YOUR_ADDRESS,
    });

    urls.forEach((url) => {
        sitemap.write(url);
    });

    sitemap.end();

    streamToPromise(sitemap)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).end();
        });
};
```

You can see here, that if you want to add a new route from your website to your sitemap you would just need to add an object to the `urls` list.

Finally, if you want `now`'s servers to redirect `/sitemap.xml` to `/api/sitemap` you need to create a `now.json` file if you didn't already and add this:

```json
{
    "routes": [
        {
            "src": "/sitemap.xml",
            "dest": "/api/sitemap"
        }
    ]
}
```

### 4. PWA

#### 4.1 Service worker

#### 4.2 Gulp (optionnal)

### 5. Continuous Integration (optionnal)

#### 5.1 Github actions

First you'll have to create `.github/workflows/nodejs.yml` with the following code

```yml
name: Node CI

on: [push]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [10.x, 12.x]
    
    env:
      CI: true

    steps:
    - uses: actions/checkout@v1
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - name: Install
      run: yarn install
    - name: Build
      run: yarn build
```

#### 5.X Lighthouse

To add lighthouse to your CI run the following

`yarn add -D @lhci/cli`

Then add these line to your list of scripts in your `package.json`

`"test:audit": "lhci autorun",`

If you made the `test` script earlier you might want to add `test:audit` to it

Finally add the following to your CI file

```yml
- name: Lighthouse audit
  run: yarn test:audit
```
