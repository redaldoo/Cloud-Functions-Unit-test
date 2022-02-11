const admin = require('firebase-admin');
const test = require('firebase-functions-test')({
    databaseURL: 'https://trybuy-d42d2.firebaseio.com',
    storageBucket: 'trybuy-d42d2.appspot.com',
    projectId: 'trybuy-d42d2',
},'./path/to/private-key.json');
const adminStub =  jest.spyOn(admin, "initializeApp");

module.exports = { test, adminStub };