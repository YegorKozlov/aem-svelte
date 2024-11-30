import COMPONENTS from './registry';
import { mount } from 'svelte';

class SvelteComponent extends HTMLElement {
  connectedCallback() {
    const props = this.dataset;
    const component = COMPONENTS[props.component];
    if(!component) {
      throw new Error(`Component ${props.component} not found. Known components: ${Object.keys(COMPONENTS).join(', ')}`);
    }
    mount(component, { target: this, props });
  }
}

customElements.define('svelte-component', SvelteComponent);
