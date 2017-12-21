import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import rootReducer from "./rootReducer";
import { userLoggedIn } from "./actions/auth";

const store = createStore(
	rootReducer,
	composeWithDevTools( applyMiddleware( thunk ) )
);

if ( localStorage.loginJWT ) {
	const user = { token: localStorage.loginJWT };
	store.dispatch( userLoggedIn( user ) );
}

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Route component={App} />
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);
