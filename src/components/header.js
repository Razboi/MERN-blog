import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./navbar";

const styles = {
	header: {
		"textAlign": "center",
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


class HeaderComponent extends React.Component {

	render() {
		// to set a dynamic image we need to tell webpack in which folder the image will be
		const pathToImage = require.context( "../public/", true );
		// then we can specify the image
		var headerImage = pathToImage( "./" + this.props.image );
		const headerStyle = {
			backgroundImage: `url(${headerImage})`,
			"textAlign": "center",
			"height": "300px",
			"position": "relative"
		};

		return (
			<header style={headerStyle}>
				<div style={styles.titleWrapper}>
					<Link to="/"><span style={styles.title}>Marc Recatala</span></Link>
				</div>
				<NavBar style={styles.navbar} />
			</header>
		);
	}
};

export default HeaderComponent;
