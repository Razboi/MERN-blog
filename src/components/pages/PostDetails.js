import React from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";

class PostDetails extends React.Component {
	state = { postInfo: {} };
	componentDidMount() {
		axios.get("/api/post/" + this.props.match.params.slug ).then( ( response ) => {
			this.setState({ postInfo: response.data });
		}).catch( err => console.log( err ) );

	}
	render() {
		return (
			<div>
				<h1>{this.state.postInfo.title}</h1>
				<p>{this.state.postInfo.content}</p>
				<Button primary>Click me</Button>
			</div>
		);
	}
}

export default PostDetails;
