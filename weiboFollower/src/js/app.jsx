import React from "react";
import ReactDom from "react-dom";
import WeiboList from "./WeiboList";
import request from "superagent";
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			id: "",
			pw: "",
			submitProcessing: false,
		};
	}
	idOnChange(e) {
		this.setState({id: e.target.value});
	}
	pwOnChange(e) {
		this.setState({pw: e.target.value});
	}
	submit(e) {
		const {id, pw} = this.state;
		this.setState({submitProcessing: true});
		let that = this;
		request
			.post("/api/weibo_login")
			.send({id:id, pw: pw})
			.end((err, res) => {
				if (err || !res.ok) {

				} else {

				}
			});
	}
	render() {
		const {id, pw, submitProcessing} = this.state;
		return (
			<div className="container text-center">
				<WeiboList/>
				<p className="bg-info">輸入微博号</p>
				<form className="form-inline">
					<div className="form-group">
						ID:
						<input className="form-control" value={id} onChange={this.idOnChange}/>
					</div>
					<div className="form-group">
						Password
						<input className="form-control" value={pw} onChange={this.pwOnChange}/>
					</div>
					{
						submitProcessing ? 
							<i className="fa fa-spin fa-spinner"></i>:
							<button onClick={this.submit} className="btn btn-primary">Login</button>
					}	
				</form>
			</div>
		);
	}
}

ReactDom.render(<App/>, document.getElementById("app"));
