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
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// import firebase from '../config/firebase.js';
// import { fbApp } from '../config/firebase.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import {
  navigate,
  updateOffline,
  updateDrawerState,
  updateLayout
} from '../actions/app.js';

// These are the elements needed by this element.
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import { menuIcon } from './my-icons.js';
import './snack-bar.js';
import './qu-login.js';
import './qu-profile.js';

class MyApp extends connect(store)(LitElement) {
  _render({appTitle, user, loggedIn, _page, _drawerOpened, _snackbarOpened, _offline}) {
    console.log('in my-app render');
    // Anything that's related to rendering should be done in here.
    return html`
    <style>
      :host {
        --app-drawer-width: 256px;
        display: block;
      

        --app-primary-color: #2F6690;
        --app-primary-dark-color: #1B3B54;
        --app-primary-light-color: #1BE7FF;
        --app-secondary-color: #160F29;
        --app-highlight-color: #E63800;
        --app-highlight-dark-color: #30011E;
        --app-dark-text-color: var(--app-secondary-color);
        --app-light-text-color: white;
        --app-primary-background-color: white;
        --app-section-even-color: #f7f7f7;
        --app-section-odd-color: white;
        --app-primary-disabled-color: #9bccdb;
        --app-disabled-color: #e2e2e2;
        --app-error-color: #D82603;
        --app-success-color: #bada55;
        --app-warning-color: orange;

        --app-header-background-color: white;
        --app-header-text-color: var(--app-dark-text-color);
        --app-header-selected-color: var(--app-primary-color);

        --app-drawer-background-color: var(--app-secondary-color);
        --app-drawer-text-color: var(--app-light-text-color);
        --app-drawer-selected-color: #78909C;

        --app-primary-color-border: #2d2d2d;
        --app-shadow: 0 -4px 4px 0px rgba(70,70,70,0.4);

        --app-toolbar-height: 65px;
        --app-content-height: calc(100vh - var(--app-toolbar-height));
        --app-overlay-dark-background: rgba(0,0,0,0.8);
        --app-overlay-light-background: rgba(255,255,255,0.8);
        --z-max:          999;
        --z-modal:        900;
        --z-drawer:       800;
        --z-overlay:      700;
        --z-dropdown:     600;
        --z-header:       500;
        --z-footer:       400;
        --z-tertiary:     300;
        --z-secondary:    200;
        --z-primary:      100;
        --z-base:         0;
        --z-hide:         -100;
        --z-min:          -999;
      }

      *[hidden] {
        display: none;
      }

      app-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color);
        border-bottom: 1px solid #eee;
        z-index: var(--z-header);
      }

      .toolbar-top {
        background-color: var(--app-header-background-color);
      }

      [main-title] {
        font-family: 'Oswald';
        text-transform: lowercase;
        font-size: 30px;
        /* In the narrow layout, the toolbar is offset by the width of the
        drawer button, and the text looks not centered. Add a padding to
        match that button */
        padding-right: 44px;
      }

      .toolbar-list {
        display: none;
      }

      .toolbar-list > a {
        display: inline-block;
        color: var(--app-header-text-color);
        text-decoration: none;
        line-height: 30px;
        padding: 4px 24px;
      }

      .toolbar-list > a[selected] {
        color: var(--app-header-selected-color);
        border-bottom: 4px solid var(--app-header-selected-color);
      }

      .menu-btn {
        background: none;
        border: none;
        fill: var(--app-header-text-color);
        cursor: pointer;
        height: 44px;
        width: 44px;
      }

      app-drawer {
        z-index: var(--z-drawer);
      }

      .drawer-list {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 24px;
        background: var(--app-drawer-background-color);
        position: relative;
      }

      .drawer-list > a {
        display: block;
        text-decoration: none;
        color: var(--app-drawer-text-color);
        line-height: 40px;
        padding: 0 24px;
      }

      .drawer-list > a[selected] {
        color: var(--app-drawer-selected-color);
      }

      /* Workaround for IE11 displaying <main> as inline */
      main {
        display: block;
      }

      .main-content {
        padding-top: 64px;
        min-height: var(--app-content-height);
      }

      .page {
        display: none;
      }

      .page[active] {
        display: block;
      }

      footer {
        padding: 24px;
        background: var(--app-drawer-background-color);
        color: var(--app-drawer-text-color);
        text-align: center;
      }

      qu-feedback {
        margin-right: 10px;
      }

      /* Wide layout: when the viewport width is bigger than 460px, layout
      changes to a wide layout. */
      @media (min-width: 460px) {
        .toolbar-list {
          display: block;
        }

        .menu-btn {
          display: none;
        }

        .main-content {
          padding-top: 107px;
        }

        /* The drawer button isn't shown in the wide layout, so we don't
        need to offset the title */
        [main-title] {
          padding-right: 0px;
        }
      }
    </style>


    <qu-login hidden="${loggedIn}"></qu-login>

    <!-- Header -->
    <app-header fixed condenses reveals effects="waterfall">
      <app-toolbar class="toolbar-top">
        <button class="menu-btn" title="Menu" on-click="${_ => store.dispatch(updateDrawerState(true))}">${menuIcon}</button>
        <div main-title>${appTitle}</div>
        <qu-feedback></qu-feedback>
        <qu-profile hidden="${!loggedIn}"></qu-profile>
      </app-toolbar>

      <!-- This gets hidden on a small screen-->
      <nav class="toolbar-list">
        <a selected?="${_page === 'admin'}" href="/admin">Admin</a>
        <a selected?="${_page === 'teacher'}" href="/teacher">Teacher</a>
        <a selected?="${_page === 'driver'}" href="/driver">Driver</a>
        <a selected?="${_page === 'request-role'}" href="/request-role">Request Role</a>
        <a selected?="${_page === 'request-admin'}" href="/request-admin">Request Admin</a>
        <a selected?="${_page === 'request-teacher'}" href="/request-teacher">Request Teacher</a>
        <a selected?="${_page === 'request-carpoolStaff'}" href="/request-carpoolStaff">Request Carpool Staff</a>
        <a selected?="${_page === 'view2'}" href="/view2">View Two</a>
        <a selected?="${_page === 'view3'}" href="/view3">View Three</a>
      </nav>
    </app-header>

    <!-- Drawer content -->
    <app-drawer opened="${_drawerOpened}"
        on-opened-changed="${e => store.dispatch(updateDrawerState(e.target.opened))}">
      <nav class="drawer-list">
        <a selected?="${_page === 'admin'}" href="/admin">Admin</a>
        <a selected?="${_page === 'teacher'}" href="/teacher">Teacher</a>
        <a selected?="${_page === 'driver'}" href="/driver">Driver</a>
        <a selected?="${_page === 'request-role'}" href="/request-role">Request Role</a>
        <a selected?="${_page === 'request-admin'}" href="/request-admin">Request Admin</a>
        <a selected?="${_page === 'request-teacher'}" href="/request-teacher">Request Teacher</a>
        <a selected?="${_page === 'request-carpoolStaff'}" href="/request-carpoolStaff">Request Carpool Staff</a>
        <a selected?="${_page === 'view2'}" href="/view2">View Two</a>
        <a selected?="${_page === 'view3'}" href="/view3">View Three</a>
      </nav>
    </app-drawer>

    <!-- Main content -->
    <main role="main" class="main-content">
      <admin-view class="page" active?="${_page === 'admin'}"></admin-view>
      <teacher-view class="page" active?="${_page === 'teacher'}"></teacher-view>
      <driver-view class="page" active?="${_page === 'driver'}"></driver-view>
      <request-role-view class="page" active?="${_page === 'request-role' 
                                              || _page === 'request-admin'
                                              || _page === 'request-teacher'
                                              || _page === 'request-carpoolStaff'}"></request-role-view>
      <my-view2 class="page" active?="${_page === 'view2'}"></my-view2>
      <my-view3 class="page" active?="${_page === 'view3'}"></my-view3>
      <my-view404 class="page" active?="${_page === 'view404'}"></my-view404>
    </main>

    <!-- <footer>
      <p>Made with &hearts; by the Evan Caldwell.</p>
      <p>Transport Icons made by <a href="https://www.flaticon.com/authors/monkik">monkik</a> from <a href="www.flaticon.com">www.flaticon.com</a></p>
    </footer> -->

    <snack-bar active?="${_snackbarOpened}">
        You are now ${_offline ? 'offline' : 'online'}.</snack-bar>
    `;
  }

