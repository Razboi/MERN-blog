import React from "react";
import { Form, Message } from "semantic-ui-react";
import axios from "axios";
import HeaderComponent from "../header";

const styles = {
	form: {
		padding: "35px",
		textAlign: "center",
		width: "50%",
		display: "block",
		margin: "40px auto",
		borderRadius: "5px"
	},
	formInput: {
		width: "40%",
		textAlign: "center"
	},
	formButton: {
		marginTop: "20px"
	},
	errorWarning: {
		textAlign: "left"
	}
};

class LoginPage extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: "",
			loading: false,
			errors: false,
			blankError: false
		};
	}

	onChange = (e) => {
		const state = this.state;
		state[ e.target.name ] = e.target.value;
		this.setState( state );
	};

	onSubmit = (e) => {
		e.preventDefault();
		// reset errors every time the form is submitted
		this.setState({ errors: false, blankError: false });
		// if all fields are fulfilled make the request, else set blankError to true
		if ( this.state.username !== "" && this.state.password !== "" ) {
			this.setState({ loading: true });
			axios.post("/api/auth", this.state ).then( ( response ) => {
				this.setState({ loading: false });
				console.log( response.data );
				this.props.history.push("/");
			}).catch( err => this.setState({
				errors: true,
				loading: false
			}) );
		} else {
			this.setState({ blankError: true });
		}
	};

	render() {
		const { username, password, loading, errors, blankError } = this.state;
		return (
			<div>
				<HeaderComponent image="images/code-wallpaper01.jpg" />
				<Form
					// error={errors}
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
							value={username}
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
							value={password}
							onChange={this.onChange}
						/>
					</div>
					<Form.Button primary style={styles.formButton}>Login</Form.Button>
				</Form>
				</div>
		);
	}

}

export default LoginPage;
