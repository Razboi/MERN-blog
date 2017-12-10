import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Grid } from "semantic-ui-react";

const styles = {
	evenPost: {
		flex: "0 1 33%",
		"margin": "20px 15px",
		"backgroundColor": "#fff"
	},
	oddPost: {
		flex: "0 1 33%",
		"margin": "20px 15px",
		"backgroundColor": "red"
	},
	content: {
		"padding": "15px"
	},
	description: {
		"marginTop": "10px"
	},
	wrapper: {
		padding: "0px",
		margin: "0px"
	}
};

/* for mantaining state you need a class that extends the React.Component.
on this class the props requires this. because props its no longer being passed,
so the only way to access it is as a property of the Post object. */
class Post extends React.Component {
	isOdd(n) {
		if ( ( n ) % 3 === 0 ) {
			return true;
		}
		return false;
	};
	render() {
		return (
		<div style={styles.wrapper}>
			{ this.isOdd( this.props.index ) ?
				<Grid style={ styles.oddPost }>
					<Grid.Column width={6}>
						<h2>{ this.props.title }</h2>
						{this.props.introduction}
					</Grid.Column>
					<Grid.Column width={4}>
						<Image src={require("../public/uploads/" + this.props.image )} />
					</Grid.Column>
				</Grid>
			:
			<Card style={ styles.evenPost }>
				<Link to={`/post/${this.props.slug}`}>
					<Image src={require("../public/uploads/" + this.props.image )} />
					<Card.Content style={ styles.content }>
						<Card.Header>
							<h2>{ this.props.title }</h2>
						</Card.Header>
						<Card.Description style={ styles.description }>
							{this.props.introduction}
						</Card.Description>
					</Card.Content>
				</Link>
			</Card>
			}

		</div>
		);
	}
}

export default Post;
