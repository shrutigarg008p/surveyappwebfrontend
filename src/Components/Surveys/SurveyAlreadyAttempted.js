import React, { Component } from 'react';
import {Assets} from "../../enums";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {authRegistration} from "../Auth/auth.actions"; // Import your logo image file

class SurveyAttemptMessage extends Component {
    render()
    {
        const containerStyle = {
            textAlign: 'center',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            maxWidth: '400px',
            margin: 'auto',
            marginTop: '50px',
        };

        const messageStyle = {
            fontSize: '18px',
            color: '#333',
            marginBottom: '20px',
        };

        const loginButton = {
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
        }
        return (
            <div style={containerStyle}>
                <img src={Assets.Logo2}  style={{width:'100%'}}/>
                <div style={messageStyle}>
                    <p>{this.props.language === 'hi' ? 'आप पहले ही इस सर्वेक्षण का प्रयास कर चुके हैं' : 'You have already attempted this survey'}</p>
                </div>
            </div>
        );
    }
}

export default SurveyAttemptMessage;

const mapStateToProps = (state) => {
    return {
        isAuth: state.adminUser.adminUser.isAuthenticated,
        token: state.adminUser.adminUser.token,
        language: state.adminUser.adminUser.language,
        isLoading: state.adminUser.adminUser.loading,
        error: state.adminUser.adminUser.error,
    };
};

const SurveyAttemptMessageWithState = withRouter(connect(
    mapStateToProps, { authRegistration },
)(SurveyAttemptMessage));

export {
    SurveyAttemptMessage,
    SurveyAttemptMessageWithState,
};
