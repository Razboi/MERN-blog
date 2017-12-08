import React from "react";
import axios from "axios";
import { Button, Form, Container, Header } from "semantic-ui-react";
import IndexHeader from "../indexHeader";

const styles = {
	wrapper: {
		"padding": "70px 0px"
	},
	form: {
		"textAlign": "center",
		"paddingTop": "80px"
	},
	inputs: {
		"width": "50%",
		"textAlign": "left",
		"marginBottom": "20px"
	}
};

class PostDetails extends React.Component {
	state = {
		postInfo: {
			title: "",
			content: "",
			introduction: ""
		}
	};
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
		state[ e.target.name ] = e.target.value;
		this.setState( state );
	};

	onSubmit = (e) => {
		e.preventDefault();
		var updatePath = "/api/post/" + this.state.postInfo._id;
		axios.put( updatePath, this.state.postInfo ).then( ( response ) => {
			console.log("updated", response );
		}).catch( err => console.log( err ) );
	};

	render() {
		return (
			<div>
				<IndexHeader image="code-wallpaper01.jpg" />
				<div style={ styles.wrapper }>
					<Container>
						<Header>{this.state.postInfo.title}</Header>
						<p dangerouslySetInnerHTML={{ __html: this.state.postInfo.content }} />
						<Button primary onClick={this.onDelete}>Delete me</Button>
					</Container>

					<Form
						id="updateForm"
						encType="multipart/form-data"
						style={ styles.form }
						onSubmit={this.onSubmit}
					>
						<div>
							<Form.Input
								label=""
								placeholder="Title"
								name="title"
								value={this.state.postInfo.title}
								onChange={this.onChange}
								style={ styles.inputs }
							/>
						</div>
						<div>
							<Form.TextArea
								label=""
								placeholder="Introduction"
								name="introduction"
								value={this.state.postInfo.introduction}
								onChange={this.onChange}
								style={ styles.inputs }
							/>
						</div>
						<div>
							<Form.TextArea
								label=""
								placeholder="Content"
								name="content"
								value={this.state.postInfo.content}
								onChange={this.onChange}
								style={ styles.inputs }
							/>
						</div>
						<Form.Button>Update</Form.Button>
					</Form>
				</div>
			</div>
		);
	}
}

export default PostDetails;
