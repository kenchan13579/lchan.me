import React from "react";
import {isLoggedIn} from "../utils/authenticate";

class Login extends React.Component {
    componentWillMount() {
        if (isLoggedIn()) {
            this.context.replace("/");
        }
    }

    render() {
        return (
            <div className="container">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label for="id">ID:</label>
                        <input id="id" type="text"/>
                    </div>
                    <div className="form-group">
                        <label for="pw">Password:</label>
                        <input type="password" id="pw"/>
                    </div>
                </form>
            </div> 
        );
    }
}
Login.contextTypes = {
    "router": React.PropTypes.object,
};


export default Login;
