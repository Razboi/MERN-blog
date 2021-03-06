import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Rename component to Component and put all the arguments to ...rest
// then we create a normal route with the passed arguments
const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			!isAuthenticated ? <Component {...props} /> : <Redirect to="/" />} />
);

GuestRoute.propTypes = {
	component: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps( state ) {
	return {
		isAuthenticated: !!state.user.token
	};
}

export default connect( mapStateToProps )( GuestRoute );
