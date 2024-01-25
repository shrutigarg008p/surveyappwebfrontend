import React, { Component } from 'react';
import {Assets, PageStatus} from "../../enums";
import {AuthAPI} from "../../API";
import {withRouter} from "react-router";
import {Alert} from "react-bootstrap";
import Language from "../../Languages/Login/content.json"
import {connect} from "react-redux";
import {authRegistration} from "./auth.actions";

class VerifyOtp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            status: PageStatus.None,
            error: null,
            userId: null,
            pageContent: this.props.language === 'hi' ? Language.OTPVerifyHindi : Language.OTPVerifyEnglish,
        };
    }

    componentDidMount() {
        console.log('State from props:', this.props.location.state);
     this.setState({ userId: this.props.location.state?.userId })
    }
    handleChange = (e) => {
        this.setState({
            otp: e.target.value,
            error: '',
        });
    };

    handleVerify = () => {
        let obj = { otp: this.state.otp, userId: this.state.userId }
        return Promise.resolve()
            .then(() => this.setState({status: PageStatus.Submitting}))
            .then(() => AuthAPI.verifyMobileOtp(obj))
            .then((res) => {
                alert(this.state.pageContent.items[2].title)
                if(res.emailConfirmed === false) {
                    this.props.history.push({
                        pathname: '/verify-screen'
                    })
                } else {
                    this.setState({status: PageStatus.Submitted}, () => {
                        this.props.history.push({
                            pathname: '/auth/login'
                        })
                    })
                }
            })
            .catch((error) => {
                this.setState({status: PageStatus.Error, error: error.message});
            });
    }

    render() {
        const { otp, error, pageContent } = this.state;
        console.log('erre---->', error)
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
        return (
            <div>
                <div style={styles.container}>
                    <img src={Assets.Logo2}  style={{width:'100%'}}/>
                    <h2 style={styles.heading}>{pageContent.title}</h2>
                    <p style={styles.message}>
                        {pageContent.description}
                    </p>
                        <input placeholder={pageContent.items[0].title} type="text" value={otp} onChange={this.handleChange} />
                    <button className="ml-3" onClick={this.handleVerify}>{pageContent.items[1].title}</button>
                </div>
                <Alert variant="danger" show={!!this.state.error} className="mt-2">
                    {this.state.error}
                </Alert>
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

const VerifyOtpWithState = withRouter(connect(
    mapStateToProps, { authRegistration },
)(VerifyOtp));

export {
    VerifyOtp,
    VerifyOtpWithState,
};
