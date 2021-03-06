import React, { Component } from 'react';
import { validateForm } from '../../../utils/SignupFormValidation';
import './Signup.css';
import { signup } from '../../../services/Auth/Auth';
import Base from '../../Base/Base';
import Spinner from '../../Core/Spinner';

class Signup extends Component {

    getInitialState = () => {
        return {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            cpassword: "",
            errors: {},
            touched: {},
            isFormValid: false,
            formSubmitted: false,
            loading: false
        }
    };

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleTouch = (e) => {
        let { touched } = this.state;
        if (e.target.name && touched[e.target.name] !== true) {
            touched[e.target.name] = true;
            this.setState({
                touched
            });
        }
    }

    validateForm = () => {
        let { firstname, lastname, email, password, cpassword } = this.state;
        const { errors, isFormValid } = validateForm({
            firstname,
            lastname,
            email,
            password,
            cpassword
        });

        this.setState({
            errors,
            isFormValid
        })
    }

    submitForm = async (e) => {
        e.preventDefault();

        if (this.state.isFormValid) {
            this.setState(
                this.getInitialState()
            );

            try {
                const { firstname, lastname, email, password } = this.state;
                const user = await signup({ firstname, lastname, email, password });
                alert(user.message);
                console.log(user);
            }
            catch (err) {
                alert(err);
            }
        }
    }


    render() {
        let { firstname, lastname, email, password, cpassword } = this.state;

        return (
            <Base>
                {this.state.loading && <Spinner />}
                {<div className="container col  justify-center align-center">
                    <h3 className="display-1">Signup to get Started!</h3>
                    <form className="flex-col login-form" name="signupForm">

                        <label>First Name</label>
                        <input type="text" name="firstname" value={firstname}
                            onChange={(e) => { this.handleChange(e); this.validateForm(); }}
                            onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                        {
                            (this.state.formSubmitted || this.state.touched.firstname) &&
                            <div className="error-msg">{this.state.errors.firstname}</div>
                        }


                        <label>Last Name</label>
                        <input type="text" name="lastname" value={lastname}
                            onChange={(e) => { this.handleChange(e); this.validateForm(); }}
                            onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                        {
                            (this.state.formSubmitted || this.state.touched.lastname) &&
                            <div className="error-msg">{this.state.errors.lastname}</div>
                        }

                        <label>Email Id</label>
                        <input type="text" name="email" value={email}
                            onChange={(e) => { this.handleChange(e); this.validateForm(); }}
                            onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                        {
                            (this.state.formSubmitted || this.state.touched.email) &&
                            <div className="error-msg">{this.state.errors.email}</div>
                        }

                        <label>Password</label>
                        <input type="password" name="password" value={password}
                            onChange={(e) => { this.handleChange(e); this.validateForm(); }}
                            onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                        {
                            (this.state.formSubmitted || this.state.touched.password) &&
                            <div className="error-msg">{this.state.errors.password}</div>
                        }


                        <label>Confirm Password</label>
                        <input type="password" name="cpassword" value={cpassword}
                            onChange={(e) => { this.handleChange(e); this.validateForm(); }}
                            onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                        {
                            (this.state.formSubmitted || this.state.touched.cpassword) &&
                            <div className="error-msg">{this.state.errors.cpassword}</div>
                        }

                        <button onClick={this.submitForm}>Sign Up</button> 
                    </form>
                </div>}
            </Base>);
    }
}

export default Signup;