import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./navbar";
import Radium from "radium";

const styles = {
	titleWrapper: {
		position: "relative",
		top: "50%"
	},
	title: {
		"color": "#fff",
		"fontSize": "30px",
		"fontWeight": "bold",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		padding: "3px 30px",
		borderRadius: "0px",
		border: "1px solid #fff",
		fontFamily: "Roboto Slab, serif",
		"@media screen and (max-width: 550px)": {
			padding: "3px 20px"
		}
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
			"backgroundRepeat": "no-repeat",
			"backgroundSize": "cover",
			"backgroundPosition": "center top",
			"textAlign": "center",
			"height": this.props.postDetails ? "500px" : "300px",
			"position": "relative"
		};

		return (
			<header style={headerStyle}>
				<div style={styles.titleWrapper}>
					<Link to="/">
						<span style={styles.title} onClick={this.props.clearSearch}>
							<span>&lt;</span> Marc Recatala <span>/&gt;</span>
						</span>
					</Link>
				</div>
				<NavBar
					search={this.props.search}
					renderSearch={this.props.renderSearch}
					clearSearch={this.props.clearSearch}
					details={this.props.postDetails ? true : false}
					style={styles.navbar}
					lock={this.props.lock}
					toggleSidebar={this.props.toggleSidebar}
				/>
			</header>
		);
	}
};

export default Radium( HeaderComponent );
