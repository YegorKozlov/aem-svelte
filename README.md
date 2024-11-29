# aem-svelte
A bare-bones example how to use Svelte with Rollup in Adobe Experience Manager

Credits to https://medium.com/@jlanssie/use-svelte-in-adobe-experience-manager-ec51bb3494c5 and https://typeofnan.dev/how-to-set-up-a-svelte-app-with-rollup/

## Project Setup

### Add Svelte modules
Go to your ui.frontend module root.

Install Svelte
```
npm i svelte
```

and the Rollup libraries
```
npm i @rollup/plugin-node-resolve rollup-plugin-svelte --save-dev
```
- `@rollup/plugin-node-resolve`, which is used to help rollup resolve third-party plugins
- `rollup-plugin-svelte` a third-party plugin that helps rollup understand how to process Svelte apps

### Create the Rollup Config File

#### rollup.config.js

```
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
```

### Add aemsync to push content to AEM upon a file change.
```
npm i aemsync concurrently --save-dev
```

with all the steps above your `package.json` should  look like
```
{
  "name": "aem-svelte",
  "author": "Yegor Kozlov",
  "version": "1.0.0",
  "dependencies": {
    "svelte": "^4.2.3"
  },
  "scripts": {
    "build": "rollup -c",
    "dev": "concurrently \"rollup -c -w\" \"aemsync -w ../ui.apps/src/main/content\""
  },
  "devDependencies": {
    "@rollup/plugin-node-resolve": "^15.3.0",
    "aemsync": "^5.0.5",
    "concurrently": "^9.1.0",
    "rollup": "^4.27.4",
    "rollup-plugin-svelte": "^7.2.2"
  }
}
```

## Create Svelte components

#### counter.svelte
```
<script>
  import { count } from './store.js';
  export let message;

	export function increment() {
		count.update(n => n + 1);
	}
</script>

<button on:click={increment}>
	{message} clicked {$count}
	{$count === 1 ? 'time' : 'times'}
</button>
```
The counter value is managed in a Svelte store and can be used by other components:
#### store.js
```
// store.js
// eslint-disable-next-line import/no-unresolved
import { writable } from 'svelte/store';

export const count = writable(0);
```

### Create a Registry of Svelte components

We will need it to resolve components by name
```
import Counter from './counter.svelte';

const COMPONENTS = {
  counter: Counter
};

export default COMPONENTS;
```

### Initialize Svelte components

This JavaScript file will handle all our components’ registration, creation mounting and it will make sure that newly added components to the page get picked up, even after the DOM has loaded.

```
import COMPONENTS from './registry';

class SvelteComponent extends HTMLElement {
  connectedCallback() {
    const props = this.dataset;
    const clz = COMPONENTS[props.component];
    if(!clz) {
      throw new Error(`Component ${props.component} not found. Known components: ${Object.keys(COMPONENTS).join(', ')}`);
    }
    new clz({ target: this, props });
  }
}

customElements.define('svelte-component', SvelteComponent);
```

### Create AEM Component
The AEM component will create an HTML element with the tag <svelte-component> and an attribute data-component set from the component properties.
```
<svelte-component data-component="counter"></svelte-component>
```

## How to Develop

### Build and deploy the project

```
mvn clean install -PautoInstallPackage
```

### Star the Dev mode to watch for changes and push them to AEM
from the `ui.frontend` directory run
```
npm run dev
```
you should see something like
```
> aem-svelte@1.0.0 dev
> concurrently "rollup -c -w" "aemsync -w ../ui.apps/src/main/content"

[1] aemsync version 5.0.5
[1]
[1]     Watch over: /Users/yegor.kozlov/projects/scratchpad/aem-svelte/ui.apps/src/main/content
[1]        Targets: http://admin:admin@localhost:4502
[1]        Exclude: **/jcr_root/*
[1]                 **/@(.git|.svn|.hg|target)
[1]                 **/@(.git|.svn|.hg|target)/**
[1]          Delay: 300
[1]
[0] rollup v4.27.4
[0] bundles src/index.js → ../ui.apps/src/main/content/jcr_root/apps/aem-svelte/clientlibs/clientlib-site/js/bundle.js...
[0] created ../ui.apps/src/main/content/jcr_root/apps/aem-svelte/clientlibs/clientlib-site/js/bundle.js in 170ms
[1] + jcr_root/apps/aem-svelte/clientlibs/clientlib-site/js/bundle.js
```

The navigate to the counter page http://localhost:4504/content/aem-svelte/counter.html?wcmmode=disabled and you should see your Svelte component in action.

All changes made in the ui.fronentend module will be compiled and push to AEM. 