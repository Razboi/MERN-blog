import React from "react";
import { Link, withRouter } from "react-router-dom";
import {Icon} from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
import axios from "axios";
import styled from "styled-components";

const SidebarWrapper = styled.nav`
display: none;
@media (max-width: 900px) {
	background-color: rgba(0, 0, 0, 0.825);
	padding: 10px;
	height: 100%;
	width: 30%;
	z-index: 4;
	position: fixed;
	top: 0px;
	overflow: hidden;
	display: block;
};
@media (max-width: 600px) {
	width: 50%;
};
@media (max-width: 365px) {
	width: 60%;
};
`;

const Category = styled.span`
color: #fff;
margin-left: 25px;
font-size: 16px;
font-weight: bold;
cursor: pointer;
font-family: Roboto, sans-serif;
display: block;
padding-top: 15px;
`;

const StyledIcon = styled( Icon )`
color: #fff;
cursor: pointer;
`;

const SidebarOptions = styled.div`
	margin-top: 40px;
`;

const AdminOptions = styled.div`
margin-left: 25px;
padding-top: 15px;
`;

class SideBar extends React.Component {

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
		<SidebarWrapper>
			<SidebarOptions>
				<Category
					onClick={() => this.filterCategory( "pentesting" )}
				>
					Pentesting
				</Category>
				<Category
					onClick={() => this.filterCategory( "linux" )}
				>
					Linux
				</Category>
				<Category
					onClick={() => this.filterCategory( "programming" )}
				>
					Programming
				</Category>
				<Category
					onClick={() => this.filterCategory( "raspberry" )}
				>
					Raspberry Pi
				</Category>
				{this.props.isAuthenticated &&
					<AdminOptions>
						<Link to="/new-post">
							<StyledIcon name="write square" size="large" />
						</Link>

						<StyledIcon
							onClick={this.props.logout}
							name="sign out"
							size="large"
						/>
					</AdminOptions>
				}
			</SidebarOptions>
		</SidebarWrapper>
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

export default withRouter( connect( mapStateToProps, { logout })( SideBar ) );
