import React from 'react';
import App from './App';
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Signup from './components/Auth/Signup/Signup';
import Signin from './components/Auth/Signin/Signin';
import Categories from './components/Category/Categories';
import Blogs from './components/Blog/Blogs';
import CreateBlog from './components/Blog/CreateBlog';
import Blog from './components/Blog/Blog';
import Projects from './components/Project/Projects';
import CreateProject from './components/Project/CreateProject';
import Project from './components/Project/Project';
import Profiles from './components/Profile/Profiles';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';
import AdminRoute from './components/Routes/AdminRoute';
import PrivateRoute from './components/Routes/PrivateRoute';

const history = createBrowserHistory();

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={App} />

        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />

        <AdminRoute exact path="/categories" component={Categories} />

        <Route exact path="/blogs" component={Blogs} />
        <PrivateRoute exact path="/createblog" component={CreateBlog} />
        <Route exact path="/blog/:id" component={Blog} />

        <Route exact path="/projects" component={Projects} />
        <PrivateRoute exact path="/createproject" component={CreateProject} />
        <Route exact path="/project/:id" component={Project} />

        <Route exact path="/profiles" component={Profiles} />
        <PrivateRoute exact path="/updateProfile" component={UpdateProfile} />
        <Route exact path="/profile/:id" component={Profile} />
      </Switch>
    </Router>
  )
}

export default Routes