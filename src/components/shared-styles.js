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

export const SharedStyles = html`
<style>
  * {
    box-sizing: border-box;
    outline: none;
  }

  :host {
    display: block;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h5, p {
    margin: 0;
  }

  ul {
    margin: 10px 0;
  }

  hr {
    width: 100%;
  }

  section {
    padding: 24px;
    background: var(--app-section-odd-color);
  }

  section > * {
    max-width: 600px;
    margin-right: auto;
    margin-left: auto;
  }

  section:nth-of-type(even) {
    background: var(--app-section-even-color);
  }

  h2 {
    font-size: 24px;
    text-align: center;
    color: var(--app-dark-text-color);
  }

  h3 {
    font-size: 20px;
    text-align: center;
    color: var(--app-dark-text-color);
  }

  button {
    width: 100%;
    height: 100px;
    font-size: 40px;
    text-transform: uppercase;
    background-color: var(--app-primary-color);
    border: none;
    color: var(--app-light-text-color);    
  }

  button:disabled {
    background-color: var(--app-primary-disabled-color);
    cursor: not-allowed;
  }

  @media (min-width: 460px) {
    h2 {
      font-size: 36px;
    }
  }

  /* used when you need to freeze scrollng (needed for qu-overlay) */
  .no-scroll {
      overflow: hidden;
  }

  .circle {
    display: block;
    width: 64px;
    height: 64px;
    margin: 0 auto;
    text-align: center;
    border-radius: 50%;
    background: var(--app-primary-color);
    color: var(--app-light-text-color);
    font-size: 30px;
    line-height: 64px;
  }

  .flex-spacer {
    flex: 1;
  }
</style>
`;
