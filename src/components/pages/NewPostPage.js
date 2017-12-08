import React from "react";
import { Form } from "semantic-ui-react";
import axios from "axios";
import HeaderComponent from "../header";

const styles = {
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

class NewPostPage extends React.Component {
	constructor() {
		super();
		this.state = {
			title: "",
			introduction: "",
			content: "",
			image: []
		};
	}

	onChange = (e) => {
		const state = this.state;
		state[ e.target.name ] = e.target.value;
		this.setState( state );
	};

	onSubmit = (e) => {
		e.preventDefault();
		var formData = new FormData( document.getElementById("postForm") );
		axios.post("/api/posts", formData ).then( ( response ) => {
			console.log( response );
		}).catch( err => console.log( err ) );
	};

	render() {
		const { title, content, image, introduction } = this.state;
		return (
			<div>
				<HeaderComponent image="images/code-wallpaper01.jpg" />
				<Form
					id="postForm"
					encType="multipart/form-data"
					style={ styles.form }
					onSubmit={this.onSubmit}
				>
					<div>
						<Form.Input
							label=""
							placeholder="Title"
							name="title"
							value={title}
							onChange={this.onChange}
							style={ styles.inputs }
						/>
					</div>
					<div>
						<Form.TextArea
							label=""
							placeholder="Introduction"
							name="introduction"
							value={introduction}
							onChange={this.onChange}
							style={ styles.inputs }
						/>
					</div>
					<div>
						<Form.TextArea
							label=""
							placeholder="Content"
							name="content"
							value={content}
							onChange={this.onChange}
							style={ styles.inputs }
						/>
					</div>
					<div>
						<input
							type="file"
							name="image"
							value={image}
							onChange={this.onChange}
							style={ styles.inputs }
						/>
					</div>
					<Form.Button>Done</Form.Button>
				</Form>

			</div>
		);
	}
}

export default NewPostPage;
