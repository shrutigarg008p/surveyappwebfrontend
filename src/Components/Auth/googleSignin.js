import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


function sendPostRequest(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        return data;
      })
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

export const GoogleSignIn = ({}) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    const user = result.user;
    let payload = {
        email : user.email, 
        name : user.displayName, 
        photoUrl : user.photoURL, 
        phone : user.phoneNumber, 
        registerType : "gmail", 
        role : "penalist"
    }
    const url = process.env.REACT_APP_BASE_URL_API+'/api/v1/auth/user/login';
    sendPostRequest(url, payload)
    .then(responseData => {
        if(responseData.success){
            
        }else{
            console.error("Something went wrong");
        }
      })
      .catch(error => {
        console.error('Request Error:', error);
      });
  }).catch((error) => {
    console.log(error.message)
  });
}
