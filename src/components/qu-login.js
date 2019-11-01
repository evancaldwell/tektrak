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
import '@polymer/paper-input/paper-input.js';

// import { firestore } from '../config/firebase.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { FirebaseUiStyles } from './firebaseui-styles.js';

import './qu-hand-loader.js';

// This element is *not* connected to the Redux store.
class QuLogin extends LitElement {
  _render(props) {
    return html`
      ${SharedStyles}
      ${FirebaseUiStyles}
      <style>
        :host {
          --main-background-color: #e63800;

          position: fixed;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: var(--main-background-color); /* should use an app level variable */
          overflow: hidden;
          z-index: var(--z-modal);
          /* text-align: initial */
        }
        h1 {
          color: var(--app-light-text-color);
          font-size: 5em;
          margin-top: -100px;
          margin-bottom: 50px;
        }
        #authOptionsWrapper {
          position: relative;
          width: 100%;
          height: 150px;
        }
        qu-hand-loader {
          position: absolute;
          top: 60px;
          left: 50%;
          transform: translate(-50%);
        }
        #firebaseAuthContainer{
          position: absolute;
          left: 50%;
          transform: translate(-50%);
          background-color: var(--main-background-color); /* should use an app level variable */
        }
      </style>
      <h1>tektrak</h1>
      <div id="authOptionsWrapper">
        <qu-hand-loader active?="${props.loaderActive}"></qu-hand-loader>
        <div id="firebaseAuthContainer"></div>
      </div>
    `;
  }

  static get properties() {
    return {
      active: Boolean,
      disabled: Boolean,
      invalid: Boolean,
      loaderActive: Boolean,
    }
  }

  constructor() {
    super();
    this.active = false;
    this.invalid = false;
    this.loaderActive = true;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  _firstRendered() {
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // Disable auto-sign in.
    ui.disableAutoSignIn();
    let authUiContainer = this.shadowRoot.querySelector('#firebaseAuthContainer')
    ui.start(authUiContainer, {
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          // User successfully signed in.
          if (authResult) {
            this._handleSignedInUser(authResult);
          }
          // Do not redirect.
          return false;
        },
        uiShown: () => {
          this.shadowRoot.querySelector('#firebaseAuthContainer')
            .addEventListener('click', (e) => {
              console.log('clicked: ', e)
            });
          // The widget is rendered.
          // Hide the loader.
          // document.querySelector('qu-hand-loader').setAttribute('active', '');
        }
      },
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ]
    });
  }

  _handleSignedInUser(authResult) {
    this.user = authResult.user;
    const urlParams = new URLSearchParams(window.location.search);
    console.log('role from prams: ', urlParams.get('role'));
    let role = window.atob(urlParams.get('role'));
    let userRef = firebase.firestore().collection('users').doc(this.user.uid);
    userRef.update({requestedRole: role}).then(() => {console.log('set the requested role as ' + role)});

    console.log('_handleSignedInUser: ', this.user, role);
    this.userProfile = authResult.additionalUserInfo.profile;
    this.setAttribute('user', this.user);
    this.setAttribute('userProfile', this.userProfile);
    let isNewUser = authResult.additionalUserInfo.isNewUser;



    if (isNewUser) {
      // write new user to firestores user collection
      let usersRef = firebase.firestore().collection('users');
      console.log('new user usersRef: ', usersRef);
      usersRef.doc(this.user.uid).set(this.userProfile);
    }

    // TODO: needs to be tested
    if (this.user.roles.includes('parent')) this.findChildren(this.user.uid);
  }
}

window.customElements.define('qu-login', QuLogin);
