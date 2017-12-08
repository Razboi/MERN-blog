import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./navbar";

const headerImage = require("../public/images/code-wallpaper01.jpg");
const styles = {
	header: {
		"textAlign": "center",
		"backgroundImage": "url(" + headerImage + ")",
		"height": "300px",
		"position": "relative"
	},
	titleWrapper: {
		"paddingTop": "100px"
	},
	title: {
		"color": "#ffffff",
		"fontSize": "28px",
		"fontWeight": "bold"
	}
};


class IndexHeader extends React.Component {
	render() {
		return (
			<header style={styles.header}>
				<div style={styles.titleWrapper}>
					<Link to="/"><span style={styles.title}>Marc Recatala</span></Link>
				</div>
				<NavBar style={styles.navbar} />
			</header>
		);
	}
};

export default IndexHeader;
