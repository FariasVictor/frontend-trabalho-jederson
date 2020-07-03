import React, { Component } from "react";
import Login from './Login';
import ListExams from './ListPage'
import { Route, Switch, Redirect } from 'react-router-dom'
import isAuthenticated from "./auth";
import OrderForm from './CreateOrder'
import ExamForm from "./CreateExam";
import SingleExam from "./SingleExam";

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
                <PrivateRoute path="/create" exact component={(props) => <OrderForm {...props} />} />
                <PrivateRoute path="/createExam/:id" exact component={(props) => <ExamForm {...props} />} />
                <PrivateRoute path="/exam/:id" exact component={(props) => <SingleExam {...props} />} />
            </Switch>
        )
    }

}

export default Routes;