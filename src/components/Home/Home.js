import React from 'react';
import Base from '../Base/Base';
import './Home.css';

const Home = () => {
    return (
        <Base>
            <div>
                <div className="home-container">
                    <img className="img-1" src='../../../../images/versionControl.svg' alt="git" />
                    <div className="top-section">
                        <h1>Get More Insights with Gitplus</h1>
                        <ul>
                            <li><span className="fa fa-check font-green fa-lg" /> Post your Blogs and let users Learn from it...</li>
                            <li><span className="fa fa-check font-green fa-lg" /> Make your cool projects public...</li>
                            <li><span className="fa fa-check font-green fa-lg" /> Connect With like mided People...</li>
                            <li><span className="fa fa-check font-green fa-lg" /> New look for User Profile</li>
                        </ul>
                    </div>
                </div>
                <div className="home-container">
                    <h2>TechStack Used</h2>
                    <div className="tech-stack">
                        <div className="tech"> <img src='../../../../images/undraw_about_me_wa29.svg' alt="react.js" />
                            <h5>Profiles</h5>
                        </div>
                        <div className="tech"> <img src='../../../../images/undraw_Browsing_online_re_umsa.svg' alt="css" />
                            <h5>Projects</h5>
                        </div>
                        <div className="tech"> <img src='../../../../images/undraw_publish_post_vowb.svg' alt="api" />
                            <h5>Blogs</h5>
                        </div>
                        <div className="tech"> <img src='../../../../images/undraw_online_reading_np7n.svg' alt="api" />
                            <h5>Content</h5>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default Home