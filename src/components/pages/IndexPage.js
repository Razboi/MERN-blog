import React from "react";
import Post from "../post";
import axios from "axios";
import HeaderComponent from "../header";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Button, Icon } from "semantic-ui-react";
import Radium from "radium";
import SideBar from "../sidebar";
import styled from "styled-components";

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

const Index = styled.div`
padding: 30px 0px;
display: flex;
flex-wrap: wrap;
overflow: hidden;
justify-content: center;
background-color: #f4f2f0;
position: relative;
`;

const PostContainer = styled.div`
width: 70%;
display: flex;
flex-wrap: wrap;
justify-content: center;
position: relative;
padding-bottom: 60px;
@media (max-width: 425px) {
	width: 100%;
}
`;

const CategoryLabel = styled.span`
background: #000;
position: absolute;
top: 10px;
padding: 3px 10px;
color: #fff;
cursor: pointer;
`;

const LabelIconStyle = styled.span`
font-size: 14px;
color: #fff;
margin: 0px;
margin-left: 4px;
`;

const NextPageButton = styled.span`
position: absolute;
bottom: 0px;
right: 0px;
`;

const PrevPageButton = styled.span`
position: absolute;
bottom: 0px;
left: 0px;
`;

const BackArrow = styled.div`
position: absolute;
left: 15%;
top: 15px;
cursor: pointer;
z-index: 2;
font-size: 22px;
`;

// if you need to use any lifecycle events or set any state you should use class.
// Otherwise a function can be used for a simpler syntax
class IndexPage extends React.Component {
	constructor() {
		super();
		this.state = {
		posts: [],
		searchPosts: [],
		category: "",
		search: "",
		pageNum: 1,
		maxPages: undefined,
		navbarLock: false,
		smallDevice: false,
		sidebar: false
	};

	this.handleScroll = this.handleScroll.bind( this );
	this.onWindowResize = this.onWindowResize.bind( this );
	}

// function for requesting all the posts (in limit) passing the current pageNum
// to calculate the number of posts to skip
	getPosts = () => {
		axios.get( `/api/posts/${this.state.pageNum}` ).then( ( response ) => {
			this.setState({ posts: response.data });
		}).catch( err => console.log( err ) );
	};

	getSearchPosts = () => {
		if ( this.state.search ) {
			axios.get( `/api/search/${this.state.search}/${this.state.pageNum}` )
			.then( ( response ) => {
				this.setState({ searchPosts: response.data });
			}).catch( err => console.log( err ) );
		} else {
			axios.get( `/api/category/${this.state.category}/${this.state.pageNum}` )
			.then( ( response ) => {
				this.setState({ searchPosts: response.data });
			}).catch( err => console.log( err ) );
		}
	};

// get the count of all the posts and set maxPages
	getTotalPosts = () => {
		axios.get("/api/count/posts" ).then( ( response ) => {
			// the number of pages is the number of posts divided posts per page
			this.setState({ maxPages: Math.ceil( response.data[ 0 ] / 7 ) });
		}).catch( err => console.log( err ) );
	};

// when te user scrolls call the handleScroll function
	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll );
		window.addEventListener("resize", this.onWindowResize );
	}

	componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll );
		window.removeEventListener("resize", this.onWindowResize );
}

// if window scroll is greater than the position of the navbar set navbarLock to true
	handleScroll() {
		if ( window.scrollY >= 253 && !this.state.navbarLock ) {
			this.setState({ navbarLock: true });
		} else if ( window.scrollY < 253 && this.state.navbarLock ) {
			this.setState({ navbarLock: false });
		}
	}

	onWindowResize() {
		if ( window.matchMedia("(max-width: 1200px)").matches ) {
			this.setState({ smallDevice: true });
		} else {
			this.setState({ smallDevice: false });
		}
	}

	handleClickOutsideSidebar = () => {
		if ( this.state.sidebar ) {
			this.setState({ sidebar: false });
		}
	};

