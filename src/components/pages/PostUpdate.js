import React from "react";
import axios from "axios";
import { Icon, Button } from "semantic-ui-react";
import HeaderComponent from "../header";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UpdateForm from "../forms/UpdateForm";
import SideBar from "../sidebar";
import styled from "styled-components";
import TopButton from "../topButton";


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

const AuthorAndDate = styled.span`
	font-weight: bold;
	margin-left: 20px;
`;

const Title = styled.span`
font-size: 37px;
text-align: center;
color: #005b96;
font-family: Roboto Condensed, sans-serif;
font-weight: bold;
margin: 60px 0px 0px 0px;
display: block;
line-height: 1.5;
`;


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

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll );
		axios.get("/api/post/" + this.props.match.params.slug ).then( ( response ) => {
			this.setState({ postInfo: response.data });
		}).catch( err => console.log( err ) );
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll );
	}

// call the route for deleting the record on the DB
	onDelete = (e) => {
	e.preventDefault();
	axios.delete("/api/post/" + this.state.postInfo._id, { data: { token: localStorage.loginJWT } })
	.then( ( response ) => {
		console.log( response );
		this.props.history.push("/");
	}).catch( err => console.log( err ) );
};

// update the state
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
						toggleSidebar={this.toggleSidebar}
						/>
					}

					<PostWrapper>
						<ContainerWrapper>
							<AuthorAndDate>
								<Icon name="user circle" size="large" />{this.state.postInfo.author}
							</AuthorAndDate>
							<AuthorAndDate>
								<Icon name="time" size="large" />{this.state.postInfo.created}
							</AuthorAndDate>

							<Title>{this.state.postInfo.title}</Title>
							<Content
								dangerouslySetInnerHTML={{ __html: this.state.postInfo.content }}
							/>
							<Button color="red" onClick={this.onDelete}>Delete me</Button>
						</ContainerWrapper>
						<UpdateForm onChange={this.onChange} postInfo={this.state.postInfo}/>
					</PostWrapper>
					{this.state.navbarLock &&
						<TopButton goTop={this.goTop} />
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
