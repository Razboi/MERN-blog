import React from "react";
import IndexPage from "./components/pages/IndexPage";
import NewPostPage from "./components/pages/NewPostPage";
import PostDetails from "./components/pages/PostDetails";
import LoginPage from "./components/pages/LoginPage";
import PostUpdate from "./components/pages/PostUpdate";
import { Route } from "react-router-dom";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import PropTypes from "prop-types";


// if you need to use any lifecycle events or set any state you should use class.
// Otherwise a function can be used for a simpler syntax
class App extends React.Component {
	componentWillMount() {
    document.body.style.margin = 0;
		document.body.style.background = "#f4f2f0";
}
componentWillUnmount() {
    document.body.style.margin = null;
		document.body.style.background = null;
}
	render() {
		return (
				<div>
					<Route location={this.props.location} path="/" exact component={ IndexPage } />
					<UserRoute
						location={this.props.location}
						path="/new-post"
						exact component={ NewPostPage } />
					<UserRoute
						location={this.props.location}
						path="/update-post/:slug"
						exact component={ PostUpdate } />
					<Route
						location={this.props.location}
						path="/post/:slug"
						component={ PostDetails } />
					<GuestRoute
						location={this.props.location}
						path="/login"
						component={ LoginPage } />
				</div>
		);
	}
};

App.propTypes = {
	location: PropTypes.object.isRequired
};

export default App;
