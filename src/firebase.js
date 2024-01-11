import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';


const firebaseConfig = {
  apiKey: "AIzaSyB5nevbSl0zW3PjFS1F_mxWdlNkth7lMBk",
  authDomain: "indiapolls-a9288.firebaseapp.com",
  projectId: "indiapolls-a9288",
  storageBucket: "indiapolls-a9288.appspot.com",
  messagingSenderId: "102475378100",
  appId: "1:102475378100:web:51e44d0f3639163b5e96e1",
  measurementId: "G-Y9TLN0LGC3"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = () => {
    return getToken(messaging, { vapidKey: REPLACE_WITH_YOUR_VAPID_KEY })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          // Perform any other neccessary action with the token
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  };