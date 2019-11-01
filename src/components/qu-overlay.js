/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

// This element is *not* connected to the Redux store.
class QuOverlay extends LitElement {
  _render(props) {
    return html`
      ${SharedStyles}
      <style>
        :host{
          position: fixed;
          display: none;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100vh;
          overflow: hidden;
          background: var(--app-overlay-light-background);
          z-index: var(--z-overlay);
        }
        :host([theme="dark"]) {
          background: var(--app-overlay-dark-background);
        }
      </style>
      

    `;
  }

  static get properties() {
    return {
      opened: Boolean,
      theme: String
    }
  }

  constructor() {
    super();
    this.opened = false;
    this.theme = 'dark';
  }

  /**
   * Display the overlay and prevent the background from scolling
   */
  show() {
      document.getElementsByTagName('body')[0].classList.add('no-scroll');
      this.style.display = 'block';
      this.opened = true;
  }

  /**
   * Hide the overlay and allow the page to scroll normally
   */
  hide() {
      document.getElementsByTagName('body')[0].classList.remove('no-scroll');
      this.style.display = 'none';
      this.opened = false;
  }

  /**
   * toggle the display of the overlay
   */
  toggle() {
      if (this.opened) {
          this.hide();
          this.opened = false;
      } else {
          this.show();
          this.opened = true;
      }
  }
}

window.customElements.define('qu-overlay', QuOverlay);
