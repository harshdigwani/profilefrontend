import React, { Component } from 'react';
import { validateForm } from '../../../utils/SignupFormValidation';
import './Signup.css';
import { signup } from '../../../services/Auth/Auth';

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

    getState = () => {
        console.log(this.state);
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
            <div id="main-registration-container">
                <div id="register">
                    <h3>Registration page</h3>

                    <form name="signupForm">

                        <label>First Name</label>
                        <input type="text" name="firstname" value={firstname}
                            onChange={(e) => { this.handleChange(e); this.validateForm(); }}
                            onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                        {
                            (this.state.formSubmitted || this.state.touched.firstname) &&
                            <div className="errorMsg">{this.state.errors.firstname}</div>
                        }


                        <label>Last Name</label>
                        <input type="text" name="lastname" value={lastname}
                            onChange={(e) => { this.handleChange(e); this.validateForm(); }}
                            onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                        {
                            (this.state.formSubmitted || this.state.touched.lastname) &&
                            <div className="errorMsg">{this.state.errors.lastname}</div>
                        }

                        <label>Email Id</label>
                        <input type="text" name="email" value={email}
                            onChange={(e) => { this.handleChange(e); this.validateForm(); }}
                            onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                        {
                            (this.state.formSubmitted || this.state.touched.email) &&
                            <div className="errorMsg">{this.state.errors.email}</div>
                        }

                        <label>Password</label>
                        <input type="password" name="password" value={password}
                            onChange={(e) => { this.handleChange(e); this.validateForm(); }}
                            onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                        {
                            (this.state.formSubmitted || this.state.touched.password) &&
                            <div className="errorMsg">{this.state.errors.password}</div>
                        }


                        <label>Confirm Password</label>
                        <input type="password" name="cpassword" value={cpassword}
                            onChange={(e) => { this.handleChange(e); this.validateForm(); }}
                            onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                        {
                            (this.state.formSubmitted || this.state.touched.cpassword) &&
                            <div className="errorMsg">{this.state.errors.cpassword}</div>
                        }

                        <input type="submit" onClick={this.submitForm} className="button" value="Sign Up" />
                    </form>
                    <button onClick={this.getState}> Get state</button>
                </div>
            </div>
        );
    }
}

export default Signup;