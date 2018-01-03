import React from "react";
import axios from "axios";
import { Button, Container, Header } from "semantic-ui-react";
import HeaderComponent from "../header";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const styles = {
	wrapper: {
		fontSize: "18px",
		textAlign: "justify",
		"background": "transparent",
		position: "relative",
		top: "0px",
		paddingBottom: "70px"
	},
	container: {
		padding: "70px 100px",
		width: "50em",
		"background": "#fff",
		borderRadius: "0px",
		border: "1px solid #D3D3D3"
	},
	content: {
		marginTop: "70px"
	},
	title: {
		fontSize: "32px",
		textAlign: "center",
		color: "#23769b"
	},
	related: {
		background: "#fff",
		border: "1px solid #D3D3D3",
		padding: "10px",
		marginTop: "50px"
	},
	relatedImages: {
		height: "280px",
		width: "380px"
	}
};

class PostDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			postInfo: {},
			relatedImage: ""
		};
	}

	getRelated = () => {
		var categories = this.state.postInfo.categories;
		axios.get( `/api/category/${categories}/1` )
		.then( ( response ) => {
			this.setState({ relatedImage: response.data[ 0 ].image });
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

	render() {
		return (
			<div>
				{/* if there is no image state, pass a loader image to the header */}
				{ this.state.postInfo.image ?
					<HeaderComponent
						postDetails={true}
						image={`uploads/${this.state.postInfo.image}`}
					/>
				: <HeaderComponent postDetails={true} image="images/loader-image.png" />
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
					<Container style={ styles.related }>
						{this.state.relatedImage &&
							<img
								style={ styles.relatedImages }
								src={require("../../public/uploads/" + this.state.relatedImage )}
								alt="Related post"
							/>
						}
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
