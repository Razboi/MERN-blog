import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Grid } from "semantic-ui-react";
import styled from "styled-components";

const ImageWrapper = styled.div`
	overflow: hidden;
	height: 296px;
	width: 100%;
	@media (max-width: 768px) {
		height: auto;
	}
`;

const EvenPostWrapper = styled.div`
flex: 1 1 40%;
margin: 20px 15px;
@media (max-width: 1200px) {
	flex: 1 1 100%;
};
@media (min-width: 768px) and (max-width: 900px) {
	padding: 0px 70px;
};
@media (min-width: 900px) and (max-width: 1200px) {
	padding: 0px 150px;
};
`;

const OddPostWrapper = styled.div`
flex: 1 1 100%;
background-color: #fff;
padding: 15px;
margin: 20px 15px;
border: 1px solid #D3D3D3;
`;

const Description = styled( Card.Description )`
margin-top: 10px;
font-family: Roboto, sans-serif;
color: #383838 !important;
font-size: 15.5px;
`;

const OddDescription = styled.p`
margin-top: 40px;
font-family: Roboto, sans-serif;
color: #383838;
font-size: 15.5px;
`;

const CardImage = styled( Image )`
transition: transform 6s ease;
overflow: hidden;
height: 100%;
width: 100%;
`;

const CardPost = styled( Card )`
width: 100% !important;
height: 100%;
:hover {
	box-shadow: 0px 0px 5px 1px #23769b !important;
};
:hover ${CardImage} {
	transform: scale(1.3);
}
`;

const OddPostImage = styled( Image )`
	transition: transform 4s ease-out;
	transform: scale(1);
`;

const OddImageWrapper = styled( Grid.Column )`
	overflow: hidden;
`;

const EvenPost = styled( Grid )`
:hover {
	box-shadow: 0px 0px 5px 1px #23769b !important;
};
:hover ${OddPostImage} {
	transform: scale(1.3);
}
`;

/* for mantaining state you need a class that extends the React.Component.
on this class the props requires this. because props its no longer being passed,
so the only way to access it is as a property of the Post object. */
class Post extends React.Component {
	render() {
		var post = null;
		var isOdd = false;
		// if the post is a multiple of 3 (or is the first post) set post to a grid element
		// else set the post to a card element
		if ( ( this.props.index ) % 3 === 0 && !this.props.smallDevice ) {
			isOdd = true;
			post = (
					<EvenPost>

						<Grid.Column width={10}>
							<Link to={`/post/${this.props.slug}`}>
								<h2 style={{ fontFamily: "Roboto Condensed, sans-serif" }}>
									{ this.props.title }
								</h2>
							</Link>
							<OddDescription>
								{this.props.introduction}
							</OddDescription>

						</Grid.Column>
						<OddImageWrapper width={6}>
							<Link to={`/post/${this.props.slug}`}>
								<OddPostImage
									src={require("../public/uploads/" + this.props.image )}
								/>
							</Link>
						</OddImageWrapper>

					</EvenPost>
			);
		} else {
			post = (
				<CardPost>
					<Link to={`/post/${this.props.slug}`}>
						<ImageWrapper>
							<CardImage
								id="CardImage"
								src={require("../public/uploads/" + this.props.image )}
							/>
						</ImageWrapper>
					</Link>
					<Card.Content>
						<Link to={`/post/${this.props.slug}`}>
							<Card.Header>
								<h2 style={{ fontFamily: "Roboto Condensed, sans-serif" }}>
									{ this.props.title }
								</h2>
							</Card.Header>
						</Link>
						<Description>
							{this.props.introduction}
						</Description>
					</Card.Content>

				</CardPost>
			);
		}

		if ( isOdd ) {
			return (<OddPostWrapper>{ post }</OddPostWrapper>);
		}
			return (<EvenPostWrapper>{ post }</EvenPostWrapper>);
	}
}

export default Post;
