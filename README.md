# Svind

## Description

The Svind stack (Svelte, Vite, Vercel, Tailwind) brings a whole new DX. This boilerplate aims to bring this experience to you with everything already setup with a few extras (such as full PWA support with custom service worker).

## Goals

- Vite with HMR
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
    - and a few other things
  - Purged and nano-tized when building for production
- Router
  - Dynamic route import for code splitting
- Images
  - `webp` version of your images generated automatically
  - [Component](https://github.com/gawlk/svind/blob/master/src/components/Image.svelte) pre created to support both the original image and the `webp` version
  - Automatic image optimization when building for production
- Vercel
  - Example functions and integration
  - To make it work properly, you'll need to change the settings on your project page on https://vercel.com to
    - Build command: `yarn build`
    - Deploy folder: `dist`
    - Development command: `yarn dev --port $PORT`
- CI
  - Basic build test on push

## Setup

```bash
git clone https://github.com/gawlk/svind
cd svind
yarn
```
