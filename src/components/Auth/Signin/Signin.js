import React, { Component } from 'react';
import { validateForm } from '../../../utils/SigninFormValidation';
import { signin } from '../../../services/Auth/Auth';
import Base from '../../Base/Base';
import Spinner from '../../Core/Spinner';
import './Signin.css';

class Signin extends Component {

    getInitialState = () => {
        return {
            email: "",
            password: "",
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
        let { email, password } = this.state;
        const { errors, isFormValid } = validateForm({
            email,
            password
        });

        this.setState({
            errors,
            isFormValid
        })
    }

    submitForm = async (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        if (this.state.isFormValid) {
            this.setState(this.getInitialState());
            const { email, password } = this.state;
            const user = await signin({ email, password });
            this.setState({ loading: false })
            alert(user.message);
            console.log(user);
        }
    }

    render() {
        return (
            <Base>
                {this.state.loading && <Spinner />}
                < div className="container col  justify-center align-center" >
                    <h3 className="display-1">Welcome Back!</h3>
                    {/* <h3>Login Here</h3> */}
                    <form name="signinForm" className="flex-col login-form">
                        <label>Email Id</label>
                        <input type="text" name="email" value={this.state.email} required
                            onChange={(e) => { this.handleChange(e); this.validateForm(); }}
                            onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                        {
                            (this.state.formSubmitted || this.state.touched.email) &&
                            <div className="error-msg">{this.state.errors.email}</div>
                        }

                        <label>Password</label>
                        <input type="password" name="password" value={this.state.password} required
                            onChange={(e) => { this.handleChange(e); this.validateForm(); }}
                            onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                        {
                            (this.state.formSubmitted || this.state.touched.password) &&
                            <div className="error-msg">{this.state.errors.password}</div>
                        }

                        <button onClick={this.submitForm} >Log In</button>
                    </form>
                </div>
            </Base>
        );
    }
}

export default Signin;