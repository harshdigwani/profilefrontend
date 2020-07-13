import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "./Header.css";
import { signout, isAutheticated } from '../../services/Auth/Auth';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navbar: true
        };
    }

    render() {
        let { navbar } = this.state;

        return (
            <header className="navbar" >
                <span className="brand">
                    {/* <img className="logo" src="../../../images/logo.png" alt="logo" /> */}
                    &nbsp;Profile - create and share!
                    <button className="nav-menu fa fa-chevron-down" onClick={() => this.setState((prevState) => ({ navbar: !prevState.navbar }))} />
                </span>

                <span className={navbar ? "navbar hidden" : "navbar"}>

                    <span><NavLink className="nav-link" activeClassName="active-nav-link" to="/">Home</NavLink></span >

                    <span><NavLink className="nav-link" activeClassName="active-nav-link" to="/blogs">Blogs</NavLink></span>

                    <span><NavLink className="nav-link" activeClassName="active-nav-link" to="/projects">Projects</NavLink></span >

                    <span><NavLink className="nav-link" activeClassName="active-nav-link" to="/profiles">Profiles</NavLink></span >

                    {!isAutheticated() && <span><NavLink className="nav-link" activeClassName="active-nav-link" to="/signin">Login</NavLink></span>}

                    {!isAutheticated() && <span><NavLink className="nav-link" activeClassName="active-nav-link" to="/signup">Signup</NavLink></span>}

                    {isAutheticated() && <span className="nav-link header-signout"
                        onClick={() => {
                            if (!window.confirm("Do you want to logout")) return;
                            window.location.reload();
                            signout();
                        }} >Logout</span>}
                </span>
            </header >
        )
    }
}
export default Header