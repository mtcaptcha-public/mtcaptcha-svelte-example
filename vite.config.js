import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [svelte()],
    define: {
      'import.meta.env.MTCAPTCHA_SITEKEY': JSON.stringify(env.MTCAPTCHA_SITEKEY || ''),
    },
  };
});
