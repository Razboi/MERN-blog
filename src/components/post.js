import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Grid } from "semantic-ui-react";
import Radium from "radium";
import styled from "styled-components";

const ImageWrapper = styled.div`
	overflow: hidden;
	height: 296px;
	width: 100%;
	@media (max-width: 768px) {
		height: auto;
	}
`;

const styles = {
	evenPost: {
		"flex": "1 1 40%",
		"margin": "20px 15px",
		"@media screen and (max-width: 1200px)": {
			"flex": "1 1 100%"
		},
		"@media screen and (min-width: 768px) and (max-width: 900px)": {
			"padding": "0px 70px"
		},
		"@media screen and (min-width: 900px) and (max-width: 1200px)": {
			"padding": "0px 150px"
		}
	},
	oddPost: {
		flex: "1 1 100%",
		backgroundColor: "#fff",
		padding: "15px",
		margin: "20px 15px",
		border: "1px solid #D3D3D3"
	},
	content: {
		padding: "15px"
	},
	description: {
		marginTop: "10px",
		fontFamily: "Roboto, sans-serif",
		color: "#383838",
		fontSize: "15.5px"
	},
	oddDescription: {
		marginTop: "40px",
		fontFamily: "Roboto, sans-serif",
		color: "#383838",
		fontSize: "15.5px"
	},
	card: {
		width: "100%",
		height: "100%"
	},
	image: {
		transition: "transform 4s ease-out"
	},
	cardImage: {
		transition: "transform 6s ease",
		overflow: "hidden",
		height: "100%",
		width: "100%"
	},
	cardImageContainer: {
		height: "296px",
		width: "100%",
		overflow: "hidden"
	},
	gridImage: {
		overflow: "hidden"
	}
};

/* for mantaining state you need a class that extends the React.Component.
on this class the props requires this. because props its no longer being passed,
so the only way to access it is as a property of the Post object. */
class Post extends React.Component {
	constructor() {
		super();
		this.state = {
			scale: 1,
			gridShadow: null
		};
	}
// used to change style states on hoverIn and hoverOut
	onMouseIn = () => {
		this.setState({
			// if the scale is bigger than one set it to one, else augment it
			scale: 1.3,
			gridShadow: "0px 0px 5px 1px #23769b"
		});
	};

	onMouseOut = () => {
		this.setState({
			// if the scale is bigger than one set it to one, else augment it
			scale: 1,
			gridShadow: null
		});
	};

	render() {
		var post = null;
		var isOdd = false;
		// if the post is a multiple of 3 (or is the first post) set post to a grid element
		// else set the post to a card element
		if ( ( this.props.index ) % 3 === 0 && !this.props.smallDevice ) {
			isOdd = true;
			post = (
					<Grid
						style={{ boxShadow: this.state.gridShadow }}
						onMouseEnter={this.onMouseIn}
						onMouseLeave={this.onMouseOut}
					>

						<Grid.Column width={10}>
							<Link to={`/post/${this.props.slug}`}>
								<h2 style={{ fontFamily: "Roboto Condensed, sans-serif" }}>
									{ this.props.title }
								</h2>
							</Link>
							<p style={ styles.oddDescription }>
								{this.props.introduction}
							</p>

						</Grid.Column>
						<Grid.Column style={ styles.gridImage } width={6}>
							<Link to={`/post/${this.props.slug}`}>
								<Image
									style={{ ...styles.image,
									transform: "scale(" + this.state.scale + ")" }}
									src={require("../public/uploads/" + this.props.image )}
								/>
							</Link>
						</Grid.Column>

					</Grid>
			);
		} else {
			post = (
				<Card style={{ ...styles.card, boxShadow: this.state.gridShadow }}
					onMouseEnter={this.onMouseIn}
					onMouseLeave={this.onMouseOut}>
					<Link to={`/post/${this.props.slug}`}>
						<ImageWrapper>
							<Image
								src={require("../public/uploads/" + this.props.image )}
								style={{ ...styles.cardImage,
								transform: "scale(" + this.state.scale + ")" }}
							/>
						</ImageWrapper>
					</Link>
					<Card.Content style={ styles.content }>
						<Link to={`/post/${this.props.slug}`}>
							<Card.Header>
								<h2 style={{ fontFamily: "Roboto Condensed, sans-serif" }}>
									{ this.props.title }
								</h2>
							</Card.Header>
						</Link>
							<Card.Description style={ styles.description }>
								{this.props.introduction}
							</Card.Description>
						</Card.Content>

				</Card>
			);
		}
		return (
			<article style={ isOdd ? styles.oddPost : styles.evenPost }>
				{ post }
			</article>
		);
	}
}

export default Radium( Post );
