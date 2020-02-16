const functions = require('firebase-functions');
const admin = require('firebase-admin');

const serviceAccount = require('../../elephanttracking-1-firebase-adminsdk-nig71-ceae2fb068');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://qlab-api.firebaseio.com",
    storageBucket: "gs://qlab-api.appspot.com"
});

// admin.initializeApp();

module.exports = {
    functions,
    admin
};