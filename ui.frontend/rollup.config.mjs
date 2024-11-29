/* eslint-disable import/no-extraneous-dependencies */
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';

export default
{
  input: 'src/index.js',
  output: {
    file: '../ui.apps/src/main/content/jcr_root/apps/aem-svelte/clientlibs/clientlib-site/js/bundle.js',
    format: 'iife',
    name: 'bundle',
  },
  plugins: [
    svelte(),
    resolve({ browser: true }),
  ],
};
