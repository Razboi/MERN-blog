import React from "react";
import { Link } from "react-router-dom";
import {Icon} from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
import axios from "axios";
import Radium from "radium";
import { withRouter } from "react-router-dom";

const styles = {
	sidebarWrapper: {
		display: "none",
		"@media screen and (max-width: 900px)": {
			"backgroundColor": "rgba(0, 0, 0, 0.825)",
			"padding": "10px",
			"height": "100%",
			"width": "30%",
			zIndex: "4",
			position: "fixed",
			top: "0px",
			overflow: "hidden",
			display: "block"
		},
		"@media screen and (max-width: 600px)": {
			"width": "50%"
		},
		"@media screen and (max-width: 365px)": {
			"width": "60%"
		}
	},
	categories: {
		color: "#fff",
		marginLeft: "25px",
		fontSize: "19px",
		fontWeight: "bold",
		cursor: "pointer",
		fontFamily: "Roboto, sans-serif",
		display: "block",
		paddingTop: "15px"
	},
	buttons: {
		color: "#fff",
		cursor: "pointer"
	},
	sidebarList: {
		marginTop: "40px"
	},
	adminOptions: {
		marginLeft: "25px",
		paddingTop: "15px"
	}
};

class SideBar extends React.Component {
	constructor() {
	super();
	this.state = {
	};
}

filterCategory = (category) => {
	axios.get( `/api/count/category/${category}` ).then( ( response ) => {
		this.setState({ count: response.data[ 0 ] });
	}).catch( err => console.log( err ) );
	axios.get( `/api/category/${category}/1` ).then( (res) => {
		this.props.renderSearch ?
		this.props.renderSearch( res.data, category, this.state.count, "" )
		:
		this.props.history.push({
			pathname: "/",
			state: {
				searchPosts: res.data,
				category: category,
				count: this.state.count
			 }
		});
	}).catch( (err) => {
		console.log( err );
	});
};

render () {
	return (
		<nav style={styles.sidebarWrapper}>
			<div style={styles.sidebarList}>
				<span
					style={styles.categories}
					onClick={() => this.filterCategory( "pentesting" )}
				>
					Pentesting
				</span>
				<span
					style={styles.categories}
					onClick={() => this.filterCategory( "linux" )}
				>
					Linux
				</span>
				<span
					style={styles.categories}
					onClick={() => this.filterCategory( "programming" )}
				>
					Programming
				</span>
				<span
					style={styles.categories}
					onClick={() => this.filterCategory( "raspberry" )}
				>
					Raspberry Pi
				</span>
				{this.props.isAuthenticated &&
					<div style={styles.adminOptions}>
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
			</div>
		</nav>
	);
}
}

SideBar.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

function mapStateToProps( state ) {
	return {
		isAuthenticated: !!state.user.token
	};
}

export default withRouter( connect( mapStateToProps, { logout })( Radium( SideBar ) ) );
