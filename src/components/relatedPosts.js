import React from "react";
import { Container, Header, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const RelatedPostsList = styled( Container )`
background: #fff;
border: 1px solid #D3D3D3;
padding: 10px;
overflow-x: scroll;
white-space: nowrap;
`;

const RelatedPost = styled( Card )`
display: inline-block !important;
margin: 0px 7px !important;
`;

const RelatedPostHeader = styled( Card.Header )`
font-size: 17.5px;
overflow: hidden;
white-space: normal;
height: 55px;
font-weight: bold;
`;

const RelatedTitleStyle = styled( Container )`
margin-top: 50px;
text-align: center;
padding: 7px 0px 2px 0px;
background: #005b96;
`;

const RelatedHeader = styled( Header )`
	font-family: Roboto Condensed, sans-serif !important;
	font-size: 23px !important;
`;

const RelatedImage = styled( Image )`
height: 163.13px;
width: 290px;
`;

const RelatedPostTitle = styled( Link )`
	font-family: Roboto, sans-serif;
	font-size: 18px;
`;

class RelatedPosts extends React.Component {
	constructor() {
	super();
	this.state = {
	};
}
	render() {
		return (
			<div>
				<RelatedTitleStyle>
					<RelatedHeader>Related Posts</RelatedHeader>
				</RelatedTitleStyle>

				<RelatedPostsList>
					{this.props.relatedPosts.map( (post, index ) =>
						<RelatedPost key={post._id}>
							<Link to={`/post/${post.slug}`}>
								<RelatedImage
									src={require(
										"../public/uploads/" + post.image
									)}
									alt="Related post"
								/>
							</Link>

							<Card.Content>
								<RelatedPostHeader>
									<RelatedPostTitle
										to={`/post/${post.slug}`}
									>
										{post.title}
									</RelatedPostTitle>
								</RelatedPostHeader>
							</Card.Content>
						</RelatedPost>
					)}
				</RelatedPostsList>
			</div>
		);
	}
}

export default RelatedPosts;
