import { GoogleAuthProvider,  getAuth, signInWithPopup } from "firebase/auth";


function getRequiredObject(userObject) {
    let convertedObject = {
        email: userObject.email,
        photoURL: userObject.photoURL,
        registerType: ""
    };

    if (userObject.providerData && userObject.providerData.length > 0) {
        let providerId = userObject.providerData[0].providerId;
        if (providerId.includes("google.com")) {
            convertedObject.registerType = "gmail";
        } else {
            convertedObject.registerType = providerId;
        }
    }

    return convertedObject;
}

async function postRequest(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending data to the API:', error);
        throw error;
    }
}

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        const data = getRequiredObject(user);
        const url = procee.env.REACT_APP_BASE_URL_API + '/api';
        postRequest(url, data)
        .then(responseData => console.log(responseData))
        .catch(error => console.error(error));
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(errorMessage)
    });
};
