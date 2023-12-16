import React, { Component } from 'react';
import { PageStatus,SeoPageTitle } from '../../enums';
import {AuthAPI} from '../../API'



export default class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);
        (this.state = {
            error: null,
            status: PageStatus.None,
            input: {},
            errors: {},
            token: null,
            passwordactive: false,
            passwordconfirmactive:false,
            metaData: null,


        });
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const token = this.props.match.params.token
        this.setState({token:token})
    }


    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({
            input
        });
    }

    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;
        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }
        if (!input["confirm_password"]) {
            isValid = false;
            errors["confirm_password"] = "Please enter your confirm password.";
        }

        if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
            if (input["password"] != input["confirm_password"]) {
                isValid = false;
                errors["password"] = "Passwords don't match.";
            }
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.validate()) {
            return Promise.resolve()
                .then(() => this.setState({status: PageStatus.Submitting}))
                .then(() => AuthAPI.UpdateNewPassword(this.state.token, this.state.input.password))
                .then((res) => {
                    if (res === 'Not found.') {
                        alert('Invalid Token');
                        this.setState({status: PageStatus.Submitted})
                    }
                    alert('password updated  successfully ');
                    this.setState({status: PageStatus.Submitted}, () => {
                        let input = {};
                        input["password"] = "";
                        input["confirm_password"] = "";
                        this.setState({input: input});
                        this.props.history.push({
                            pathname: '/auth/login'
                        })
                    })
                })
                .catch((error) => {
                    this.setState({status: PageStatus.Error, error: error.message});
                });
        }
    }

    render() {
        return (
            <>
                <div>
                    <section className='register_page'>
                        <div className='register_left'>
                            <img
                                src='/assets/img/logo.jpeg'
                                alt='register-left'
                                className='img-fluid '
                            />
                        </div>
                        <div className='register_right'>
                            <h2 className='register_heading'>Reset Password</h2>

                            <div className='or_border'>
                                <p className='or_text'></p>
                            </div>
                            <form onSubmit={this.handleSubmit} >
                                <div className={ this.state.passwordactive == true || this.state.input.password!=='' ? 'input_group input_group_active': 'input_group'}>
                                    <label for='' className='custom_label'>
                                        Password:
                                    </label>
                                    <input

                                        type="password"
                                        name="password"
                                        value={this.state.input.password}
                                        onChange={this.handleChange}
                                        className='custom_input_field'
                                        onClick={() => this.setState({ passwordactive: !this.state.passwordactive })} />
                                    <div className="text-danger">{this.state.errors.password}</div>
                                </div>
                                <div className={ this.state.passwordconfirmactive == true || this.state.input.confirm_password!==''? 'input_group input_group_active': 'input_group'}>
                                    <label for='' className='custom_label'  >
                                        Confirm Password:
                                    </label>
                                    <input
                                        type="password"
                                        name="confirm_password"
                                        value={this.state.input.confirm_password}
                                        onChange={this.handleChange}
                                        className='custom_input_field'
                                        onClick={() => this.setState({passwordconfirmactive: !this.state.passwordconfirmactive})}
                                    />
                                    <div className="text-danger">{this.state.errors.confirm_password}</div>
                                </div>

                                <button  type="submit" className='create_acc_btn rippleeffect-btn'  >
                                    Submit
                                </button>

                            </form>
                        </div>
                    </section>
                </div>
            </>

        )
    }
}
