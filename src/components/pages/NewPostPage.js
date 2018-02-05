import React from "react";
import { Form } from "semantic-ui-react";
import axios from "axios";
import HeaderComponent from "../header";
import SideBar from "../sidebar";
import styled from "styled-components";

const StyledForm = styled( Form )`
text-align: center;
margin: 80px 0px;
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

class NewPostPage extends React.Component {
	constructor() {
		super();
		this.state = {
			title: "",
			introduction: "",
			content: "",
			image: [],
			categories: "",
			keywords: "",
			sidebar: false
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
		formData.append("username", localStorage.username );
		axios.post("/api/posts", formData ).then( ( response ) => {
			console.log( response );
		}).catch( err => console.log( err ) );
	};

	toggleSidebar = () => {
		this.setState({ sidebar: !this.state.sidebar });
	};

	render() {
		const { title, content, image, introduction, categories, keywords } = this.state;
		return (
			<div>
				{this.state.sidebar &&
					<SideBar/>
				}

				<HeaderComponent
					image="images/code-wallpaper01.jpg"
					toggleSidebar={this.toggleSidebar}
				/>

				<StyledForm
					id="postForm"
					encType="multipart/form-data"
					onSubmit={this.onSubmit}
				>

					<StyledInput>
						<Form.Input
							label=""
							placeholder="Title"
							name="title"
							value={title}
							onChange={this.onChange}
						/>
					</StyledInput>

					<StyledInput>
						<Form.Input
							label=""
							placeholder="Categories"
							name="categories"
							value={categories}
							onChange={this.onChange}
						/>
					</StyledInput>

					<StyledInput>
						<Form.Input
							label=""
							placeholder="Search keywords separated by commas"
							name="keywords"
							value={keywords}
							onChange={this.onChange}
						/>
					</StyledInput>

					<StyledInput>
						<Form.TextArea
							label=""
							placeholder="Introduction"
							name="introduction"
							value={introduction}
							onChange={this.onChange}
						/>
					</StyledInput>

					<StyledInput>
						<Form.TextArea
							label=""
							placeholder="Content"
							name="content"
							value={content}
							onChange={this.onChange}
						/>
					</StyledInput>

					<StyledInput>
						<input
							type="file"
							name="image"
							value={image}
							onChange={this.onChange}
						/>
					</StyledInput>

					<Form.Button primary>Done</Form.Button>
				</StyledForm>
			</div>
		);
	}
}

export default NewPostPage;
