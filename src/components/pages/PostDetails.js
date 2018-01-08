import React from "react";
import axios from "axios";
import { Button, Container, Header, Card, Image } from "semantic-ui-react";
import HeaderComponent from "../header";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const styles = {
	wrapper: {
		fontSize: "18px",
		textAlign: "justify",
		"background": "#f4f2f0",
		position: "relative",
		top: "0px",
		paddingBottom: "70px",
		paddingTop: "30px"
	},
	container: {
		padding: "80px 100px",
		width: "43em",
		"background": "#f9f8f7",
		borderRadius: "0px",
		fontFamily: "Roboto, sans-serif",
		fontSize: "21px",
		boxShadow: "0px 0px 40px 2px #D3D3D3"
	},
	content: {
		marginTop: "60px",
		lineHeighy: "33px"
	},
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
		padding: "5px",
		background: "#005b96"
	}
};

class PostDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			postInfo: {},
			relatedPosts: [],
			navbarLock: false
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
		if ( window.scrollY >= 453 ) {
			this.setState({ navbarLock: true });
		} else if ( window.scrollY < 453 ) {
			this.setState({ navbarLock: false });
		}
	}


	render() {
		return (
			<div>
				{/* if there is no image state, pass a loader image to the header */}
				{ this.state.postInfo.image ?
					<HeaderComponent
						postDetails={true}
						image={`uploads/${this.state.postInfo.image}`}
						lock={this.state.navbarLock}
					/>
				: <HeaderComponent
					postDetails={true}
					image="images/loader-image.png"
					lock={this.state.navbarLock}
					/>
				}

				<div style={ styles.wrapper }>
					<Container style={ styles.container }>
						<Header style={ styles.title }>{this.state.postInfo.title}</Header>
						<p
							dangerouslySetInnerHTML={{ __html: this.state.postInfo.content }}
							style={ styles.content }
						/>
						{ this.props.isAuthenticated &&
							<Link to={`/update-post/${this.props.match.params.slug}`}>
								<Button primary>Update</Button>
							</Link>
						}
					</Container>
					<Container style={ styles.relatedTitle }>
						<Header>Related Posts</Header>
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
										<Link to={`/post/${post.slug}`}>
											{post.title}
										</Link>
									</Card.Header>
								</Card.Content>
							</Card>
						)}

					</Container>
				</div>


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
