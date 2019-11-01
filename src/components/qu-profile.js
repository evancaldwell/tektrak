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
import { repeat } from 'lit-html/lib/repeat';
import '@polymer/paper-input/paper-input.js';
// import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import {Fab} from '@material/mwc-fab';
import {Icon} from '@material/mwc-icon';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

import './qu-overlay.js';

// This element is *not* connected to the Redux store.
class QuProfile extends LitElement {
  _render(props) {
    return html`
      ${SharedStyles}
      <style>
        :host {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: initial
        }
        :host([active]) #avatar {
          border: 3px solid var(--app-secondary-color);
        }
        :host([active]) #profileImage {
          margin: -3px;
        }
        :host([active]) #profileView {
          display: block;
        }

        ul {
          list-style: none;
          padding-left: 30px;
        }

        button {
          width: calc(100% + 100px);
          margin: 0 -50px -2px;
        }

        .show {
          display: initial;
        }
        .hide {
          display: none;
        }

        .profile-view[active] {
          display: initial;
        }
        .profile-view[inactive] {
          display: none;
        }

        #avatar {
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
        #profileTitle {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 25px;
        }
        #profileTitle p {
          text-decoration: underline;
          margin-bottom: 5px;
        }

        .profile-view {
          position: absolute;
          top: var(--app-toolbar-height);
          left: 0;
          right: 0;
          /* bottom: 0; */
          /* width: 100%; */
          height: calc(100vh - var(--app-toolbar-height));
          /* height: 100vh; */
          flex-direction: column;
          padding: 25px 50px 0;
          background-color: var(--app-primary-background-color);
          overflow: scroll;
        }
        .scrollable {
          overflow: scroll;
        }
        #profileView h2 {
          text-align: initial;
        }

        .color-circle {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          border: 1px solid black;
          background-color: lightgrey;
          float: left;
          margin-right: 10px;
        }
        .authorized-driver-type {
          font-size: 80%;
        }

        #addFab, #fabStack {
          z-index: var(--z-drawer);
        }

        #addFab {
          position: fixed;
          bottom: calc(80px - 100vh);
          right: 20px;
          --mdc-theme-on-primary: white;
          --mdc-theme-primary: var(--app-primary-dark-color);
          --mdc-theme-on-secondary: white;
          --mdc-theme-secondary: var(--app-primary-dark-color);
        }

        #fabStack {
          position: fixed;
          bottom: calc(80px - 100vh);
          right: 18px;
          display: none;
          flex-direction: column;

          /* background: white; */
        }
        .fab-stack-item {
          display: grid;
          grid-template-columns: 1fr 60px;
          grid-gap: 15px;
          align-items: center;
          transition: transform 0.2s;
          margin-top: 10px;
        }
        .transform-driver {
          transform: translateY(90px);
        }
        .transform-vehicle {
          transform: translateY(48px);
        }
        #fabStack p {
          grid-column-start: 1;
          justify-self: end;
          transition: opacity 0.6s;
        }
        #fabStack mwc-fab {
          grid-column-start: 2;
          justify-self: center;
        }

        #backIcon {
          margin-left: -15px;
          margin-top: -5px;
        }
      </style>

      <div id="avatar" on-click="${e => this.toggleProfile(e)}">
        <iron-image id="profileImage" src="${props.avatarImg}" preload sizing="cover"></iron-image>
      </div>

      <article id="profileView" class="profile-view" inactive>
        <div class="scrollable">
          <div id="profileTitle">
            <h1>${props.user ? props.user.displayName : ''}</h1>
            <p on-click="${e => this.logout(e)}">logout</p>
          </div>
          <h2>Children</h2>
          <ul>
            ${this.userChildren ? repeat(this.userChildren, child => child.key, child => html`
              <li id="${child.uid}">${child.firstName}</li>
            `) : null}
          </ul>
          <h2>Vehicles</h2>
          <ul>
            ${this.userVehicles ? repeat(this.userVehicles, vehicle => vehicle.key, vehicle => html`
              <li id="${vehicle.uid}">
                <h4>${vehicle.make} ${vehicle.model}</h4>
                <div class="color-circle" style="background-color:${vehicle.color}"></div>
                <p>${vehicle.type}: ${vehicle.license}</p>
              </li>
            `) : null}
          </ul>
          <!-- <h2>Authorized Drivers</h2>
          <ul>
            <li>Debbie Fullmer - <span class="authorized-driver-type">Grandmother</span></li>
            <li>Clarissa Haston - <span class="authorized-driver-type">Aunt</span></li>
          </ul> -->
          <mwc-fab id="addFab" icon="add" on-click="${(e) => this._handleAddFabClick(e)}"></mwc-fab>

          <qu-overlay></qu-overlay>

          <div id="fabStack">
            <div id="fabStackDriver" class="fab-stack-item transform-driver" on-click="${(e) => this._handleFabStackClick(e)}">  
              <p class="fab-stack-label">Driver</p>  
              <mwc-fab icon="people" mini></mwc-fab>
            </div>
            <div id="fabStackVehicle" class="fab-stack-item transform-vehicle" on-click="${(e) => this._handleFabStackClick(e)}">
              <p class="fab-stack-label">Vehicle</p>
              <mwc-fab icon="directions_car" mini></mwc-fab>
            </div>
            <div id="fabStackChild" class="fab-stack-item" on-click="${(e) => this._handleFabStackClick(e)}">
              <p class="fab-stack-label">Child</p>
              <mwc-fab icon="face"></mwc-fab>
            </div>
          </div>

          <!-- <article id="addChildView" class="profile-view" inactive>
            <p>add child stuff here</p>
          </article> -->

          <!-- <article id="addDriverView" class="profile-view" inactive>
            <p>add driver stuff here</p>
          </article> -->
        </div>
      </article>

      <article id="addVehicleView" class="profile-view" inactive>
        <mwc-icon id="backIcon" on-click="${(e) => this.closeVehiclePicker(e)}">arrow_back</mwc-icon>
        <form id="addVehicleForm">
          <paper-input label="Make ..(Chevy)" name="make" required auto-validate error-message="We also need this one."></paper-input>
          <paper-input label="Model ..(Suburban)" name="model" required auto-validate error-message="Sorry, it helps us to know what kind of car it is."></paper-input>
          <paper-input label="License Plate Number" name="license" required auto-validate error-message="We need to make sure it's the right car"></paper-input>
          <button id="saveVehicle" on-click="${(e) => this.saveVehicle(e)}">Save Vehicle</button>
        </form>
      </article>
    `;
  }

