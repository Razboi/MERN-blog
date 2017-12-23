import React from "react";
import { Link } from "react-router-dom";
import {Icon} from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";

const styles = {
	navbar: {
		"backgroundColor": "rgba(0, 0, 0, 0.7)",
		"padding": "10px",
		"overflow": "hidden",
		"position": "absolute",
		"width": "100%"
	},
	rightMenu: {
		"float": "right",
		marginRight: "25px"
	},
	leftMenu: {
		"float": "left"
	},
	categories: {
		color: "#fff",
		marginLeft: "25px",
		fontSize: "18px",
		fontWeight: "bold"
	},
	buttons: {
		color: "#fff",
		marginRight: "8px"
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
				<div style={styles.leftMenu}>
					<Link style={styles.categories} to="/" >
						Pentesting
					</Link>
					<Link style={styles.categories} to="/" >
						Linux
					</Link>
					<Link style={styles.categories} to="/" >
						Programming
					</Link>
					<Link style={styles.categories} to="/" >
						Raspberry Pi
					</Link>
				</div>
				<div style={styles.rightMenu}>
					<Icon
						style={styles.buttons}
						name="search"
						size="large"
					/>
				</div>
				{this.props.isAuthenticated &&
					<div style={styles.rightMenu}>
						<Link style={styles.buttons} to="/new-post">
							<Icon name="write square" size="large" />
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
