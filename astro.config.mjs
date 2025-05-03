// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
    site: 'https://redoingmods.github.io',
    integrations: [
        tailwind(),
        mdx(),
    ],
    build: {
        assets: 'assets'
    },
    output: 'static',
});
