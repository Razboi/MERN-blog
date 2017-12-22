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
		top: "-150px"
	},
	container: {
		padding: "70px 100px",
		width: "50em",
		"background": "#fff",
		borderRadius: "5px"
	},
	content: {
		marginTop: "70px"
	},
	title: {
		fontSize: "32px",
		textAlign: "center",
		color: "#23769b"
	}
};

class PostDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			postInfo: {
				title: "",
				content: "",
				introduction: "",
				image: "",
				updatedImage: []
			}
		};
	}

	componentDidMount() {
		axios.get("/api/post/" + this.props.match.params.slug ).then( ( response ) => {
			this.setState({ postInfo: response.data });
		}).catch( err => console.log( err ) );
	}

	onDelete = (e) => {
		e.preventDefault();
		axios.delete("/api/post/" + this.state.postInfo._id ).then( ( response ) => {
			console.log("deleted", response );
		}).catch( err => console.log( err ) );
	};

	onChange = (e) => {
		const state = this.state.postInfo;
		console.log( e.target.value );
		state[ e.target.name ] = e.target.value;
		this.setState( state );
		console.log( this.state.postInfo );
	};

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
