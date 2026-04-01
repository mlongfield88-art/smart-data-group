import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://smartdatagroup.org',
  output: 'static',
  server: { port: 4323 },
  build: {
    assets: '_assets',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