// before mounting get the location state, posts and posts count
	componentWillMount() {
		if ( !this.props.location.state || !this.props.location.state.searchPosts ) {
			this.getTotalPosts();
			this.getPosts();
		} else {
			this.setState({
				searchPosts: this.props.location.state.searchPosts,
				search: this.props.location.state.search,
				maxPages: Math.ceil( this.props.location.state.count / 7 ),
				category: this.props.location.state.category
			});
			this.props.history.replace({ state: {} });
		}
		this.goTop();
		this.onWindowResize();
	}

// every time the component updates if the page number has changed we get the new posts
	componentDidUpdate(prevProps, prevState) {
		if ( this.state.pageNum !== prevState.pageNum ) {
			this.goTop();
			// if there's a search get more searched posts, else get more posts
			this.state.searchPosts.length > 0 ? this.getSearchPosts() : this.getPosts();
		}
	}

// set the search results as searchPosts
	renderSearch = (posts, category, count, search) => {
		this.goTop();
		this.clearState();
		this.setState({
			searchPosts: posts,
			category: category,
			maxPages: Math.ceil( count / 7 ),
			search: search
		});
	};

// clear searchPosts, category and pageNum
	clearState = () => {
		this.setState({ searchPosts: "", category: "", pageNum: 1, search: "" });
	};

// clear search results and get posts count/maxPage
	clearSearch = () => {
		this.clearState();
		this.getTotalPosts();
		this.getPosts();
	};

// if the current page is smaller than the maximum pages increment the page number
	nextPage = () => {
		if ( this.state.pageNum < this.state.maxPages ) {
			this.setState({ pageNum: this.state.pageNum + 1 });
		}
	};

// if the current page is greater than one decrement the page number
	prevPage = () => {
		if ( this.state.pageNum > 1 ) {
			this.setState({ pageNum: this.state.pageNum - 1 });
		}
	};

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
						renderSearch={this.renderSearch}
					/>
				}
				<div onClick={this.handleClickOutsideSidebar}>
					<HeaderComponent
						search={this.state.search}
						renderSearch={this.renderSearch}
						clearSearch={this.clearSearch}
						image="images/code-wallpaper01.jpg"
						lock={this.state.navbarLock}
						toggleSidebar={this.toggleSidebar}
					/>

					<Index onClick={this.handleClickOutside}>
						{ (this.state.category || this.state.search) &&
							<BackArrow onClick={this.clearSearch}>
								<Icon
									name="arrow circle outline left"
									size="large"
								/>
							</BackArrow>
						}

						{ this.state.category &&
							<CategoryLabel onClick={this.clearSearch}>
								{this.state.category}
								<LabelIconStyle>
									<Icon name="close" size="large" />
								</LabelIconStyle>
							</CategoryLabel>
						}

						<PostContainer>
							{this.state.searchPosts.length > 0 ?
								this.state.searchPosts.map( (post, index) =>
									<Post
										key={post._id}
										title={post.title}
										introduction={post.introduction}
										image={post.image}
										slug={post.slug}
										index={index}
										smallDevice={this.state.smallDevice}
									/>
								)
							:
							this.state.posts.map( (post, index) =>
								<Post
									key={post._id}
									title={post.title}
									introduction={post.introduction}
									image={post.image}
									slug={post.slug}
									index={index}
									smallDevice={this.state.smallDevice}
								/>
							)
							}
							<NextPageButton>
								<Button
									disabled={this.state.pageNum === this.state.maxPages}
									primary
									style={{
										margin: "0px",
										borderRadius: "0px"
									}}
									onClick={this.nextPage}
									content="Next Page"
								/>
							</NextPageButton>
							<PrevPageButton>
								<Button
									primary
									disabled={this.state.pageNum === 1}
									style={{
										margin: "0px",
										borderRadius: "0px"
									}}
									onClick={this.prevPage}
									content="Previous Page"
								/>
							</PrevPageButton>
						</PostContainer>
					</Index>

				</div>

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
};

IndexPage.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps( state ) {
	return {
		isAuthenticated: !!state.user.token,
		username: state.user.username
	};
}

export default connect( mapStateToProps )( Radium( IndexPage ) );