  static get properties() {
    return {
      active: Boolean,
      avatarImg: String,
      userChildren: Array,
      disabled: Boolean,
      fabStackActive: Boolean,
      invalid: Boolean,
      profileImage: String,
      profileName: String,
      user: Object,
      userData: Object
    }
  }

  constructor() {
    super();
    this.active = false;
    this.avatarImg = 'images/profile-placeholder.png';
    this.fabStackActive = false;
    this.invalid = false;
    this.profileName = 'Billy Jean';
    this.profileImage = '../../../images/profile-placeholder.png';

    let firestore = firebase.firestore();
    firestore.settings({timestampsInSnapshots: true});
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.querySelector('qu-overlay').addEventListener('click', (e) => {this.toggleFabStack(e)})
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.user = user;
        this.avatarImg = user.photoURL;
        // maybe don't need this
        firestore.collection('users').doc(user.uid).onSnapshot(doc => {
          this.userData = doc.data();
        });

        this.findChildren();

        firestore.collection('users').doc(user.uid).collection('children').onSnapshot(collection => {
          let userChildren = [];
          collection.forEach(doc => {
            let child = doc.data();
            child.uid = doc.id;
            userChildren.push(child)
          });
          this.userChildren = userChildren;
        });
        firestore.collection('users').doc(user.uid).collection('vehicles').onSnapshot(collection => {
          let userVehicles = [];
          collection.forEach(doc => {
            let vehicle = doc.data();
            vehicle.uid = doc.id;
            userVehicles.push(vehicle)
          });
          this.userVehicles = userVehicles;
        });
      } else {
        // No user is signed in.
        console.log('from profile no user logged in');
      }
    });
    // this.user = firebase.auth().currentUser;
  }

  logout(e) {
    firebase.auth().signOut().then(e => {
      // Sign-out successful.
      console.log('successfully logged out: ', e);
      window.location.reload();
    }).catch(function(error) {
      // An error happened.
      console.log('logout error: ', e);
    });
  }

  findChildren() {
    let batch = firestore.batch();
    let nameParts = this.user.displayName.split(' ');
    let userChildrenRef = firestore.collection('users').doc(this.user.uid).collection('children');
    let studentsRef = firestore.collection('schools').doc('treeside').collection('students')
                                        .where('parentFirstName', '==', nameParts[0])
                                        .where('parentLastName', '==', nameParts[1]);
    let userChildren = [];
    studentsRef.get().then(collection => {
      collection.forEach(student => {
        userChildren.push(student.data());
        firestore.runTransaction(transaction => {
          let childRef = userChildrenRef.doc(student.id)
          return transaction.get(childRef).then(doc => {
              if (!doc.exists) {
                console.log('had to set new data');
                transaction.set(childRef, student.data());
              } else {
                console.log('updated current child data');
                transaction.update(childRef, student.data());
              }
          });
        }).then(() => {
            console.log('transaction finished');
        }).catch(function(err) {
            console.error(err);
        });
      });
      // console.log('Users children: ', userChildren);
    })
  }

  toggleView(view) {
    view.active = !view.active;
    view.hasAttribute('active') ? view.removeAttribute('active') : view.setAttribute('active', '');
    console.log('view id: ', view.id);
    if(view.active) {
      view.removeAttribute('inactive');
      view.setAttribute('active', '');
      if (view.id === 'addVehicleView') {
        this.shadowRoot.querySelector('#addFab').classList.add('hide');
        this.shadowRoot.querySelector('#fabStack').classList.add('hide');
      }
    } else {
      view.removeAttribute('active');
      view.setAttribute('inactive', '');
      if (view.id === 'addVehicleView') {
        this.shadowRoot.querySelector('#addFab').classList.remove('hide');
        this.shadowRoot.querySelector('#fabStack').classList.remove('hide');
      }
    }
  }

  toggleProfile(e) {
    let views = this.shadowRoot.querySelectorAll('article');
    for (let i = 0; i < views.length; i++) {
      const view = views[i];
      console.log('close view: ', view);
      
    }
    if(!this.disabled) {
      this.toggleView(this);
      if (!this.active && views[1].active) {
        // this.closeVehiclePicker();
      }
    }
  }

  toggleFabStack(e) {
    this.fabStackActive = !this.fabStackActive;
    let regex = /(transform-[a-zA-Z]*)/;
    let stack = this.shadowRoot.querySelector('#fabStack');
    let driverFab = this.shadowRoot.querySelector('#fabStackDriver');
    let vehiclceFab = this.shadowRoot.querySelector('#fabStackVehicle');
    let overlay = this.shadowRoot.querySelector('qu-overlay');
    if (this.fabStackActive) {
      stack.style.display = 'flex';
      overlay.show();
      setTimeout(() => {
        driverFab.classList.remove('transform-driver');
        vehiclceFab.classList.remove('transform-vehicle');
      }, 20);
    } else {
      stack.style.display = 'none';
      driverFab.classList.add('transform-driver');
      vehiclceFab.classList.add('transform-vehicle');
      overlay.hide();
    }
  }

  saveVehicle(e) {
    // e.preventDefault();
    // let form = this.shadowRoot.querySelector('#addVehicleForm');
    // let vehicleInfo = {};
    // for (let i = 0; i < form.children.length; i++) {
    //   const child = form.children[i];
    //   console.log('form child: ', child.name, child.value);
    //   if (e.target != child) {
    //     child.validate();
    //     if (!child.invalid) {
    //       vehicleInfo[child.name] = child.value;
    //     } else {
    //       this.invalid = true;
    //     }
    //   }
    // }
    // if (!this.invalid) {
    //   // save stuff to the database
    //   let vehicleRef = firestore.collection('users').doc(this.user.uid).collection('vehicles');
    //   vehicleRef.add(vehicleInfo).then((docRef) => {
    //     // clear the form
    //     this.clearVehicleForm();
    //     // then change the view
    //     this.toggleView(this.shadowRoot.querySelector('#addVehicleView'));
    //     this.requestRender();
    //   }).catch((error) => {
    //     console.log('error saving vehicle: ', error);
    //   });
    // } else {
    //   console.log('errors on the vehicle form');
    // }
    // console.log('save vehicle: ', vehicleInfo);
  }

  clearVehicleForm() {
    let form = this.shadowRoot.querySelector('#addVehicleForm');

    for (let i = 0; i < form.children.length; i++) {
      const child = form.children[i];
      if (child.tagName === "QU-VEHICLE-PICKER") {
        child. clear();
      }
      child.value = '';
      child.invalid = false;
      child.removeAttribute('invalid');
    }
  }
  
  closeVehiclePicker(e) {
    this.toggleView(this.shadowRoot.querySelector('#addVehicleView'));
  }

  _handleAddFabClick(e) {
    if (e.currentTarget.id == 'addFab' && !this.fabStackActive) {
      this.toggleFabStack(e);
    }
  }

  _handleFabStackClick(e) {
    switch (e.currentTarget.id) {
      case 'fabStackVehicle':
        let view = this.shadowRoot.querySelector('#addVehicleView');
        // view.classList.remove('inactive');
        // view.classList.add('active');
        this.toggleView(view);
        break;
    
      default:
        break;
    }
    this.toggleFabStack(e);
  }
}

window.customElements.define('qu-profile', QuProfile);
