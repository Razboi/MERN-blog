import React from "react";
import axios from "axios";
import { Header, Icon } from "semantic-ui-react";
import HeaderComponent from "../header";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UpdateForm from "../forms/UpdateForm";
import SideBar from "../sidebar";
import styled from "styled-components";


const ContainerWrapper = styled.div`
padding: 80px 5%;
max-width: 858px;
background: #f9f8f7;
border-radius: 0px;
font-family: Roboto, sans-serif;
box-shadow: 0px 0px 40px 2px #D3D3D3;
margin: 0px auto;
`;

const PostWrapper = styled.div`
text-align: justify;
background: #f4f2f0;
position: relative;
top: 0px;
padding-bottom: 70px;
padding-top: 30px;
`;

const Content = styled.p`
font-size: 21px;
margin-top: 60px;
line-height: 33px;
overflow: hidden;
@media (max-width: 768px) {
	font-size: 18px;
}
`;

const TopButton = styled.span`
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

const styles = {
	wrapper: {
		fontSize: "18px",
		textAlign: "justify",
		"background": "#f4f2f0",
		position: "relative",
		top: "0px",
		paddingBottom: "70px",
		paddingTop: "30px"
	},
	container: {
		padding: "80px 100px",
		width: "43em",
		"background": "#f9f8f7",
		borderRadius: "0px",
		fontFamily: "Roboto, sans-serif",
		fontSize: "21px",
		boxShadow: "0px 0px 40px 2px #D3D3D3"
	},
	content: {
		marginTop: "60px",
		lineHeighy: "33px",
		overflow: "hidden"
	},
	title: {
		fontSize: "37px",
		textAlign: "center",
		color: "#005b96",
		fontFamily: "Roboto Condensed, sans-serif"
	}
};

class PostUpdates extends React.Component {
	constructor() {
		super();
		this.state = {
			postInfo: {
				title: "",
				content: "",
				introduction: "",
				image: "",
				updatedImage: [],
				created: "",
				author: "",
				categories: [],
				keywords: []
			}
		};
		this.handleScroll = this.handleScroll.bind( this );
	}

	componentWillMount() {
		axios.get("/api/post/" + this.props.match.params.slug ).then( ( response ) => {
			this.setState({ postInfo: response.data });
		}).catch( err => console.log( err ) );
	}

	componentWillReceiveProps(nextProps) {
		if ( nextProps.location.pathname !== this.props.location.pathname ) {
			axios.get("/api/post/" + nextProps.match.params.slug ).then( ( response ) => {
				this.setState({ postInfo: response.data });
			}).catch( err => console.log( err ) );
		}
	}

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll );
		axios.get("/api/post/" + this.props.match.params.slug ).then( ( response ) => {
			this.setState({ postInfo: response.data });
		}).catch( err => console.log( err ) );
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll );
	}

	onDelete = (e) => {
	e.preventDefault();
	axios.delete("/api/post/" + this.state.postInfo._id ).then( ( response ) => {
		console.log( response );
	}).catch( err => console.log( err ) );
};

onChange = (e) => {
	const state = this.state.postInfo;
	state[ e.target.name ] = e.target.value;
	this.setState( state );
};

	// if window scroll is greater than the position of the navbar set navbarLock to true
	handleScroll() {
		if ( window.scrollY >= 453 && !this.state.navbarLock ) {
			this.setState({ navbarLock: true });
		} else if ( window.scrollY < 453 && this.state.navbarLock ) {
			this.setState({ navbarLock: false });
		}
	}

	goTop = () => {
		window.scrollTo( 0, 0 );
	};

	toggleSidebar = () => {
		this.setState({ sidebar: !this.state.sidebar });
	};

	render() {
		return (
				<div>
					{this.state.sidebar &&
						<SideBar
							postDetails={true}
						/>
					}
					{/* if there is no image state, pass a loader image to the header */}
					{ this.state.postInfo.image ?
						<HeaderComponent
							postDetails={true}
							image={`uploads/${this.state.postInfo.image}`}
							lock={this.state.navbarLock}
							toggleSidebar={this.toggleSidebar}
						/>
					: <HeaderComponent
						postDetails={true}
						image="images/loader-image.png"
						lock={this.state.navbarLock}
						/>
					}

					<PostWrapper>
						<ContainerWrapper>
							<span>
								{this.state.postInfo.author} {this.state.postInfo.created}
							</span>

							<Header style={ styles.title }>{this.state.postInfo.title}</Header>
							<Content
								dangerouslySetInnerHTML={{ __html: this.state.postInfo.content }}
							/>

						</ContainerWrapper>
						<UpdateForm onChange={this.onChange} postInfo={this.state.postInfo}/>
					</PostWrapper>
					{this.state.navbarLock &&
						<TopButton>
							<Icon
								onClick={this.goTop}
								name="arrow circle up"
							/>
						</TopButton>
					}
				</div>
		);
	}
}

PostUpdates.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps ( state ) {
	return {
		isAuthenticated: !!state.user.token
	};
}

export default connect( mapStateToProps )( PostUpdates );
