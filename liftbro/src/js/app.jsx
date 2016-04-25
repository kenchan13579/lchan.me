import React from "react";
import {render} from "react-dom";
import {Router, Route, Link, hashHistory} from "react-router";
import {isLoggedIn} from "./utils/authenticate.js";

import Login from "./components/Login.jsx";

class App extends React.Component {
    componentDidMount() {
        if (!isLoggedIn()) {
            this.context.router.replace("/login");
        }
    }


    render() {
        return (
            <div>Test</div>
        );
    }
}
App.contextTypes = {
    "router": React.PropTypes.object,
};
render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup"/>
    </Router>
    ), document.getElementById("app"));


