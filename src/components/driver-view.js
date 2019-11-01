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

// import { firestore } from '../config/firebase.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// We are lazy loading its reducer.
import shop, { cartQuantitySelector } from '../reducers/shop.js';
store.addReducers({
  shop
});

// These are the elements needed by this element.
import './shop-products.js';
import './shop-cart.js';
import './student-list-item.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { ButtonSharedStyles } from './button-shared-styles.js';

class DriverView extends connect(store)(PageViewElement) {
  _render({lockoutBackground, lockoutBtnText, lockoutMessage, children}) {
    return html`
      ${ButtonSharedStyles}
      ${SharedStyles}
      <style>
        :host {
          height: var(--app-content-height);
        }
        article {
          display: flex;
          flex-direction: column;
          height: var(--app-content-height);
        }
        #lockOutOverlay {
          position: absolute;
          width: 100%;
          z-index: var(--z-tertiary);
          background: lightgrey url("../../../images/treeside-map.png") no-repeat center center;
        }
        .in-range {
          display: none;
        }
        #lockOutOverlay h2 {
          flex: 1;
          background: rgba(255,255,255,0.8);
          width: 100%;
          text-align: center;
          padding: 200px 50px 0;
        }
      </style>

      <article id="lockOutOverlay">
        <h2>${lockoutMessage}</h2>
        <button id="outOfRangeBtn" disabled>${lockoutBtnText}</button>
      </article>

      <article>
        ${repeat(this.students, student => student.key, student => html`
          <student-list-item id="${student.uid}" profileName="${student.firstName + ' ' + student.lastName}"></student-list-item>
        `)}
        <div class="flex-spacer"></div>
        <button id="checkInBtn" on-click="${(e) => this.checkIn(e)}">Check In</button>
      </article>
    `;
  }

  static get properties() { return {
    // This is the data from the store.
    checkinRange: Number,
    children: Array,
    inRange: Boolean,
    lockoutBackground: String,
    lockoutBtnText: String,
    lockoutMessage: String,
    timeStatus: String,
    schoolLocation: Object,
    _quantity: Number,
    _error: String
  }}

