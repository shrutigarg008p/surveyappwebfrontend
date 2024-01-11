importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyB5nevbSl0zW3PjFS1F_mxWdlNkth7lMBk",
    authDomain: "indiapolls-a9288.firebaseapp.com",
    projectId: "indiapolls-a9288",
    storageBucket: "indiapolls-a9288.appspot.com",
    messagingSenderId: "102475378100",
    appId: "1:102475378100:web:51e44d0f3639163b5e96e1",
    measurementId: "G-Y9TLN0LGC3"
  };

firebase.initializeApp(firebaseConfig);


const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});