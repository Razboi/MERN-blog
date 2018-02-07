import React from "react";
import { Link, withRouter } from "react-router-dom";
import {Icon} from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
import axios from "axios";
import styled from "styled-components";

const SidebarButton = styled.div`
display: none;
@media (max-width: 900px) {
	display: inline;
	float: right;
	margin-right: 10px;
}
`;

const RightMenu = styled.div`
float: right;
margin-right: 25px;
@media (max-width: 900px) {
	display: none;
}
`;

const SearchWrapper = styled.div`
float: right;
margin-right: 25px;
@media (max-width: 900px) {
	float: left;
	margin: 0px 0px 0px 25px;
}
`;

const SearchBar = styled.input`
background: transparent;
border-width: 0px 0px 1px 0px;
border-color: #fff;
color: #fff;
padding: 5px;
`;

const LeftMenu = styled.div`
float: left;
@media (max-width: 900px) {
	display: none;
}
`;

const Category = styled.span`
color: #fff;
margin-left: 25px;
font-size: 19px;
font-weight: bold;
cursor: pointer;
font-family: Roboto, sans-serif;
`;

const StyledIcon = styled( Icon )`
color: #fff;
margin-right: 8px;
cursor: pointer;
`;

const Navbar = styled.nav`
background-color: rgba(0, 0, 0, 0.7);
padding: 10px;
width: 100%;
z-index: 3;
position: ${props => props.lock ? "fixed" : "absolute"};
top: ${props => props.lock && "0px"};
bottom: ${props => !props.lock && "0px"};
`;

class NavBar extends React.Component {
	constructor() {
		super();
		this.state = {
			search: "",
			count: undefined
		};
	}

	// on load set the search state to the prop
	componentWillMount() {
		if ( this.props.search ) {
			this.setState({ search: this.props.search });
		}
	}

// filter by keywords
	onSubmit = (e) => {
		e.preventDefault();
		// if search is empty call clearSearch on index
		if ( this.state.search === "") {
			this.props.clearSearch();
		// else get the number of posts returned and the posts
		} else {
			axios.get("/api/count/search/" + this.state.search ).then( ( response ) => {
				this.setState({ count: response.data[ 0 ] });
			}).catch( err => console.log( err ) );
			axios.get( `/api/search/${this.state.search}/1` ).then( (res) => {
				// if there is a renderSearch on props (means is the index page) use it
				// else (means is another page) redirect to index passing the filtered posts
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

// if the search keyword changed update the state
	componentDidUpdate(prevProps, prevState) {
		if ( this.props.search !== prevProps.search ) {
			this.setState({ search: this.props.search });
		}
	}

// filter by category
	filterCategory = (category) => {
		// count the number of filtered posts
		axios.get( `/api/count/category/${category}` ).then( ( response ) => {
			this.setState({ count: response.data[ 0 ] });
		}).catch( err => console.log( err ) );
		// get the filtered posts
		axios.get( `/api/category/${category}/1` ).then( (res) => {
			// if there is a renderSearch on props (means is the index page) use it
			// else (means is another page) redirect to index passing the filtered posts
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
			<Navbar id="navbar" lock={this.props.lock}>
				<LeftMenu>
					<Category onClick={() => this.filterCategory( "pentesting" )}>
						Pentesting
					</Category>
					<Category onClick={() => this.filterCategory( "linux" )}>
						Linux
					</Category>
					<Category onClick={() => this.filterCategory( "programming" )}>
						Programming
					</Category>
					<Category onClick={() => this.filterCategory( "raspberry" )}>
						Raspberry Pi
					</Category>
				</LeftMenu>
				<SidebarButton onClick={this.props.toggleSidebar}>
					<StyledIcon
						name="bars"
						size="large"
					/>
				</SidebarButton>
				<SearchWrapper>
					<form onSubmit={this.onSubmit}>
						<SearchBar
							type="text"
							placeholder="Search"
							name="search"
							value={this.state.search}
							onChange={this.onChange}
						/>
						<StyledIcon
							onClick={this.onSubmit}
							name="search"
							size="large"
						/>
					</form>
				</SearchWrapper>

				{this.props.isAuthenticated &&
					<RightMenu>
						<Link to="/new-post">
							<StyledIcon name="write square" size="large" />
						</Link>

						<StyledIcon
							onClick={this.props.logout}
							name="sign out"
							size="large"
						/>
					</RightMenu>
				}
			</Navbar>
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
