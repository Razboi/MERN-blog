import React from "react";
import axios from "axios";
import { Form } from "semantic-ui-react";
import styled from "styled-components";

const StyledForm = styled( Form )`
text-align: center;
padding-top: 80px;
`;

const StyledInput = styled.div`
width: 50%;
text-align: left;
margin-bottom: 20px;
margin: 20px auto;
@media (max-width: 900px) {
	width: 100%;
	padding: 0px 5px;
}
`;

class UpdateForm extends React.Component {
// send the data to the update route
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
			<div>
				<StyledForm
					id="updateForm"
					encType="multipart/form-data"
					onSubmit={this.onSubmit}
				>
					<StyledInput>
						<Form.Input
							label=""
							placeholder="Title"
							name="title"
							value={this.props.postInfo.title}
							onChange={this.props.onChange}
						/>
					</StyledInput>
					<StyledInput>
						<Form.Input
							label=""
							placeholder="Categories"
							name="categories"
							value={this.props.postInfo.categories}
							onChange={this.props.onChange}
						/>
					</StyledInput>
					<StyledInput>
						<Form.Input
							label=""
							placeholder="Search keywords separated by commas"
							name="keywords"
							value={this.props.postInfo.keywords}
							onChange={this.props.onChange}
						/>
					</StyledInput>
					<StyledInput>
						<Form.TextArea
							label=""
							placeholder="Introduction"
							name="introduction"
							value={this.props.postInfo.introduction}
							onChange={this.props.onChange}
						/>
					</StyledInput>
					<StyledInput>
						<Form.TextArea
							label=""
							placeholder="Content"
							name="content"
							value={this.props.postInfo.content}
							onChange={this.props.onChange}
						/>
					</StyledInput>
					<StyledInput>
						<input
							type="file"
							label=""
							name="updatedImage"
							onChange={this.props.onChange}
						/>
					</StyledInput>
					<Form.Button primary>Update</Form.Button>
				</StyledForm>
			</div>
		);
	}
}

export default UpdateForm;
