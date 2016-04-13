import React from "react";


class WeiboList extends React.Component {
	render() {
        const {userInfo} = this.props;
		return (
			<div>
				<ul className="list-unstyled">
                    {
                        userInfo.map((v,i) => <WeiboAccountInfo info={v} key={i}/>)
                    }
                </ul>
			</div>
		)
	}
}

class WeiboAccountInfo extends React.Component {

    render() {
        const {info} = this.props;

        return (
            <li className="">

                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <a style={{color:"white"}} href={"weibo.com/"+info.profile_url}>{info.screen_name}</a>
                        </div>
                        <div className="panel-body">
                             <div className="col-lg-4">
                                <div className="thumbnail">
                                    <img src={info.avatar_hd} alt="" className="img-responsive"/>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <p>{info.description}</p>
                                <hr/>
                                <CollectFollowerMethods/>

                            </div>
                            <div className="col-lg-4">
                                <p>粉丝<span className="badge">{info.followers_count}</span></p>
                                <p>关注<span className="badge">{info.friends_count}</span></p>
                                <p>微博<span className="badge">{info.statuses_count}</span></p>
                                <p>收藏<span className="badge">{info.favourites_count}</span></p>
                            </div>
                        </div>

                    </div>
            </li>
        );
    }
}

class CollectFollowerMethods extends React.Component {
     constructor() {
        super();
        this.state = {
            method: "UID",
            showInput: false,
        };

    }
    showInput() {
        this.setState((s) => {
            return {
                showInput: !s.showInput,
            }
        });
    }
    render() {
        const {method, showInput} = this.state;
        return (
             <ul className="list-group">
                <li className="list-group-item">
                    <button className="btn btn-success" onClick={this.showInput.bind(this)}>采集粉丝</button>
                    {
                        method == 'uid' &&
                        showInput &&
                        <input type="text" className="form-control" placeholder="Type uid then enter to search"/>
                    }
                </li>
            </ul>
        );
    }
}
export default WeiboList;
