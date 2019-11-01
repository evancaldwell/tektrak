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
import { repeat } from 'lit-html/lib/repeat';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';
import { json } from '../data/import.js';
// import { firestore } from '../config/firebase.js';

// These are the shared styles and icons needed by this element.
import { SharedStyles } from './shared-styles.js';
import { clearIcon } from './my-icons.js';

class AdminView extends connect(store)(PageViewElement) {
  _render(props) {
    // write a mixin or directive that handles role checking
    if(props.user && props.user.roles && props.user.roles.includes('admin')) {
      return html`
        ${SharedStyles}
        <style>
          :host {
            height: var(--app-content-height);
            box-sizing: border-box;
          }
          hr {
            width: 100%;
            margin-top: 50px;
            margin-bottom: 50px;
          }
          article {
            display: flex;
            flex-direction: column;
            min-height: calc(var(--app-content-height) - 50px);
            padding: 25px;
          }
          button {
            width: calc(100% + 50px);
            height: 100px;
            margin: -25px;
            font-size: 40px;
            text-transform: uppercase;
            background-color: var(--app-disabled-color);
            display: none; /* need some way to better handle uploading data */
          }
          .grid {
            display: grid;
            grid-template-columns: 50px 1fr 100px 80px 50px;
            grid-gap: 10px;
            align-items: center;
          }
          .table-heading {
            font-weight: bold;
          }
          #profile-image {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          .approval {
            text-decoration: underline;
            cursor: pointer;
          }

          #qrCodes {
            margin: 25px auto;
          }

          qu-qr-generator {
            width: 100px;
            height: 100px;
          }

          .enlarged {
            width: 320px;
            height: 320px;
          }

          .flex-spacer {
            flex: 1;
          }
        </style>
        <article>
          <h2>Pending staff requests:</h2>
          <div class="grid">
            <p>&nbsp;</p>
            <p class="table-heading">Name</p>
            <p class="table-heading role">Role</p>
            <p class="table-heading">Approve?</p>
            <p>&nbsp;</p>
            ${repeat(props.admins, admin => admin.key, admin => html`
              <iron-image id="profile-image" src="${admin.picture}" preload sizing="cover"></iron-image>
              <p>${admin.name}</p>
              <p>${admin.requestedRole}</p>
              <p id="${admin.key}" class="approval" on-click="${e => this.handleApproval(e)}">approve</p>
              <div id="clear-${admin.key}" data-uid="${admin.key}" on-click="${e => this.clearRoleRequest(e)}">${clearIcon}</div>
            `)}
            ${repeat(props.teachers, teacher => teacher.key, teacher => html`
              <iron-image id="profile-image" src="${teacher.picture}" preload sizing="cover"></iron-image>
              <p>${teacher.name}</p>
              <p>${teacher.requestedRole}</p>
              <p id="${teacher.key}" class="approval" on-click="${e => this.handleApproval(e)}">approve</p>
              <div id="clear-${teacher.key}" data-uid="${teacher.key}" on-click="${e => this.clearRoleRequest(e)}">${clearIcon}</div>
            `)}
            ${repeat(props.carpoolStaffs, carpoolStaff => carpoolStaff.key, carpoolStaff => html`
              <iron-image id="profile-image" src="${carpoolStaff.picture}" preload sizing="cover"></iron-image>
              <p>${carpoolStaff.name}</p>
              <p>${carpoolStaff.requestedRole}</p>
              <p id="${carpoolStaff.key}" class="approval" on-click="${e => this.handleApproval(e)}">approve</p>
              <div id="clear-${carpoolStaff.key}" data-uid="${carpoolStaff.key}" on-click="${e => this.clearRoleRequest(e)}">${clearIcon}</div>
            `)}
          </div>

          <hr>

          <h2>QR Codes for requesting roles:</h2>
          <div id="qrCodes">
            <p>Parent/Driver</p>
            <qu-qr-generator data="quikup.me" mode="octet" on-click="${(e) => this.englargeQr(e)}" auto></qu-qr-generator>
            <p>Teacher</p>
            <qu-qr-generator data="quikup.me/teacher-view?role=dGVhY2hlcg==" mode="octet" on-click="${(e) => this.englargeQr(e)}" auto></qu-qr-generator>
            <p>Carpool Staff</p>
            <qu-qr-generator data="quikup.me/carpool-view?role=Y2FycG9vbFN0YWZm" mode="octet" on-click="${(e) => this.englargeQr(e)}" auto></qu-qr-generator>
          </div>

          <div class="flex-spacer"></div>
          <button>Data has already been uploaded</button>
          <!-- <button on-click="${() => this.loadData()}">upload data</button> -->
          
        </article>
      `;
    } else {
      return html`
        ${SharedStyles}
        <h1>You're not allowed here</h1>
      `
    }
  }

  static get properties() { return {
    students: Array,
    admins: Array,
    teachers: Array,
    carpoolStaffs: Array,
    user: Object
  }}

