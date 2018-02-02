import React from "react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from  "prop-types";
import LoginForm from "../forms/LoginForm";
import SideBar from "../sidebar";

class LoginPage extends React.Component {
	constructor() {
		super();
		this.state = {
			sidebar: false
		};
	}

	submit = data =>
		this.props.login( data ).then( () => this.props.history.push("/") );

	toggleSidebar = () => {
		this.setState({ sidebar: !this.state.sidebar });
	};

	render() {
		return (
			<div>
				{this.state.sidebar &&
					<SideBar/>
				}
				<LoginForm
					submit={this.submit}
					toggleSidebar={this.toggleSidebar}
				/>
			</div>
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
