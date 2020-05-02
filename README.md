# Svind

## Description

`svind` is a very simple PWA boilerplate that bundles `svelte`, `tailwind` and `now`.

I tried to keep the boilerplate as simple as possible but with enough to be able to write code right away without having to take care of the boring things first.

## Goals

- PWA
  - Notification prebuilt when a new version has been downloaded by the service worker
  - Icons and `manifest.json` automatically generated from configuration files and an image when building for production
  - Automatically updates the meta tags of the `index.html` when building for production
- SEO
  - [100/100/100/100 lighthouse score by default](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fsvind.now.sh%2F)
  - Easy meta tags thanks to built in Svelte support
  - `sitemap.xml` generated on demand via a now function
- Service worker
  - Easy to understand, no fancy library
  - Fully customizable
  - Support for all the different fetching methods
  - Precaches all the files and routes once the web app has loaded
  - Automatically updates on build via Gulp (cache name and precached files)
- CSS
  - Integrated Tailwind CSS
    - With dark/light mode support
    - Custom `coal` color that is missing in the library
    - and a few other things
  - Purged and nano-tized when building for production
- Router
  - Dynamic route import for code splitting
- Rollup
  - Easy imports with added `src` directory as path and `.svelte` extension to the extensions list
  - Code splitting support
  - Support for custom variables
- Images
  - `webp` version of your images generated automatically
  - [Component](https://github.com/gawlk/svind/blob/master/src/components/Image.svelte) pre created to support both the original image and the `webp` version
  - Automatic image optimization when building for production
- Now
  - Example functions and integration
- CI
  - Basic build test on push

## Setup

```bash
git clone https://github.com/gawlk/svind
cd svind
yarn install
```
