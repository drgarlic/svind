# Svind

## Description

`svind` is a very simple boilerplate that bundles `svelte`, `tailwind`, `now` and a few extras.

I tried to keep the project as simple as possible but with enough to be able to write code right away without having to take care of the boring things first.

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
