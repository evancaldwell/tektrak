/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { checkout } from '../actions/shop.js';

// We are lazy loading its reducer.
import shop, { cartQuantitySelector } from '../reducers/shop.js';
store.addReducers({
  shop
});

// These are the elements needed by this element.
import './shop-products.js';
import './shop-cart.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { ButtonSharedStyles } from './button-shared-styles.js';
import { addToCartIcon } from './my-icons.js';

class MyView3 extends connect(store)(PageViewElement) {
  _render({_quantity, _error}) {
    return html`
      ${SharedStyles}
      ${ButtonSharedStyles}
      <style>
        button {
          border: 2px solid var(--app-dark-text-color);
          border-radius: 3px;
          padding: 8px 16px;
        }
        button:hover {
          border-color: var(--app-primary-color);
          color: var(--app-primary-color);
        }
        .cart, .cart svg {
          fill: var(--app-primary-color);
          width: 64px;
          height: 64px;
        }
        .circle.small {
          margin-top: -72px;
          width: 28px;
          height: 28px;
          font-size: 16px;
          font-weight: bold;
          line-height: 30px;
        }

        .color-test {
          width: 100%;
          height: 50px;
        }

        .color-test1 {
          background: var(--app-primary-color);
        }
        .color-test2 {
          background: var(--app-primary-light-color);
        }
        .color-test3 {
          background: var(--app-primary-dark-color);
        }
        .color-test4 {
          background: var(--app-secondary-color);
        }
        .color-test5 {
          background: var(--app-dark-text-color);
        }
        .color-test6 {
          background: var(--app-light-text-color);
        }
        .color-test7 {
          background: var(--app-drawer-selected-color);
        }
        .color-test8 {
          background: var(--app-primary-color-border);
        }
        .color-test9 {
          background: var(--app-highlight-color);
        }
        .color-test10 {
          background: var(--app-highlight-dark-color);
        }
      </style>

      <section>
        <h2>Redux example: shopping cart</h2>
        <div class="cart">${addToCartIcon}<div class="circle small">${_quantity}</div></div>
        <p>This is a slightly more advanced Redux example, that simulates a
          shopping cart: getting the products, adding/removing items to the
          cart, and a checkout action, that can sometimes randomly fail (to
          simulate where you would add failure handling). </p>
        <p>This view, as well as its 2 child elements, <code>&lt;shop-products&gt;</code> and
        <code>&lt;shop-cart&gt;</code> are connected to the Redux store.</p>
      </section>
      <section>
        <h3>Products</h3>
        <shop-products></shop-products>

        <br>
        <h3>Your Cart</h3>
        <shop-cart></shop-cart>

        <div>${_error}</div>
        <br>
        <p>
          <button hidden="${_quantity == 0}"
              on-click="${() => store.dispatch(checkout())}">
            Checkout
          </button>
        </p>
      </section>
      <p class="color-test color-test1">primary</p>
      <p class="color-test color-test2">primary light</p>
      <p class="color-test color-test3">primary dark</p>
      <p class="color-test color-test4">secondary</p>
      <p class="color-test color-test5">dark text</p>
      <p class="color-test color-test6">light text</p>
      <p class="color-test color-test7">drawer selected</p>
      <p class="color-test color-test8">primary border</p>
      <p class="color-test color-test9">highlight</p>
      <p class="color-test color-test10">hightlight dark</p>
    `;
  }

  static get properties() { return {
    // This is the data from the store.
    _quantity: Number,
    _error: String
  }}

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._quantity = cartQuantitySelector(state);
    this._error = state.shop.error;
  }
}

window.customElements.define('my-view3', MyView3);
