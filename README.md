# Svind

## Description

`svind` is a very simple boilerplate of `svelte` and `tailwind`.
I tried to keep the project as simple as possible but with enough to be able to build the simplest SPA as fast as possible.

## How to

### Init

```bash
git clone https://github.com/gawlk/svind.git
cd svind
yarn install
```

### Run

#### Dev

```bash
yarn dev
```

#### Prod

```bash
yarn build
yarn start
```

or

```bash
yarn prod
```

### Tests

#### Unit

```bash
yarn test:unit
```

or in watch mode

```bash
yarn test:unit:watch
```

#### Coverage

```bash
yarn test:unit:coverage
```

#### Lint

```bash
yarn test:lint
```

#### Size

```bash
yarn test:size
```

#### Cypress

```bash
yarn test:ui
```

#### All

Will run: unit, coverage, lint, size tests

```bash
yarn test
```

### Now

#### Deploy

```bash
yarn now
```

or in prod mode

```bash
yarn now:prod
```

#### Local

```bash
yarn now:dev
```

### Gulp

```bash
yarn gulp
```
