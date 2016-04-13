import React from "react";
import ReactDom from "react-dom";
import WeiboList from "./WeiboList";
import request from "superagent";
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			message: "",
			submitProcessing: false,
			userInfo:[],
		};
		this.oauthWindow = null;
	}
	getChildContext() {
		return this.state.userInfo;
	}
	componentWillMount() {
		this.getAccountInfo();
	}
	checkClosed() {
		let q = new Promise((resolve, reject) => {
			this.timer = null;

			this.timer = setInterval(()=> {
				if (this.oauthWindow != null &&
					this.oauthWindow.location.origin == window.location.origin) {
					let params = this.oauthWindow.location.search;
					let index = params.indexOf("code=") + 5;
					this.accessToken = params.slice(index);
					this.timer = null;
					this.oauthWindow.close();
					this.oauthWindow = null	;

					resolve(this.accessToken);
				} else if (this.oauthWindow == null || this.oauthWindow.closed) {
					this.timer = null;
					this.oauthWindow = null;
					reject("authorization failed");
				}

			}, 500);
		});
		return q;

	}
	openAuthWindow(url) {
		if (this.oauthWindow == null || this.oauthWindow.closed) {

			this.oauthWindow = window.open(url, "Weibo OAuth", "height=600,width=800,resizable,scrollbars");
		} else {
			this.oauthWindow.focus();
		}
		return this.checkClosed();

	}
	getAccountInfo() {
		request
			.get("/api/weibo/get_account_info")
			.end((err, res) => {
				if (err) {
					console.error(err);
				} else {
					let info = JSON.parse(res.text);
					this.setState({userInfo: info});
				}
			})
	}
	loginWeibo(e) {
		this.setState({message:"Waiting...",submitProcessing:true});
		const URL = window.location.href;
		const API = "https://api.weibo.com/oauth2/authorize?client_id=599453243&response_type=code&redirect_uri=" + URL ;
		this.openAuthWindow(API)
			.then((token) => {
				let params = request
							.post("/api/weibo/auth")
							.send({code: token})
							.end((err, res) => {
								if (err) {
									console.error(err);
								} else {
									this.setState({message: "Success", submitProcessing:false});
									this.getAccountInfo();
								}
							});

			})
			.catch((msg) => this.setState({message:msg, submitProcessing:false}));
	}
	render() {
		const {id, message, pw, submitProcessing, userInfo} = this.state;
		return (
			<div className="container text-center">
				<WeiboList userInfo={userInfo}/>
				<hr/>
				<p>{message}</p>
				<button onClick={this.loginWeibo.bind(this)} className="btn btn-primary">登入微博号</button>
			</div>
		);
	}
}

App.childContextTypes = {
	userInfo: React.PropTypes.Array,
}

ReactDom.render(<App/>, document.getElementById("app"));