  static get properties() {
    return {
      appTitle: String,
      user: Object,
      loggedIn: Boolean,
      _page: String,
      _drawerOpened: Boolean,
      _snackbarOpened: Boolean,
      _offline: Boolean
    }
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
    this.loggedIn = false;
    this.user = {
      roles: []
    };

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.user = user;

        let firestore = firebase.firestore();
        firestore.settings({timestampsInSnapshots: true});
        let userRef = firestore.collection('users').doc(user.uid);
        userRef.onSnapshot(doc => {
          let userData = doc.data();
          this.user.roles = userData.roles;
        })

        this.loggedIn = true;
        // check role and request correct view
      } else {
        // User is signed out.
        this.loggedIn = false;
      }
      console.log('my-app user: ', user);
    });

    /** Converts numeric degrees to radians */
    // TODO: maybe move this somewhere more general
    if (typeof(Number.prototype.toRad) === "undefined") {
      Number.prototype.toRad = function() {
        return this * Math.PI / 180;
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  _firstRendered() {
    installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    installMediaQueryWatcher(`(min-width: 460px)`,
        (matches) => store.dispatch(updateLayout(matches)));
  }

  _didRender(properties, changeList) {
    if ('_page' in changeList) {
      const pageTitle = properties.appTitle + ' - ' + changeList._page;
      updateMetadata({
          title: pageTitle,
          description: pageTitle
          // This object also takes an image property, that points to an img src.
      });
    }
  }

  _stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
    this._snackbarOpened = state.app.snackbarOpened;
    this._drawerOpened = state.app.drawerOpened;
  }
}

window.customElements.define('my-app', MyApp);
