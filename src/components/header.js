import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./navbar";
import styled from "styled-components";

const TitleWrapper = styled.div`
position: relative;
top: 50%;
`;

const StyledTitle = styled.span`
color: #fff;
font-size: 30px;
font-weight: bold;
background-color: rgba(0, 0, 0, 0.7);
padding: 3px 30px;
border-radius: 0px;
border: 1px solid #fff;
font-family: Roboto Slab, serif;
@media (max-width: 550px): {
	padding: 3px 20px;
}
`;

class HeaderComponent extends React.Component {
	render() {
		// to set a dynamic image we need to tell webpack in which folder the image will be
		const pathToImage = require.context( "../public/", true );
		// then we can specify the image
		var headerImage = pathToImage( "./" + this.props.image );
		var imageUrl = `url(${headerImage})`;
		const HeaderStyle = styled.header`
		background-image: ${imageUrl};
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center top;
		text-align: center;
		height: ${props => this.props.postDetails ? "500px" : "300px"};
		position: relative;
		`;
		return (
			<HeaderStyle>
				<TitleWrapper>
					<Link to="/">
						<StyledTitle onClick={this.props.clearSearch}>
							&lt; Marc Recatala /&gt;
						</StyledTitle>
					</Link>
				</TitleWrapper>
				<NavBar
					search={this.props.search}
					renderSearch={this.props.renderSearch}
					clearSearch={this.props.clearSearch}
					details={this.props.postDetails ? true : false}
					lock={this.props.lock}
					toggleSidebar={this.props.toggleSidebar}
				/>
			</HeaderStyle>
		);
	}
};

export default HeaderComponent;
