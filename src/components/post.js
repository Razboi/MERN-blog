import React from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";

const styles = {
	post: {
		flex: "0 1 33%",
		"margin": "20px 15px",
		"backgroundColor": "#D3D3D3"
	}
};

/* for mantaining state you need a class that extends the React.Component.
on this class the props requires this. because props its no longer being passed,
so the only way to access it is as a property of the Post object. */
class Post extends React.Component {
	render() {
		return (
			<Card style={ styles.post }>
				<Link to={`/post/${this.props.slug}`}>
					<Image src={require("../public/uploads/" + this.props.image )} />
					<Card.Content>
						<Card.Header>
							<h2>{ this.props.title }</h2>
						</Card.Header>
						<Card.Description>
							{this.props.content}
						</Card.Description>
					</Card.Content>
				</Link>
			</Card>
		);
	}
}

export default Post;
