import React from "react";
import IndexPage from "./components/pages/IndexPage";
import NewPostPage from "./components/pages/NewPostPage";
import PostDetails from "./components/pages/PostDetails";
import { Route } from "react-router-dom";


// if you need to use any lifecycle events or set any state you should use class.
// Otherwise a function can be used for a simpler syntax
class App extends React.Component {
	componentWillMount() {
    document.body.style.margin = 0;
}
componentWillUnmount() {
    document.body.style.margin = null;
}
	render() {
		return (
				<div>
					<Route path="/" exact component={ IndexPage } />
					<Route path="/new-post" exact component={ NewPostPage } />
					<Route path="/post/:slug" component={ PostDetails } />
				</div>
		);
	}
};

export default App;
