import React, { Component } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { authSuccess, authSuccessLastStep } from './auth.actions';

class GoogleSignIn extends Component {
    componentDidMount() {
        this.handleGoogleSignIn();
    }

    handleGoogleSignIn = () => {
        const { history, dispatch } = this.props;
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                let payload = {
                    email: user.email,
                    name: user.displayName,
                    photoUrl: user.photoURL,
                    phone: user.phoneNumber,
                    registerType: 'gmail',
                    role: 'panelist',
                };

                const url = process.env.REACT_APP_BASE_URL_API + '/api/v1/auth/user/login';
                this.sendPostRequest(url, payload)
                    .then((responseData) => {
                        console.log('res-->', responseData)
                        if (responseData.status === 1) {
                            if (responseData.data.basicProfile) {
                                if (responseData.data.role === 'panelist') {
                                    dispatch(authSuccess(responseData.data));
                                    history.push('/panelist/dashboard');
                                } else {
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

export default connect()(withRouter(GoogleSignIn));
