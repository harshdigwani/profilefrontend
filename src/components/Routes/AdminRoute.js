import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAdmin } from '../../services/Auth/Auth';

const AdminRoute = ({ component: RouteComponent, ...rest }) => {
    const currentUser = isAdmin();

    return (
        <Route {...rest} render={
            routeProps =>
                !!currentUser ? <RouteComponent {...routeProps} /> : <Redirect to={"/signin"} />}>

        </Route>)
}

export default AdminRoute;