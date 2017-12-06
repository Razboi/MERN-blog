import React from "react";
import { Link } from "react-router-dom";
import {Icon} from "semantic-ui-react";

const styles = {
	navbar: {
		"backgroundColor": "#D3D3D3",
		"padding": "10px",
		"overflow": "hidden",
		"textAlign": "center"
	},
	rightMenu: {
		"float": "right",
		"top": "0px"
	},
	buttons: {
		"padding": "0px"
	},
	title: {
		"fontSize": "22px",
		"fontWeight": "bold",
		"marginTop": "20px !important"
	}
};


class NavBar extends React.Component {

	render() {
		return (
			<nav style={styles.navbar}>
				<Link to="/"><span style={styles.title}>Marc's Blog</span></Link>
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
