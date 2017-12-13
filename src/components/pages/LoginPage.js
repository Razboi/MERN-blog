import React from "react";
import { Form } from "semantic-ui-react";
import axios from "axios";
import HeaderComponent from "../header";

const styles = {
	form: {
		padding: "35px",
		textAlign: "center",
		width: "50%",
		display: "block",
		margin: "40px auto",
		border: "1px solid #D3D3D3",
		borderRadius: "5px"
	},
	formInput: {
		width: "40%",
		textAlign: "center"
	},
	formButton: {
		marginTop: "20px"
	}
};

class LoginPage extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: ""
		};
	}

	onChange = (e) => {
		const state = this.state;
		state[ e.target.name ] = e.target.value;
		this.setState( state );
	};

	onSubmit = (e) => {
		e.preventDefault();
		axios.post("/api/auth", this.state ).then( ( response ) => {
			console.log( response.data );
		}).catch( err => console.log( err ) );
	};

	render() {
		const { username, password } = this.state;
		return (
			<div>
				<HeaderComponent image="images/code-wallpaper01.jpg" />
				<Form
					id="loginForm"
					style={styles.form}
					encType="multipart/form-data"
					onSubmit={this.onSubmit}
				>
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
