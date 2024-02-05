import React, { Component } from 'react';
import { getAuth, signInWithPopup, FacebookAuthProvider  } from 'firebase/auth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { authSuccess, authSuccessLastStep } from './auth.actions';

class FacebookSignIn extends Component {
    componentDidMount() {
        this.handleFacebookSignIn();
    }

    handleFacebookSignIn = () => {
        const { history, dispatch } = this.props;
        const auth = getAuth();
        const provider = new FacebookAuthProvider();
        provider.setCustomParameters({
            'display': 'popup'
        });
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                console.log(user)
                let payload = {
                    email: user.email,
                    name: user.displayName,
                    photoUrl: user.photoURL,
                    phone: user.phoneNumber,
                    registerType: 'facebook',
                    role: 'panelist',
                    facebooktoken : user.uid
                };

                const url = process.env.REACT_APP_BASE_URL_API + '/api/v1/auth/user/login';
                this.sendPostRequest(url, payload)
                    .then((responseData) => {
                        if (responseData.status === 1) {
                            if (responseData.data.basicProfile) {
                                if (responseData.data.role === 'panelist') {
                                    dispatch(authSuccess(responseData.data));
                                    history.push('/panelist/dashboard');
                                } else if (responseData.role === 'pm') {
                                    dispatch(authSuccess(responseData.data));
                                    history.push("/pm/dashboard");
                                } else if (responseData.role === 'sub-admin') {
                                    dispatch(authSuccess(responseData.data));
                                    history.push("/sub-admin/redemption");
                                } else {
                                    dispatch(authSuccess(responseData.data));
                                    history.push('/admin/dashboard-admin');
                                }
                            } else if (responseData.data.basicProfile === null) {
                                dispatch(authSuccessLastStep(responseData.data));
                                history.push('/auth/basic-profile');
                            } else {
                                console.error('Something went wrong');
                            }
                        }
                    })
                    .catch((error) => {
                        console.error('Request Error:', error);
                    });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    sendPostRequest = (url, data) => {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Success:', data);
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
                throw error;
            });
    };

    render() {
        // You can add any additional rendering logic if needed
        return null;
    }
}

export default connect()(withRouter(FacebookSignIn));
