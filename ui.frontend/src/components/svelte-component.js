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
