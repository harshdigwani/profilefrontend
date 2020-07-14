import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAutheticated } from '../../services/Auth/Auth';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const currentUser = isAutheticated();

    return (
        <Route {...rest} render={
            routeProps =>
                !!currentUser ? <RouteComponent {...routeProps} /> : <Redirect to={"/signin"} />}>

        </Route>)
}

export default PrivateRoute;