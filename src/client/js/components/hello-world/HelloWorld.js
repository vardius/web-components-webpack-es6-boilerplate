const template = require('./hello-world.html');

export class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this._who = null;

    let shadowRoot = this.attachShadow({
      mode: 'open'
    });

    const t = document.createElement('template');
    t.innerHTML = template;

    const instance = t.content.cloneNode(true);
    shadowRoot.appendChild(instance);
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

customElements.define('hello-world', HelloWorld);
