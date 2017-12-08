import React from "react";
import { Link } from "react-router-dom";
import {Icon} from "semantic-ui-react";

const styles = {
	navbar: {
		"backgroundColor": "rgba(0, 0, 0, 0.5)",
		"padding": "10px",
		"overflow": "hidden",
		"position": "absolute",
		"bottom": "0px",
		"width": "100%"
	},
	rightMenu: {
		"float": "right",
		"top": "0px"
	},
	buttons: {
		"padding": "0px"
	}
};


class NavBar extends React.Component {

	render() {
		return (
			<nav style={styles.navbar}>
				<div style={styles.rightMenu}>
					<Link to="/">
						<Icon name="home" size="large" />
					</Link>
					<Link to="/new-post">
						<Icon name="write square" size="large" />
					</Link>
				</div>
			</nav>
		);
	}
}

export default NavBar;
