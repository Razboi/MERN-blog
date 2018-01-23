import React from "react";
import axios from "axios";
import { Button, Container, Header } from "semantic-ui-react";
import HeaderComponent from "../header";
import UpdateForm from "../forms/UpdateForm";

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
		lineHeighy: "33px",
		overflow: "hidden"
	},
	title: {
		fontSize: "37px",
		textAlign: "center",
		color: "#005b96",
		fontFamily: "Roboto Condensed, sans-serif"
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
				updatedImage: [],
				created: "",
				author: "",
				categories: [],
				keywords: []
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
			console.log( response );
		}).catch( err => console.log( err ) );
	};

	onChange = (e) => {
		const state = this.state.postInfo;
		state[ e.target.name ] = e.target.value;
		this.setState( state );
	};

	render() {
		return (
			<div>
				{/* if there is no image state, pass a loader image to the header */}
				{ this.state.postInfo.image ?
					<HeaderComponent image={`uploads/${this.state.postInfo.image}`} />
				: <HeaderComponent image="images/loader-image.png" />
				}

				<div style={ styles.wrapper }>
					<Container style={ styles.container }>
						<span>
							{this.state.postInfo.author} {this.state.postInfo.created}
						</span>

						<Header style={ styles.title }>{this.state.postInfo.title}</Header>
						<p
							dangerouslySetInnerHTML={{ __html: this.state.postInfo.content }}
							style={ styles.content }
						/>
						<Button color="red" onClick={this.onDelete}>Delete me</Button>
					</Container>

					<UpdateForm onChange={this.onChange} postInfo={this.state.postInfo}/>
						</div>
			</div>
		);
	}
}

export default PostDetails;
