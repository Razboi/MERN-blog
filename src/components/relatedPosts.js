import React from "react";
import { Container, Header, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const RelatedStyle = styled.div`
background: #fff;
border: 1px solid #D3D3D3;
padding: 10px;
overflow-x: scroll;
white-space: nowrap;
`;

const RelatedPostStyle = styled.div`
display: inline-block;
margin: 0px 10px;
`;

const RelatedHeaderStyle = styled.div`
font-size: 17.5px;
overflow: hidden;
white-space: normal;
height: 55px;
font-weight: bold;
`;

const RelatedTitleStyle = styled.div`
margin-top: 50px;
text-align: center;
padding: 7px 0px 2px 0px;
background: #005b96;
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
				<Container>
					<RelatedTitleStyle>
						<Header
							style={{
								fontFamily: "Roboto Condensed, sans-serif", fontSize: "24px"
							}}
						>
							Related Posts
						</Header>
					</RelatedTitleStyle>
				</Container>

				<Container>
					<RelatedStyle>
						{this.props.relatedPosts.map( (post, index ) =>

							<RelatedPostStyle key={post._id}>
								<Card>
									<Link to={`/post/${post.slug}`}>
										<Image
											style={{
												height: "163.13px",
												width: "290px"
											}}
											src={require(
												"../public/uploads/" + post.image
											)}
											alt="Related post"
										/>
									</Link>
									<Card.Content>
										<RelatedHeaderStyle>
											<Card.Header>
												<Link
													to={`/post/${post.slug}`}
													style={{
														fontFamily: "Roboto, sans-serif"
													}}
												>
													{post.title}
												</Link>
											</Card.Header>
										</RelatedHeaderStyle>
									</Card.Content>
								</Card>
							</RelatedPostStyle>
						)}
					</RelatedStyle>
				</Container>
			</div>
		);
	}
}

export default RelatedPosts;
