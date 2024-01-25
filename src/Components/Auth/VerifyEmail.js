import React, {Component} from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import { Assets } from 'enums';
import {connect} from "react-redux";
import {authRegistration} from "./auth.actions";
import Language from "../../Languages/Login/content.json"


class VerifyEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerified: this.props.language === 'hi' ? 'आपके ईमेल की सफलतापूर्वक पुष्टि नहीं की गई है!' : 'Your email has been not confirmed successfully!',
      pageContent: this.props.language === 'hi' ? Language.VerifyEmailHindi : Language.VerifyEmailEnglish,
    };
  }

  async componentDidMount() {
    try {
      const queryString = this.props.location.search;
      const queryParams = new URLSearchParams(queryString);
      const email = queryParams.get('email');
      const token = queryParams.get('token');
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL_API}/api/v1/auth/user/verify-email?email=${email}&token=${token}`);
      if (response.data.status === 1) {
        this.setState({isVerified: this.state.pageContent.items[2].title})
      } else {
        this.setState({isVerified: this.state.isVerified})
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  onLogin() {
    window.location.href = '/';
  }
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
const {pageContent} = this.state
    return (
        <div style={containerStyle}>
          <img src={Assets.Logo2}  style={{width:'100%'}}/>
          <div style={messageStyle}>
            <p>{this.state.isVerified}</p>
            <p>{pageContent.items[3].title}</p>
          </div>
          <button style={loginButton} onClick={() => this.onLogin()}>{pageContent.items[4].title}</button>
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

const VerifyEmailWithState = withRouter(connect(
    mapStateToProps, { authRegistration },
)(VerifyEmail));

export {
  VerifyEmail,
  VerifyEmailWithState,
};
