import React from "react";
import { Link } from "react-router-dom";
import {Icon} from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Radium from "radium";

const styles = {
	navbar: {
		"backgroundColor": "rgba(0, 0, 0, 0.7)",
		"padding": "10px",
		"width": "100%",
		zIndex: "3"
	},
	sidebarButton: {
		display: "none",
		"@media screen and (max-width: 900px)": {
			display: "inline",
			float: "right",
			marginRight: "10px"
		}
	},
	rightMenu: {
		"float": "right",
		marginRight: "25px",
		"@media screen and (max-width: 900px)": {
			display: "none"
		}
	},
	searchWrapper: {
		"float": "right",
		marginRight: "25px",
		"@media screen and (max-width: 900px)": {
			"float": "left",
			"margin": "0px 0px 0px 25px"
		}
	},
	leftMenu: {
		"float": "left",
		"@media screen and (max-width: 900px)": {
			display: "none"
		}
	},
	categories: {
		color: "#fff",
		marginLeft: "25px",
		fontSize: "19px",
		fontWeight: "bold",
		cursor: "pointer",
		fontFamily: "Roboto, sans-serif"
	},
	search: {
		background: "transparent",
		borderWidth: "0px 0px 1px 0px",
		borderColor: "#fff",
		color: "#fff",
		padding: "5px"
	},
	buttons: {
		color: "#fff",
		marginRight: "8px",
		cursor: "pointer"
	}
};

class NavBar extends React.Component {
	constructor() {
		super();
		this.state = {
			search: "",
			count: undefined
		};
	}
	componentWillMount() {
		if ( this.props.search ) {
			this.setState({ search: this.props.search });
		}
	}

	onSubmit = (e) => {
		e.preventDefault();
		if ( this.state.search === "") {
			this.props.clearSearch();
		} else {
			axios.get("/api/count/search/" + this.state.search ).then( ( response ) => {
				this.setState({ count: response.data[ 0 ] });
			}).catch( err => console.log( err ) );
			axios.get( `/api/search/${this.state.search}/1` ).then( (res) => {
				this.props.renderSearch ?
				this.props.renderSearch( res.data, undefined, this.state.count, this.state.search )
				:
				this.props.history.push({
					pathname: "/",
					state: {
						searchPosts: res.data,
						search: this.state.search,
						count: this.state.count
					 }
				});
			}).catch( (err) => {
				console.log( err );
			});
		}
	};

	onChange = (e) => {
		const state = this.state;
		state[ e.target.name ] = e.target.value;
		this.setState( state );
	};

	componentDidUpdate(prevProps, prevState) {
		if ( this.props.search !== prevProps.search ) {
			this.setState({ search: this.props.search });
		}
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

	render() {
		return (
			<nav id="navbar" style={ this.props.lock ?
				{ ...styles.navbar, position: "fixed", top: "0px" }
			:
			{ ...styles.navbar, position: "absolute", bottom: "0px" }
			}>
				<div style={styles.leftMenu}>
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
				</div>
				<div style={styles.sidebarButton} onClick={this.props.toggleSidebar}>
					<Icon
						style={styles.buttons}
						name="bars"
						size="large"
					/>
				</div>
				<div style={styles.searchWrapper}>
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

export default withRouter( connect( mapStateToProps, { logout })( Radium( NavBar ) ) );
