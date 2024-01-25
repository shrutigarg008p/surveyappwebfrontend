import React from "react";
import { Assets } from 'enums';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {authRegistration} from "./auth.actions";
import Language from "../../Languages/Login/content.json"


class VerificationEmailScreens extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageContent: this.props.language === 'hi' ? Language.VerifyEmailHindi : Language.VerifyEmailEnglish,
        };
    }
    onLogin() {
        return this.props.history.push('/auth/login')
    }
    render() {
        const {pageContent} = this.state
        return (
            <div style={styles.container}>
                 <img src={Assets.Logo2}  style={{width:'100%'}}/>
                <h2 style={styles.heading}>{pageContent.title}</h2>
                <p style={styles.message}>
                    {pageContent.description}
                </p>
                <button style={styles.loginButton} onClick={() => this.onLogin()}>{pageContent.items[4].title}</button>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isAuth: state.adminUser.adminUser.isAuthenticated,
        token: state.adminUser.adminUser.token,
        language: state.adminUser.adminUser.language,
        isLoading: state.adminUser.adminUser.loading,
        error: state.adminUser.adminUser.error,
    };
};

const VerificationEmailScreensWithState = withRouter(connect(
    mapStateToProps, { authRegistration },
)(VerificationEmailScreens));

export {
    VerificationEmailScreens,
    VerificationEmailScreensWithState,
};


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





