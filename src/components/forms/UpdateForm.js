import React from "react";
import axios from "axios";
import { Form } from "semantic-ui-react";

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

class UpdateForm extends React.Component {

	onSubmit = (e) => {
		e.preventDefault();
		var updatePath = "/api/post/" + this.props.postInfo._id;
		// to upload an image with multer its important to pass a formData
		var formData = new FormData( document.getElementById("updateForm") );
		axios.put( updatePath, formData ).then( ( response ) => {
			console.log("updated", response );
		}).catch( err => console.log( err ) );
	};

	render() {
		return (
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
							value={this.props.postInfo.title}
							onChange={this.props.onChange}
							style={ styles.inputs }
						/>
					</div>
					<div>
						<Form.Input
							label=""
							placeholder="Categories"
							name="categories"
							value={this.props.postInfo.categories}
							onChange={this.props.onChange}
							style={ styles.inputs }
						/>
					</div>
					<div>
						<Form.Input
							label=""
							placeholder="Search keywords separated by commas"
							name="keywords"
							value={this.props.postInfo.keywords}
							onChange={this.props.onChange}
							style={ styles.inputs }
						/>
					</div>
					<div>
						<Form.TextArea
							label=""
							placeholder="Introduction"
							name="introduction"
							value={this.props.postInfo.introduction}
							onChange={this.props.onChange}
							style={ styles.inputs }
						/>
					</div>
					<div>
						<Form.TextArea
							label=""
							placeholder="Content"
							name="content"
							value={this.props.postInfo.content}
							onChange={this.props.onChange}
							style={ styles.inputs }
						/>
					</div>
					<div>
						<input
							type="file"
							label=""
							name="updatedImage"
							onChange={this.props.onChange}
							style={ styles.inputs }
						/>
					</div>
					<Form.Button primary>Update</Form.Button>
				</Form>
		);
	}
}

export default UpdateForm;