  constructor() {
    super();
    this.inRange = false;
    this.lockoutMessage = 'You are either out of range or not within the pickup time';
    this.lockoutBtnText = 'Sorry';
    this.students = [];

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.getChildren(user);
        console.log('got the user: ', user);
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
            console.log ('not admin, teacher or driver')
          }
          if (newLocation) {
            window.history.pushState({}, '', newLocation);
            this._locationChanged(newLocation);
          }
        });
        this.loggedIn = true;
      } else {
        console.log('User object not available');
        this.loggedIn = false;
      }
    });

    let firestore = firebase.firestore();
    firestore.settings({timestampsInSnapshots: true});
  }

  connectedCallback() {
    super.connectedCallback();

    let schoolRef = firestore.collection('schools').doc('treeside');
    schoolRef.get().then(doc => {
      let schoolLocation = this.schoolLocation = doc.data().geoLocation;
      let releaseSchedule = this.releaseSchedule = doc.data().releaseSchedule;
      console.log('releaseSchedule: ', releaseSchedule);
      let checkinRange = this.checkinRange = doc.data().checkinRange;

      let releaseTime, releaseStart, releaseEnd, rangeStart, rangeEnd;
      let now = Date.now();
      let date = new Date();
      let day = date.getDay();
      let hour = date.getHours();
      let minute = date.getMinutes();

      switch (day) {
        case 1:
          releaseTime = releaseSchedule.mon;
          releaseStart = parseInt(releaseTime.split(':')[0]) - 1;
          releaseEnd = parseInt(releaseTime.split(':')[0]) + 1;
          break;
        case 2:
          releaseTime = releaseSchedule.tue;
          releaseStart = parseInt(releaseTime.split(':')[0]) - 1;
          releaseEnd = parseInt(releaseTime.split(':')[0]) + 1;
          break;
        case 3:
          releaseTime = releaseSchedule.wed;
          releaseStart = parseInt(releaseTime.split(':')[0]) - 1;
          releaseEnd = parseInt(releaseTime.split(':')[0]) + 1;
          break;
        case 4:
          releaseTime = releaseSchedule.thu;
          releaseStart = parseInt(releaseTime.split(':')[0]) - 1;
          releaseEnd = parseInt(releaseTime.split(':')[0]) + 1;
          break;
        case 5:
          releaseTime = releaseSchedule.fri;
          releaseStart = parseInt(releaseTime.split(':')[0]) - 1;
          releaseEnd = parseInt(releaseTime.split(':')[0]) + 1;
          break;
      
        default:
          releaseTime = '00:00';
          releaseStart = parseInt(releaseTime.split(':')[0]) - 1;
          releaseEnd = parseInt(releaseTime.split(':')[0]) + 1;
          break;
      }
      console.log('day | hour | release time: ', day, hour, releaseTime, releaseStart, releaseEnd);
      rangeStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), releaseStart, releaseTime.split(':')[1])
      rangeEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), releaseEnd, releaseTime.split(':')[1])
      if (rangeStart.getTime() <= now && now <= rangeEnd.getTime()) {
        console.log('in range');
        this.timeStatus = 'inTime';
        this.setGeoWatcher();
      } else if (now <= rangeStart.getTime()) {
        console.log('before checkin');
        this.timeStatus = 'beforeTime';
        // set the out of range background
        this.lockoutMessage = 'It\'s not quite time for pickup yet';
        this.lockoutBtnText = 'Too Early';
        this.lockoutBackground = 'clock.jpeg';
        let offsetMillis = rangeStart.getTime() - now;
        console.log('offsetMillis: ', offsetMillis);
        setTimeout(() => {this.setGeoWatcher()}, offsetMillis);
      } else {
        console.log('after checkin');
        this.timeStatus = 'afterTime';
        // set the out of range background
        this.lockoutMessage = 'It\'s a little late for pickup';
        this.lockoutBtnText = 'Too Late';
        this.lockoutBackground = 'clock.jpeg';
      }

    })
  }

  setGeoWatcher() {
    console.log('setting watcher');
    if (navigator.geolocation) {
      const watcher = navigator.geolocation.watchPosition(this.rangeCheck.bind(this), this.geoWatcherError);
      // setTimeout(() => {
      //   navigator.geolocation.clearWatch(watcher);
      //   console.log('watcher cleared');
      // }, 30000);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  geoWatcherError(error) {
    console.log('Error getting position: ', error);
  }

  rangeCheck(position) {
    console.log('position: ', position)
    let distance = this._calcDistance(this.schoolLocation.longitude, this.schoolLocation.latitude, position.coords.longitude, position.coords.latitude)
    console.log('distance: ', distance);
    if (distance < this.checkinRange) {
      this.withinRange();
    } else {
      this.outOfRange();
    }
  }

  withinRange() {
    this.inRange = true;
    this.shadowRoot.querySelector('#lockOutOverlay').classList.add('in-range');
  }

  outOfRange() {
    if (this.inRange) {
      this.inRange = false;
      this.leaving();
    }
    this.lockoutMessage = 'You must be within range of the school to check in';
    this.lockoutBtnText = 'Out of Range';
    this.lockoutBackground = 'treeside-map.png';
    this.shadowRoot.querySelector('#lockOutOverlay').classList.remove('in-range');
  }

  leaving() {
    let batch = firestore.batch();
    this.students.forEach(student => {
      batch.update(
        firestore.collection('schools').doc('treeside').collection('students').doc(student.id),
        {status: '4_pickedUp'}
      );
      batch.update(
        firestore.collection('users').doc(this.user.uid).collection('children').doc(student.id),
        {status: '4_pickedUp'}
      );
    });
    batch.commit().then(() => {
      this.outOfRange();
    }).catch((error) => {
      console.log('error batch writing leaving updates: ', error);
    });
    console.log('leaving range');
  }

  checkIn(e) {
    let checkInList = [];
    let skipList = [];
    let students = this.getStudents();

    let batch = firestore.batch();
    let studentRefs = [];

    // TODO: put in the firebase .then
    // TODO: depending on how I end up working firebase may not need to divide the lists
    //       instead just mark the status or something
    let button = this.shadowRoot.querySelector('#checkInBtn');
    button.innerText = 'QUEUED UP';
    button.setAttribute('disabled', '');
    students.forEach(student => {
      if(student.active) {
        checkInList.push(student);
      } else {
        skipList.push(student);
      }
    });
    if(checkInList.length === 0) {
      checkInList = students;
    } else {
      skipList.forEach(student => {
        student.checkedIn = false;
        student.setAttribute('skipped', '');
        student.setAttribute('disabled', '');
      })
    }
    checkInList.forEach(student => {
      batch.update(
        firestore.collection('schools').doc('treeside').collection('students').doc(student.id),
        {status: '2_checkedIn'}
      );
      batch.update(
        firestore.collection('users').doc(this.user.uid).collection('children').doc(student.id),
        {status: '2_checkedIn'}
      );
    });
    batch.commit().then(() => {
      checkInList.forEach(student => {
        student.checkedIn = true;
        student.active = false;
        student.disabled = true;
        student.setAttribute('checked-in', '');
        student.setAttribute('disabled', '');
        student.removeAttribute('active');
      });
    }).catch((error) => {
      console.log('error batch writing checkin updates: ', error);
    });
    console.log('checkInList: ', checkInList);
  }

  getChildren(user) {
    firestore.collection('users').doc(this.user.uid).collection('children').onSnapshot((collection) => {
      // this.children = collection;
      let batch = firestore.batch();
      let students = [];
      collection.forEach(doc => {
        let student = doc.data();
        student.uid = doc.id;
        students.push(student)
        console.log("Child data: ", doc.data());
      });
      students.forEach(student => {
        if (student.status === '4_pickedUp' && (this.timeStatus === 'beforeTime' || this.timeStatus === 'inTime')) {
          batch.update(
            firestore.collection('schools').doc('treeside').collection('students').doc(student.id),
            {status: '1_waiting'}
          );
          batch.update(
            firestore.collection('users').doc(this.user.uid).collection('children').doc(student.id),
            {status: '1_waiting'}
          );
        }
      });
      batch.commit().then(() => {
        this.students = students;
      }).catch((error) => {
        console.log('error batch writing getChildren updates: ', error);
      });
    });
  }

  getStudents() {
    return this.shadowRoot.querySelectorAll('student-list-item');
  }

  _locationChanged(path) {
    console.log('in location changed driver-view: ', path);
    store.dispatch(navigate(path));
  }

  _stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
    this._snackbarOpened = state.app.snackbarOpened;
    this._drawerOpened = state.app.drawerOpened;
  }

  _calcDistance(lon1, lat1, lon2, lat2) {
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
    var dLon = (lon2-lon1).toRad(); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

  _msToTime(duration, returnVal) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }
}

window.customElements.define('driver-view', DriverView);
