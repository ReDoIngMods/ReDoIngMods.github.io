# ReDoIng Mods Website

This is the official website for ReDoIng Mods, a Scrap Mechanic modding group. The site is built using [Astro](https://astro.build), a modern static site generator that provides excellent performance and developer experience.

## Features

- Fast static site generation with Astro
- Markdown documentation pages with MDX support
- Responsive design with Tailwind CSS
- GitHub Actions integration for automated deployment

## Project Structure

```
├── public/               # Public static assets
│   ├── fonts/            # Font files
│   └── img/              # Image files
├── src/
│   ├── components/       # Reusable Astro components
│   ├── layouts/
│   │   ├── Layout.astro  # Main site layout
│   │   └── DocLayout.astro # Documentation page layout
│   ├── pages/
│   │   ├── index.astro   # Home page
│   │   └── docs/         # Documentation pages (Markdown)
│   └── styles/           # Global styles
├── scripts/
│   └── copy-assets.js    # Script to copy assets from resources dir
└── astro.config.mjs      # Astro configuration
```

## Development

To run the site locally:

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the dev server: `npm run dev`
4. Open your browser to `http://localhost:4321`

## Documentation

The documentation is written in Markdown and MDX (Markdown with JSX). To add new documentation:

1. Create a new `.mdx` file in `src/pages/docs/`
2. Add frontmatter with the layout and meta information:

```md
---
layout: ../../layouts/DocLayout.astro
title: Your Page Title | ReDoIng Mods
description: Description of your page
---

# Your Page Title

Content goes here...
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment is handled by GitHub Actions, with the workflow defined in `.github/workflows/deploy.yml`.

## Migrating from the Original Site

This site was migrated from a static HTML site to Astro. The migration process included:

- Converting HTML to Astro components
- Setting up Markdown documentation pages
- Configuring GitHub Actions for deployment
- Creating a script to copy assets from the original resources directory

## Credits

- [Astro](https://astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [MDX](https://mdxjs.com)
