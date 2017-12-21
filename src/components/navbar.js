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
		"bottom": "0px",
		"width": "100%"
	},
	rightMenu: {
		"float": "right",
		"top": "0px"
	},
	buttons: {
		"padding": "0px"
	}
};


class NavBar extends React.Component {

	render() {
		return (
			<nav style={styles.navbar}>
				{this.props.isAuthenticated &&
					<div style={styles.rightMenu}>
						<Link to="/new-post">
							<Icon name="write square" size="large" />
						</Link>

						<Icon onClick={this.props.logout} name="sign out" size="large" />
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
