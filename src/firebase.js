import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import $ from 'jquery';
import 'jquery-confirm';
import { Assets } from 'enums';

const firebaseConfig = {
  apiKey: "AIzaSyB5nevbSl0zW3PjFS1F_mxWdlNkth7lMBk",
  authDomain: "auth.indiapolls.com",
  projectId: "indiapolls-a9288",
  storageBucket: "indiapolls-a9288.appspot.com",
  messagingSenderId: "102475378100",
  appId: "1:102475378100:web:51e44d0f3639163b5e96e1",
  measurementId: "G-Y9TLN0LGC3"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const saveToken = (token) => {
  const storedData = localStorage.getItem("persist:root");
  if (storedData) {
    const data = JSON.parse(storedData);
    const obj = JSON.parse(data['adminUser'])
    const userId = obj["adminUser"]["userId"];
    const requestBody = {
      userId: userId,
      devicetoken: token
    };
    if (userId && token) {
      const API_URL = process.env.REACT_APP_BASE_URL_API + '/api/v1/auth/user/updateDeviceToken';
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      })
          .then((response) => response.json())
          .then((data) => console.log("Response:", data))
          .catch((error) => console.error("Error:", error));
    }
  }
}

function showAlert(title, message) {
  var audio = new Audio('./assets/sound/notification.mp3');
  audio.play();
  $.alert({
    title: '<img src="/assets/img/logo-black.png" style="width:50%" alt="Logo" class="img-fluid"><br/><br/>' + title,
    content: message,
    type: 'blue',
    theme: 'modern',
    closeIcon: true,
    animation: 'scale',
    closeAnimation: 'scale',
    draggable: true,
    columnClass: 'custom-alert',
    onOpenBefore: function () {
        $('.custom-alert .title').css('font-size', '18px'); // Adjust title font size
        $('.custom-alert .content').css('font-size', '16px'); // Adjust content font size
    }
});
}


export const foreGroundMessage = () => {
  onMessage(messaging, function(payload) {
    console.log('Message received. ', payload);
    const notificationTitle = payload.notification.title;
    const notificationBody = payload.notification.body;
    showAlert("New Notification Received: "+notificationTitle, notificationBody);
})
}


export const requestForToken = () => {
  return getToken(messaging, { vapidKey: 'BMmZvu1puszpOIN81pCogNt718wuwGhHlZzVEd5CEiHpesSYQHwZ7CUQvRF1FT9Tr8g69iWtl_d7pkeXbkx5x9c' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        saveToken(currentToken);

      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};
