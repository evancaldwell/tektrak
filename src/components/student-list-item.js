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

import '@polymer/iron-image';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

// This element is *not* connected to the Redux store.
class StudentListItem extends LitElement {
  _render(props) {
    return html`
      ${SharedStyles}
      <style>
        :host {
          display: flex;
          align-items: center;
          padding: 15px 10px;
          border-bottom: 1px solid var(--app-primary-color-border, black);
        }
        :host([disabled]) {
          background-color: var(--app-disabled-color);
          cursor: not-allowed;
        }
        :host([active]) {
          background-color: var(--app-primary-dark-color);
        }
        :host([checked-in]) #profileImage, :host([skipped]) #profileImage {
          display: none;
        }
        :host([checked-in]) #profileCircle {
          background-color: #bada55;
        }
        :host([skipped]) #profileCircle {
          background-color: red;
        }
        #profileCircle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          background-color: lightgrey;
        }
        #profileImage {
          width: 50px;
          height: 50px;
        }
        h2 {
          margin-left: 20px;
        }

      </style>
        <div id="profileCircle">
          <iron-image id="profileImage" src="images/profile-placeholder.png" preload sizing="cover"></iron-image>
        </div>
        <h2 id="profileName">${props.profileName}</h2>
        
    `;
  }

  static get properties() {
    return {
      profileName: String,
      profileImage: String,
      active: Boolean,
      disabled: Boolean,
      checkedIn: Boolean,
      skipped: Boolean
    }
  }

  constructor() {
    super();
    this.active = false;
    this.profileName = 'Billy Jean';
    this.profileImage = '../../../images/profile-placeholder.png';
    this.addEventListener('click', () => {this.toggleActive()});
  }

  toggleActive() {
    console.log('activate');
    if(!this.disabled) {
      this.active = !this.active;
      if(this.active) {
        this.setAttribute('active', '');
      } else {
        this.removeAttribute('active');
      }
    }
  }
}

window.customElements.define('student-list-item', StudentListItem);
