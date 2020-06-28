import React, { Component } from "react";
import Login from './Login';
import ListExams from './ListExams'
import { Route, Switch, Redirect } from 'react-router-dom'
import isAuthenticated from "./auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated(props) ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
    )}
    />
)

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Login} />
                <PrivateRoute path="/exam" exact component={(props) => <ListExams {...props} />} />
            </Switch>
        )
    }

}

export default Routes;