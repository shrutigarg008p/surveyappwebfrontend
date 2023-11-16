import React, {Component} from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';


class VerifyEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerified: 'Your email has been not confirmed successfully!',
    };
  }

  async componentDidMount() {
    try {
      const queryString = this.props.location.search;
      const queryParams = new URLSearchParams(queryString);
      const email = queryParams.get('email');
      const token = queryParams.get('token');
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL_API}/api/v1/auth/user/verify-email?email=${email}&token=${token}`);
      console.log('response--->', response)
      if (response.data.status === 1) {
        this.setState({isVerified: 'Your email has been confirmed successfully!'})
      } else {
        this.setState({isVerified: 'Your email has been not confirmed successfully!'})
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

    return (
        <div style={containerStyle}>
          <div style={messageStyle}>
            <p>{this.state.isVerified}</p>
            <p>Click the button below to log in:</p>
          </div>
          <button style={loginButton} onClick={() => this.onLogin()}>Login</button>
        </div>
    );
  }
}


export default withRouter(VerifyEmail);
