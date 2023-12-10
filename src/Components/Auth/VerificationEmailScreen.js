import React from "react";
import { Assets } from 'enums';

export class VerificationEmailScreens extends React.Component {
    onLogin() {
        return this.props.history.push('/auth/login')
    }
    render() {
        return (
            <div style={styles.container}>
                 <img src={Assets.Logo} />
                <h2 style={styles.heading}>Please Verify Your Email</h2>
                <p style={styles.message}>
                    We have sent a verification link to your email address. Please click on
                    the link to verify your email.
                </p>
                <button style={styles.loginButton} onClick={() => this.onLogin()}>Login</button>
            </div>
        );
    }
}

const styles = {
    container: {
        textAlign: 'center',
        margin: '50px auto',
        padding: '20px',
        maxWidth: '400px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#fff',
    },
    heading: {
        color: '#333',
        fontSize: '24px',
        marginBottom: '10px',
    },
    message: {
        color: '#666',
        fontSize: '16px',
        lineHeight: '1.5',
    },
    loginButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
    },
};





