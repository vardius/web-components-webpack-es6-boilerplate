import { WebComponent } from "web-component";

@WebComponent("hello-world", {
  template: require("./hello-world.html"),
  shadowDOM: true
})
export default class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this._who = null; //this property is bind to element attribute becouse of observedAttributes
  }

  static get observedAttributes() {
    return ["who"];
  }

  // Only called for the who attributes due to observedAttributes
  attributeChangedCallback() {
    //this._who = newValue; this is handled by WebComponent decorator
    this._updateRendering();
  }

  connectedCallback() {
    // this is handled by WebComponent decorator
    // if (this.hasAttribute('who')) {
    //   this._who = this.getAttribute('who');
    // }
    this._updateRendering();
  }

  // Decorator creates setter/getter methods for observed attributes
  //we do not have to do this

  // get who() {
  //   return this._who;
  // }

  // set who(v) {
  //   this.setAttribute("who", v);
  // }

  _updateRendering() {
    if (this.shadowRoot) {
      this.shadowRoot.querySelector("#who").textContent = `, ${this._who}`;
    }
  }
}