  constructor() {
    super();
    this.students = [];
    this.admins = [];
    this.teachers = [];
    this.carpoolStaffs = [];
    let firestore = firebase.firestore();
    firestore.settings({timestampsInSnapshots: true});

    // put this in a mixin or directive
    if (!this.user) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          this.user = user;
          // TODO: make _setRoles async and await it
          // this._setRoles();
          let userRef = firestore.collection('users').doc(this.user.uid);
          userRef.onSnapshot(doc => {
            let userData = doc.data();
            this.user.roles = userData.roles;
            this.requestRender();
            console.log('this.user.roles: ', this.user.roles);
            let newLocation;
            if (this.user.roles.includes('admin')) {
              console.log('on the right view: admin');
            } else if (this.user.roles.includes('teacher')) {
              newLocation = `/teacher-view`;
              console.log('headed to view: teacher');
            } else if (this.user.roles.includes('driver')) {
              newLocation = `/driver-view`;
              console.log('headed to view: driver');
            } else {
              newLocation = `/driver-view`;
              console.log ('not admin, teacher or driver')
            }
            if (newLocation) {
              window.history.pushState({}, '', newLocation);
              this._locationChanged(newLocation);
            }
          });
          this.loggedIn = true;

        } else {
          // User is signed out.
          this.loggedIn = false;
        }
        console.log('admin view user: ', user);
      });
    } else {
      // TODO: make _setRoles async and await it
      // this._setRoles();
      let userRef = firestore.collection('users').doc(this.user.uid);
      userRef.onSnapshot(doc => {
        let userData = doc.data();
        this.user.roles = userData.roles;
        this.requestRender();
        console.log('this.user.roles: ', this.user.roles);
      })
    }


    let schoolRef = firestore.collection('schools').doc('treeside');
    let teachersRef = firestore.collection('users').where('school', '==', 'treeside').where("roles", "array-contains", "teacher");
    let adminRequestRef = firestore.collection('users').where('school', '==', 'treeside').where('requestedRole', '==', 'admin');
    let teacherRequestRef = firestore.collection('users').where('school', '==', 'treeside').where('requestedRole', '==', 'teacher');
    let carpoolStaffRequestRef = firestore.collection('users').where('school', '==', 'treeside').where('requestedRole', '==', 'carpoolStaff');
    adminRequestRef.onSnapshot(collection => {
      let tmpAdmin = {};
      let admins = [];
      collection.forEach(teacher => {
        tmpAdmin = teacher.data();
        tmpAdmin.key = teacher.id;
        admins.push(tmpAdmin);
      });
      this.admins = admins;
    });
    teacherRequestRef.onSnapshot(collection => {
      let tmpTeacher = {};
      let teachers = [];
      collection.forEach(teacher => {
        tmpTeacher = teacher.data();
        tmpTeacher.key = teacher.id;
        teachers.push(tmpTeacher);
      });
      this.teachers = teachers;
    });
    carpoolStaffRequestRef.onSnapshot(collection => {
      let tmpCarpoolStaff = {};
      let carpoolStaffs = [];
      collection.forEach(teacher => {
        tmpCarpoolStaff = teacher.data();
        tmpCarpoolStaff.key = teacher.id;
        carpoolStaffs.push(tmpCarpoolStaff);
      });
      this.carpoolStaffs = carpoolStaffs;
    });
  }

  handleApproval(e) {
    let userRef = firestore.collection('users').doc(e.target.id);
    userRef.update({
      requestedRole: firebase.firestore.FieldValue.delete(),
      roles: firebase.firestore.FieldValue.arrayUnion(e.target.previousElementSibling.textContent)
    }).then(() => {
      console.log('successfully updated the roles stuff');
    })
    .catch(() => {
      console.log('Had a problem updating the roles stuff');
    });
  }

  clearRoleRequest(e) {
    let uid = e.currentTarget.id.slice(6);
    let userRef = firestore.collection('users').doc(uid);
    userRef.update({
      requestedRole: firebase.firestore.FieldValue.delete()
    }).then(() => {
      console.log('successfully deleted the requested role');
    })
    .catch(() => {
      console.log('Had a problem deleting the requested role');
    });
    console.log('clear approval e: ', e);
  }

  englargeQr(e) {
    let el = e.currentTarget;
    if (el.classList.contains('enlarged')) {
      el.classList.remove('enlarged');
    } else {
      el.classList.add('enlarged');
    }
  }

  loadData() {
    let ref = firestore.collection('schools').doc('treeside').collection('students')
    for (var i=0; i < json.length; i++) {
      if (i > 2) { 
        ref.add(json[i]);
      }
      // console.log(json[i]);
    }
  }

  _setRoles() {
    let userRef = firestore.collection('users').doc(this.user.uid);
    userRef.onSnapshot(doc => {
      let userData = doc.data();
      this.user.roles = userData.roles;
      this.requestRender();
      console.log('this.user.roles: ', this.user.roles);
    })
  }

  _locationChanged(path) {
    console.log('in location changed request-role-view: ', path);
    store.dispatch(navigate(path));
  }

  _stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
    this._snackbarOpened = state.app.snackbarOpened;
    this._drawerOpened = state.app.drawerOpened;
  }

}

window.customElements.define('admin-view', AdminView);
