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
class QuHandLoader extends LitElement {
  _render(props) {
    return html`
      ${SharedStyles}
      <style>
        :host{
          --main-color: #e63800; /* should use an app level variable */
          display: none;
        }
        :host([active]) {
          display: initial;
        }
        /* INSPIRATION: http://drbl.in/1945392 */
        .loading {
          position: absolute;
          left: 50%;
          top: 50%;
          margin: -35px 0 0 -56px;
          width: 112px;
          height: 70px;
        }
        .loading:before,
        .loading:after {
          display: table;
          content: "";
        }
        .loading:after {
          clear: both;
        }
        .loading .finger {
          float: left;
          margin: 0 2px 0 0;
          width: 20px;
          height: 100%;
        }
        .loading .finger-1 {
          -webkit-animation: finger-1-animation 2s infinite ease-out;
          animation: finger-1-animation 2s infinite ease-out;
        }
        .loading .finger-1 span {
          -webkit-animation: finger-1-animation-span 2s infinite ease-out;
          animation: finger-1-animation-span 2s infinite ease-out;
        }
        .loading .finger-1 i {
          -webkit-animation: finger-1-animation-i 2s infinite ease-out;
          animation: finger-1-animation-i 2s infinite ease-out;
        }
        .loading .finger-2 {
          -webkit-animation: finger-2-animation 2s infinite ease-out;
          animation: finger-2-animation 2s infinite ease-out;
        }
        .loading .finger-2 span {
          -webkit-animation: finger-2-animation-span 2s infinite ease-out;
          animation: finger-2-animation-span 2s infinite ease-out;
        }
        .loading .finger-2 i {
          -webkit-animation: finger-2-animation-i 2s infinite ease-out;
          animation: finger-2-animation-i 2s infinite ease-out;
        }
        .loading .finger-3 {
          -webkit-animation: finger-3-animation 2s infinite ease-out;
          animation: finger-3-animation 2s infinite ease-out;
        }
        .loading .finger-3 span {
          -webkit-animation: finger-3-animation-span 2s infinite ease-out;
          animation: finger-3-animation-span 2s infinite ease-out;
        }
        .loading .finger-3 i {
          -webkit-animation: finger-3-animation-i 2s infinite ease-out;
          animation: finger-3-animation-i 2s infinite ease-out;
        }
        .loading .finger-4 {
          -webkit-animation: finger-4-animation 2s infinite ease-out;
          animation: finger-4-animation 2s infinite ease-out;
        }
        .loading .finger-4 span {
          -webkit-animation: finger-4-animation-span 2s infinite ease-out;
          animation: finger-4-animation-span 2s infinite ease-out;
        }
        .loading .finger-4 i {
          -webkit-animation: finger-4-animation-i 2s infinite ease-out;
          animation: finger-4-animation-i 2s infinite ease-out;
        }
        .loading .finger-item {
          position: relative;
          width: 100%;
          height: 100%;
          -webkit-border-radius: 6px 6px 8px 8px;
          -webkit-background-clip: padding-box;
          -moz-border-radius: 6px 6px 8px 8px;
          -moz-background-clip: padding;
          border-radius: 6px 6px 8px 8px;
          background-clip: padding-box;
          background: #fff;
        }
        .loading .finger-item span {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: auto;
          padding: 5px 5px 0 5px;
        }
        .loading .finger-item span:before,
        .loading .finger-item span:after {
          content: '';
          position: relative;
          display: block;
          margin: 0 0 2px 0;
          width: 100%;
          height: 2px;
          background: var(--main-color);
        }
        .loading .finger-item i {
          position: absolute;
          left: 3px;
          bottom: 3px;
          width: 14px;
          height: 14px;
          -webkit-border-radius: 10px 10px 7px 7px;
          -webkit-background-clip: padding-box;
          -moz-border-radius: 10px 10px 7px 7px;
          -moz-background-clip: padding;
          border-radius: 10px 10px 7px 7px;
          background-clip: padding-box;
          background: var(--main-color);
        }
        .loading .last-finger {
          position: relative;
          float: left;
          width: 24px;
          height: 100%;
          overflow: hidden;
        }
        .loading .last-finger-item {
          position: absolute;
          right: 0;
          top: 32px;
          width: 110%;
          height: 20px;
          -webkit-border-radius: 0 5px 14px 0;
          -webkit-background-clip: padding-box;
          -moz-border-radius: 0 5px 14px 0;
          -moz-background-clip: padding;
          border-radius: 0 5px 14px 0;
          background-clip: padding-box;
          background: #fff;
          -webkit-animation: finger-5-animation 2s infinite linear;
          animation: finger-5-animation 2s infinite linear;
        }
        .loading .last-finger-item i {
          position: absolute;
          left: 0;
          top: -8px;
          width: 22px;
          height: 8px;
          background: #fff;
          overflow: hidden;
        }
        .loading .last-finger-item i:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 34px;
          height: 20px;
          -webkit-border-radius: 0 0 15px 15px;
          -webkit-background-clip: padding-box;
          -moz-border-radius: 0 0 15px 15px;
          -moz-background-clip: padding;
          border-radius: 0 0 15px 15px;
          background-clip: padding-box;
          background: var(--main-color);
        }
        @keyframes finger-1-animation {
          0% {
            padding: 12px 0 5px 0;
          }
          20% {
            padding: 12px 0 5px 0;
          }
          29% {
            padding: 4px 0 24px 0;
          }
          35% {
            padding: 4px 0 24px 0;
          }
          41% {
            padding: 12px 0 5px 0;
          }
          100% {
            padding: 12px 0 5px 0;
          }
        }
        @keyframes finger-1-animation-span {
          0% {
            top: 0;
          }
          20% {
            top: 0;
          }
          29% {
            top: -7px;
          }
          35% {
            top: -7px;
          }
          41% {
            top: 0;
          }
          100% {
            top: 0;
          }
        }
        @keyframes finger-1-animation-i {
          0% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
          }
          20% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
          }
          29% {
            bottom: 8px;
            height: 12px;
            -webkit-border-radius: 7px 7px 4px 4px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 7px 7px 4px 4px;
            -moz-background-clip: padding;
            border-radius: 7px 7px 4px 4px;
            background-clip: padding-box;
          }
          35% {
            bottom: 8px;
            height: 12px;
            -webkit-border-radius: 7px 7px 4px 4px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 7px 7px 4px 4px;
            -moz-background-clip: padding;
            border-radius: 7px 7px 4px 4px;
            background-clip: padding-box;
          }
          41% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
          }
          100% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
          }
        }
        @keyframes finger-2-animation {
          0% {
            padding: 6px 0 2px 0;
          }
          24% {
            padding: 6px 0 2px 0;
          }
          33% {
            padding: 2px 0 16px 0;
          }
          39% {
            padding: 2px 0 16px 0;
          }
          45% {
            padding: 6px 0 2px 0;
          }
          100% {
            padding: 6px 0 2px 0;
          }
        }
        @keyframes finger-2-animation-span {
          0% {
            top: 0;
          }
          24% {
            top: 0;
          }
          33% {
            top: -7px;
          }
          39% {
            top: -7px;
          }
          45% {
            top: 0;
          }
          100% {
            top: 0;
          }
        }
        @keyframes finger-2-animation-i {
          0% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
          }
          24% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
          }
          33% {
            bottom: 8px;
            height: 12px;
            -webkit-border-radius: 7px 7px 4px 4px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 7px 7px 4px 4px;
            -moz-background-clip: padding;
            border-radius: 7px 7px 4px 4px;
            background-clip: padding-box;
          }
          39% {
            bottom: 8px;
            height: 12px;
            -webkit-border-radius: 7px 7px 4px 4px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 7px 7px 4px 4px;
            -moz-background-clip: padding;
            border-radius: 7px 7px 4px 4px;
            background-clip: padding-box;
          }
          45% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
          }
          100% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
          }
        }
        @keyframes finger-3-animation {
          0% {
            padding: 0 0 0 0;
          }
          28% {
            padding: 0 0 0 0;
          }
          37% {
            padding: 0 0 12px 0;
          }
          43% {
            padding: 0 0 12px 0;
          }
          49% {
            padding: 0 0 0 0;
          }
          100% {
            padding: 0 0 0 0;
          }
        }
        @keyframes finger-3-animation-span {
          0% {
            top: 0;
          }
          28% {
            top: 0;
          }
          37% {
            top: -7px;
          }
          43% {
            top: -7px;
          }
          49% {
            top: 0;
          }
          100% {
            top: 0;
          }
        }
        @keyframes finger-3-animation-i {
          0% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
          }
          28% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
          }
          37% {
            bottom: 8px;
            height: 12px;
            -webkit-border-radius: 7px 7px 4px 4px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 7px 7px 4px 4px;
            -moz-background-clip: padding;
            border-radius: 7px 7px 4px 4px;
            background-clip: padding-box;
          }
          43% {
            bottom: 8px;
            height: 12px;
            -webkit-border-radius: 7px 7px 4px 4px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 7px 7px 4px 4px;
            -moz-background-clip: padding;
            border-radius: 7px 7px 4px 4px;
            background-clip: padding-box;
          }
          49% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
          }
          100% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
          }
        }
        @keyframes finger-4-animation {
          0% {
            padding: 8px 0 3px 0;
          }
          32% {
            padding: 8px 0 3px 0;
          }
          41% {
            padding: 4px 0 20px 0;
          }
          47% {
            padding: 4px 0 20px 0;
          }
          53% {
            padding: 8px 0 3px 0;
          }
          100% {
            padding: 8px 0 3px 0;
          }
        }
        @keyframes finger-4-animation-span {
          0% {
            top: 0;
          }
          32% {
            top: 0;
          }
          41% {
            top: -7px;
          }
          47% {
            top: -7px;
          }
          53% {
            top: 0;
          }
          100% {
            top: 0;
          }
        }
        @keyframes finger-4-animation-i {
          0% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
          }
          32% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
          }
          41% {
            bottom: 8px;
            height: 12px;
            -webkit-border-radius: 7px 7px 4px 4px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 7px 7px 4px 4px;
            -moz-background-clip: padding;
            border-radius: 7px 7px 4px 4px;
            background-clip: padding-box;
          }
          47% {
            bottom: 8px;
            height: 12px;
            -webkit-border-radius: 7px 7px 4px 4px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 7px 7px 4px 4px;
            -moz-background-clip: padding;
            border-radius: 7px 7px 4px 4px;
            background-clip: padding-box;
          }
          53% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
          }
          100% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
          }
        }
        @keyframes finger-5-animation {
          0% {
            top: 32px;
            right: 0;
            -webkit-border-radius: 0 5px 14px 0;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 0 5px 14px 0;
            -moz-background-clip: padding;
            border-radius: 0 5px 14px 0;
            background-clip: padding-box;
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          34% {
            top: 32px;
            right: 0;
            -webkit-border-radius: 0 5px 14px 0;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 0 5px 14px 0;
            -moz-background-clip: padding;
            border-radius: 0 5px 14px 0;
            background-clip: padding-box;
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          43% {
            top: 20px;
            right: 2px;
            -webkit-border-radius: 0 8px 20px 0;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 0 8px 20px 0;
            -moz-background-clip: padding;
            border-radius: 0 8px 20px 0;
            background-clip: padding-box;
            -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
          }
          50% {
            top: 20px;
            right: 2px;
            -webkit-border-radius: 0 8px 20px 0;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 0 8px 20px 0;
            -moz-background-clip: padding;
            border-radius: 0 8px 20px 0;
            background-clip: padding-box;
            -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
          }
          60% {
            top: 32px;
            right: 0;
            -webkit-border-radius: 0 5px 14px 0;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 0 5px 14px 0;
            -moz-background-clip: padding;
            border-radius: 0 5px 14px 0;
            background-clip: padding-box;
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            top: 32px;
            right: 0;
            -webkit-border-radius: 0 5px 14px 0;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 0 5px 14px 0;
            -moz-background-clip: padding;
            border-radius: 0 5px 14px 0;
            background-clip: padding-box;
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
        }
        .credits-info {
          position: absolute;
          left: 0;
          top: 0;
          padding: 20px 0 0 20px;
          opacity: 50;
        }
        .credits-info h1 {
          margin: 0 0 25px 0;
          font-size: 22px;
          font-weight: 300;
          color: #fff;
        }
        .credits-info p {
          margin: 0 0 15px 0;
          max-width: 320px;
          font-size: 14px;
          font-weight: 300;
          line-height: 1.4em;
          color: #fff;
        }
        .credits-info span {
          margin: 0 5px;
          opacity: 30;
        }
        .credits-info a {
          color: #fff;
          border-bottom: 1px solid #fff;
          text-decoration: none;
        }
        .credits-info a:hover {
          border-bottom: 3px solid #fff;
        }
        * {
          -khtml-box-sizing: border-box;
          -ms-box-sizing: border-box;
          box-sizing: border-box;
        }
        body {
          font-family: 'Open Sans', sans-serif;
          background: var(--main-color);
        }
      </style>
      <div class="loading">
        <div class="finger finger-1">
          <div class="finger-item">
            <span></span><i></i>
          </div>
        </div>
        <div class="finger finger-2">
          <div class="finger-item">
            <span></span><i></i>
          </div>
        </div>
        <div class="finger finger-3">
          <div class="finger-item">
            <span></span><i></i>
          </div>
        </div>
        <div class="finger finger-4">
          <div class="finger-item">
            <span></span><i></i>
          </div>
        </div>
        <div class="last-finger">
          <div class="last-finger-item"><i></i></div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      active: Boolean,
    }
  }

  constructor() {
    super();
    this.active = false;
  }

  /**
   * Display the overlay and prevent the background from scolling
   */
  show() {
      document.getElementsByTagName('body')[0].classList.add('no-scroll');
      // this.style.display = 'block';
      this.active = true;
  }

  /**
   * Hide the overlay and allow the page to scroll normally
   */
  hide() {
      // this.style.display = 'none';
      this.active = false;
  }

  /**
   * toggle the display of the overlay
   */
  toggle() {
      if (this.active) {
          this.hide();
          this.active = false;
      } else {
          this.show();
          this.active = true;
      }
  }
}

window.customElements.define('qu-hand-loader', QuHandLoader);