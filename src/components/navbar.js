import React from "react";
import { Link } from "react-router-dom";
import {Icon} from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
import axios from "axios";
import { withRouter } from "react-router-dom";

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
	search: {
		background: "transparent",
		border: "none",
		borderBottom: "1px solid #fff",
		color: "#fff",
		padding: "5px"
	},
	buttons: {
		color: "#fff",
		marginRight: "8px"
	}
};

class NavBar extends React.Component {
	constructor() {
		super();
		this.state = {
			search: ""
		};
	}
	componentDidMount() {
		if (this.props.search) {
			this.setState({ search: this.props.search });
		}
		console.log(this.state);
	}

	onSubmit = (e) => {
		e.preventDefault();
		if ( this.state.search === "") {
			this.props.clearSearch();
		} else {
			axios.get("/api/search/" + this.state.search ).then( (res) => {
				this.props.renderSearch ?
				this.props.renderSearch( res.data )
				:
				this.props.history.push({
					pathname: "/",
					state: {
						searchPosts: res.data,
						search: this.state.search
					 }
				});
				console.log( res );
			}).catch( (err) => {
				console.log( err );
			});
		}
	};

	onChange = (e) => {
		const state = this.state;
		state[ e.target.name ] = e.target.value;
		this.setState( state );
		console.log( this.state );
	};

	filterCategory = (category) => {
		this.setState({ search: "" });
		var route = "/api/category/" + category;
		axios.get( route ).then( (res) => {
			this.props.renderSearch( res.data, category );
		}).catch( (err) => {
			console.log( err );
		});
	};

	render() {
		return (
			<nav style={ this.props.details ?
				{ ...styles.navbar, bottom: "150px" }
			:
			{ ...styles.navbar, bottom: "0px" }
			}>
				<div style={styles.leftMenu}>
					<Link
						style={styles.categories}
						onClick={() => this.filterCategory( "pentesting" )}
						to="/"
					>
						Pentesting
					</Link>
					<Link
						style={styles.categories}
						onClick={() => this.filterCategory( "linux" )}
						to="/"
					>
						Linux
					</Link>
					<Link
						style={styles.categories}
						onClick={() => this.filterCategory( "programming" )}
						to="/"
					>
						Programming
					</Link>
					<Link
						style={styles.categories}
						onClick={() => this.filterCategory( "raspberry" )}
						to="/"
					>
						Raspberry Pi
					</Link>
				</div>
				<div style={styles.rightMenu}>
					<form onSubmit={this.onSubmit}>
						<input
							style={styles.search}
							type="text"
							placeholder="Search"
							name="search"
							value={this.state.search}
							onChange={this.onChange}
						/>
						<Icon
							onClick={this.onSubmit}
							style={styles.buttons}
							name="search"
							size="large"
						/>
					</form>

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

export default withRouter( connect( mapStateToProps, { logout })( NavBar ) );
