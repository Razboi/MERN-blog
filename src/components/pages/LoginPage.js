import React from "react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from  "prop-types";
import LoginForm from "../forms/LoginForm";

class LoginPage extends React.Component {
	constructor() {
		super();
		this.state = {
		};
	}

	submit = data =>
		this.props.login( data ).then( () => this.props.history.push("/") );

	render() {
		return (
			<LoginForm submit={this.submit} />
		);
	}

}

LoginPage.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	login: PropTypes.func.isRequired
};

export default connect( null, { login })( LoginPage );
