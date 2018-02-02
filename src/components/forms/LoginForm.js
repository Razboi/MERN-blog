import React from "react";
import { Form, Message } from "semantic-ui-react";
import HeaderComponent from "../header";
import PropTypes from "prop-types";

const styles = {
	form: {
		padding: "35px",
		textAlign: "center",
		width: "900px",
		display: "block",
		margin: "40px auto",
		borderRadius: "5px"
	},
	formInput: {
		width: "250px",
		textAlign: "center"
	},
	formButton: {
		marginTop: "20px"
	},
	errorWarning: {
		textAlign: "left"
	}
};

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
				<Form
					error={errors || blankError}
					loading={loading}
					id="loginForm"
					style={styles.form}
					encType="multipart/form-data"
					onSubmit={this.onSubmit}
				>
					{ blankError ?
						<Message
							style={styles.errorWarning}
							error
							header="Fields can't be blank"
							content="All fields are required."
						/>
					:
					<Message
						style={styles.errorWarning}
						error
						header="Invalid credentials"
						content="Please check that your credentials are correct and try again."
					/>
					}

					<h2>Login Form</h2>
					<div>
						<Form.Input
							style={styles.formInput}
							label=""
							placeholder="Username"
							name="username"
							value={data.username}
							onChange={this.onChange}
						/>
					</div>
					<div>
						<Form.Input
							type="password"
							style={styles.formInput}
							label=""
							placeholder="Password"
							name="password"
							value={data.password}
							onChange={this.onChange}
						/>
					</div>
					<Form.Button primary style={styles.formButton}>Login</Form.Button>
				</Form>
				</div>
		);
	}
}

LoginForm.propTypes = {
	submit: PropTypes.func.isRequired
};

export default LoginForm;
