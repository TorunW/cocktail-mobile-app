"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = exports.storage = exports.db = exports.app = void 0;

var _app = require("firebase/app");

var _firestore = require("firebase/firestore");

var _storage = require("firebase/storage");

var _auth = require("firebase/auth");

var firebaseConfig = {
  apiKey: 'AIzaSyDLHI-qWsgV7U4JKOyzgNEpEcYfqDT3FHw',
  authDomain: 'cocktailapp-40264.firebaseapp.com',
  projectId: 'cocktailapp-40264',
  storageBucket: 'cocktailapp-40264.appspot.com',
  messagingSenderId: '886927843585',
  appId: '1:886927843585:web:b18fd505969398204abb00'
};
var app = (0, _app.initializeApp)(firebaseConfig);
exports.app = app;
var db = (0, _firestore.getFirestore)(app);
exports.db = db;
var storage = (0, _storage.getStorage)(app);
exports.storage = storage;
var auth = (0, _auth.getAuth)(app);
exports.auth = auth;