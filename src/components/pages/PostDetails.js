import React from "react";
import axios from "axios";
import { Button, Container, Header, Card, Image, Icon } from "semantic-ui-react";
import HeaderComponent from "../header";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SideBar from "../sidebar";
import styled from "styled-components";


const ContainerWrapper = styled.div`
padding: 80px 5%;
max-width: 858px;
background: #f9f8f7;
border-radius: 0px;
font-family: Roboto, sans-serif;
box-shadow: 0px 0px 40px 2px #D3D3D3;
margin: 0px auto;
`;

const PostWrapper = styled.div`
text-align: justify;
background: #f4f2f0;
position: relative;
top: 0px;
padding-bottom: 70px;
padding-top: 30px;
`;

const Content = styled.p`
font-size: 21px;
margin-top: 60px;
line-height: 33px;
overflow: hidden;
@media (max-width: 768px) {
	font-size: 18px;
}
`;

const TopButton = styled.span`
position: fixed;
right: 100px;
bottom: 10px;
font-size: 40px;
color: rgba(0, 0, 0, 0.9);
cursor: pointer;
@media (max-width: 900px) {
	right: 0px;
	font-size: 36px;
}
`;

const styles = {
	title: {
		fontSize: "37px",
		textAlign: "center",
		color: "#005b96",
		fontFamily: "Roboto Condensed, sans-serif"
	},
	related: {
		background: "#fff",
		border: "1px solid #D3D3D3",
		padding: "10px",
		overflowX: "scroll",
		whiteSpace: "nowrap"
	},
	relatedPost: {
		display: "inline-block",
		margin: "0px 10px"
	},
	relatedHeader: {
		fontSize: "17.5px",
		overflow: "hidden",
		whiteSpace: "normal",
		height: "55px"
	},
	relatedImage: {
		height: "163.13px",
		width: "290px"
	},
	relatedTitle: {
		marginTop: "50px",
		textAlign: "center",
		padding: "7px 0px 2px 0px",
		background: "#005b96",
		fontFamily: "Roboto Condensed, sans-serif"
	},
	topButton: {
		position: "fixed",
		right: "100px",
		bottom: "10px",
		fontSize: "40px",
		color: "#000",
		cursor: "pointer"
	}
};

class PostDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			postInfo: {},
			relatedPosts: [],
			navbarLock: false,
			sidebar: false
		};
		this.handleScroll = this.handleScroll.bind( this );
	}

	getRelated = () => {
		var categories = this.state.postInfo.categories;
		axios.get( `/api/category/${categories}/1` )
		.then( ( response ) => {
			this.setState({ relatedPosts: response.data });
		}).catch( err => console.log( err ) );
	};

	componentWillMount() {
		axios.get("/api/post/" + this.props.match.params.slug ).then( ( response ) => {
			this.setState({ postInfo: response.data });
		}).catch( err => console.log( err ) );
	}

	componentDidUpdate(prevProps, prevState) {
		if ( prevState.postInfo.categories !== this.state.postInfo.categories ) {
			this.getRelated();
		}
	}

	componentWillReceiveProps(nextProps) {
		if ( nextProps.location.pathname !== this.props.location.pathname ) {
			axios.get("/api/post/" + nextProps.match.params.slug ).then( ( response ) => {
				this.setState({ postInfo: response.data });
			}).catch( err => console.log( err ) );
		}
	}

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll );
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll );
	}

	// if window scroll is greater than the position of the navbar set navbarLock to true
	handleScroll() {
		if ( window.scrollY >= 453 && !this.state.navbarLock ) {
			this.setState({ navbarLock: true });
		} else if ( window.scrollY < 453 && this.state.navbarLock ) {
			this.setState({ navbarLock: false });
		}
	}

	goTop = () => {
		window.scrollTo( 0, 0 );
	};

	toggleSidebar = () => {
		this.setState({ sidebar: !this.state.sidebar });
	};

	render() {
		return (
				<div>
					{this.state.sidebar &&
						<SideBar
							postDetails={true}
						/>
					}
					{/* if there is no image state, pass a loader image to the header */}
					{ this.state.postInfo.image ?
						<HeaderComponent
							postDetails={true}
							image={`uploads/${this.state.postInfo.image}`}
							lock={this.state.navbarLock}
							toggleSidebar={this.toggleSidebar}
						/>
					: <HeaderComponent
						postDetails={true}
						image="images/loader-image.png"
						lock={this.state.navbarLock}
						/>
					}

					<PostWrapper>
						<ContainerWrapper>
							<span>
								{this.state.postInfo.author} {this.state.postInfo.created}
							</span>

							<Header style={ styles.title }>{this.state.postInfo.title}</Header>
							<Content
								dangerouslySetInnerHTML={{ __html: this.state.postInfo.content }}
							/>
							{ this.props.isAuthenticated &&
								<Link to={`/update-post/${this.props.match.params.slug}`}>
									<Button primary>Update</Button>
								</Link>
							}
						</ContainerWrapper>
						<Container style={ styles.relatedTitle }>
							<Header
								style={{
									fontFamily: "Roboto Condensed, sans-serif", fontSize: "24px"
								}}
							>
								Related Posts
							</Header>
						</Container>
						<Container style={ styles.related }>
							{this.state.relatedPosts.map( (post, index ) =>

								<Card key={post._id} style={styles.relatedPost}>
									<Link to={`/post/${post.slug}`}>
										<Image
											style={styles.relatedImage}
											src={require(
												"../../public/uploads/" + post.image
											)}
											alt="Related post"
										/>
									</Link>
									<Card.Content>
										<Card.Header style={ styles.relatedHeader }>
											<Link
												to={`/post/${post.slug}`}
												style={{ fontFamily: "Roboto, sans-serif" }}
											>
												{post.title}
											</Link>
										</Card.Header>
									</Card.Content>
								</Card>
							)}

						</Container>
					</PostWrapper>
					{this.state.navbarLock &&
						<TopButton>
							<Icon
								onClick={this.goTop}
								name="arrow circle up"
							/>
						</TopButton>
					}
				</div>
		);
	}
}

PostDetails.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps ( state ) {
	return {
		isAuthenticated: !!state.user.token
	};
}

export default connect( mapStateToProps )( PostDetails );
