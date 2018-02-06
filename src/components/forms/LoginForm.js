import React from "react";
import { Form, Message } from "semantic-ui-react";
import HeaderComponent from "../header";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledForm = styled( Form )`
padding: 35px;
text-align: center;
width: 900px;
display: block;
margin: 40px auto;
border-radius: 5px;
`;

const StyledInput = styled.div`
width: 250px;
text-align: center;
margin: 20px auto;
`;

const ErrorMessage = styled( Message )`
	text-align: left
`;

class LoginForm extends React.Component {
	constructor() {
		super();
		this.state = {
			data: {
				username: "",
				password: ""
			},
			loading: false,
			errors: false,
			blankError: false
		};
	}

	onChange = (e) => {
		const state = this.state;
		state[ e.target.name ] = e.target.value;
		this.setState({
			data: { ...this.state.data, [ e.target.name ]: e.target.value }
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		// reset errors every time the form is submitted
		const errors = this.validate();
		// if all fields are fulfilled make the request, else set blankError to true
		if ( !errors ) {
			this.setState({ loading: true });
			this.props
			.submit( this.state.data )
			.catch( err => this.setState({
				errors: true,
				loading: false
			}) );
		}
	};

	validate = () => {
		// reset errors
		this.setState({ errors: false, blankError: false });
		if ( this.state.data.username === "" || this.state.data.password === "" ) {
			this.setState({ blankError: true });
			return true;
		};
	};

	render() {
		const { data, loading, errors, blankError } = this.state;
		return (
			<div>
				<HeaderComponent
					image="images/code-wallpaper01.jpg"
					toggleSidebar={this.props.toggleSidebar}
				/>
				<StyledForm
					error={errors || blankError}
					loading={loading}
					id="loginForm"
					encType="multipart/form-data"
					onSubmit={this.onSubmit}
				>
					{ blankError ?
						<ErrorMessage
							error
							header="Fields can't be blank"
							content="All fields are required."
						/>
					:
					<ErrorMessage
						error
						header="Invalid credentials"
						content="Please check that your credentials are correct and try again."
					/>
					}

					<h2>Login Form</h2>
					<StyledInput>
						<Form.Input
							label=""
							placeholder="Username"
							name="username"
							value={data.username}
							onChange={this.onChange}
						/>
					</StyledInput>
					<StyledInput>
						<Form.Input
							type="password"
							label=""
							placeholder="Password"
							name="password"
							value={data.password}
							onChange={this.onChange}
						/>
					</StyledInput>
					<Form.Button primary>Login</Form.Button>
				</StyledForm>
				</div>
		);
	}
}

LoginForm.propTypes = {
	submit: PropTypes.func.isRequired
};

export default LoginForm;
