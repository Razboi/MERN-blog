import React from "react";
import { Link } from "react-router-dom";
import {Icon} from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";

const styles = {
	navbar: {
		"backgroundColor": "rgba(0, 0, 0, 0.5)",
		"padding": "10px",
		"overflow": "hidden",
		"position": "absolute",
		bottom: "150px",
		"width": "100%"
	},
	rightMenu: {
		"float": "right",
		"top": "0px"
	},
	buttons: {
		color: "#23769b"
	}
};


class NavBar extends React.Component {

	render() {
		return (
			<nav style={ this.props.details ?
				{ ...styles.navbar, bottom: "150px" }
			:
			{ ...styles.navbar, bottom: "0px" }
			}>
				{this.props.isAuthenticated &&
					<div style={styles.rightMenu}>
						<Link to="/new-post">
							<Icon style={styles.buttons} name="write square" size="large" />
						</Link>

						<Icon
							style={styles.buttons}
							onClick={this.props.logout}
							name="sign out"
							size="large"
						/>
					</div>
				}
			</nav>
		);
	}
}

NavBar.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired
};

function mapStateToProps( state ) {
	return {
		isAuthenticated: !!state.user.token
	};
}

export default connect( mapStateToProps, { logout })( NavBar );
