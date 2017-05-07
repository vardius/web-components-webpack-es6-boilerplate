import { WebComponent } from 'web-component'

@WebComponent('hello-world', {
  template: require('./hello-world.html'),
  shadowDOM: true
})
export class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this._who = null;
  }

  static get observedAttributes() {
    return ['who'];
  }

  // Only called for the who attributes due to observedAttributes
  attributeChangedCallback(name, oldValue, newValue) {
    this._who = newValue;
    this._updateRendering();
  }

  connectedCallback() {
    if (this.hasAttribute('who')) {
      this._who = this.getAttribute('who');
      this._updateRendering();
    }
  }

  get who() {
    return this._who;
  }

  set who(v) {
    this.setAttribute("who", v);
  }

  _updateRendering() {
    this.shadowRoot.querySelector('#who').textContent = `, ${this._who}`;
  }
}