import React from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";

const TopButtonStyle = styled.span`
position: fixed;
right: 100px;
bottom: 10px;
font-size: 40px;
color: rgba(0, 0, 0, 0.9);
cursor: pointer;
@media (max-width: 900px) {
	right: 0px;
	font-size: 36px;
}
`;

class TopButton extends React.Component {
	render() {
		return (
			<TopButtonStyle>
				<Icon
					onClick={this.props.goTop}
					name="arrow circle up"
				/>
			</TopButtonStyle>
		);
	}
}

export default TopButton;
