import React from "react";
import Post from "../post";
import axios from "axios";
import HeaderComponent from "../header";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Icon, Button} from "semantic-ui-react";

const styles = {
	index: {
		padding: "30px 0px",
		display: "flex",
		"flexWrap": "wrap",
		"overflow": "hidden",
		"justifyContent": "center",
		"backgroundColor": "#f4f2f0",
		position: "relative"
	},
	postsContainer: {
		"width": "70%",
		"display": "flex",
		"flexWrap": "wrap",
		"justifyContent": "center",
		position: "relative",
		paddingBottom: "60px"
	},
	categoryLabel: {
		background: "#000",
		position: "absolute",
		top: "10px",
		left: "45px",
		padding: "3px 10px",
		color: "#fff",
		cursor: "pointer"
	},
	labelIcon: {
		fontSize: "15px",
		color: "#fff",
		margin: "0px",
		marginLeft: "4px"
	},
	nextPage: {
		position: "absolute",
		bottom: "0px",
		right: "0px"
	},
	prevPage: {
		position: "absolute",
		bottom: "0px",
		left: "0px"
	}
};


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
		maxPages: undefined
	};
	}

// function for requesting all the posts (in limit) passing the current pageNum
// to calculate the number of posts to skip
	getPosts = () => {
		axios.get("/api/posts/" + this.state.pageNum ).then( ( response ) => {
			this.setState({ posts: response.data });
		}).catch( err => console.log( err ) );
	};

// get the count of all the posts and set maxPages
	getTotalPosts = () => {
		axios.get("/api/count/" ).then( ( response ) => {
			// the number of pages is the number of posts divided posts per page
			this.setState({ maxPages: Math.ceil( response.data[ 0 ] / 7 ) });
		}).catch( err => console.log( err ) );
	};

// before mounting get the location state, posts and posts count
	componentWillMount() {
		if ( this.props.location.state ) {
			if ( this.props.location.state.searchPosts ) {
				this.setState({
					searchPosts: this.props.location.state.searchPosts,
					search: this.props.location.state.search
				});
			}
			if ( this.props.location.state.category ) {
				this.setState({
					category: this.props.location.state.category
				});
			}
			this.props.history.replace({ state: {} });
		}

		this.getPosts();
		this.getTotalPosts();
	}

// every time the component updates if the page number has changed we get the new posts
	componentDidUpdate(prevProps, prevState) {
		if ( this.state.pageNum !== prevState.pageNum ) {
			this.getPosts();
		}
	}

// set the search results as searchPosts
	renderSearch = (posts, category) => {
		this.setState({ searchPosts: posts, category: category });
	};

// clear search results and category filter
	clearSearch = () => {
		this.setState({ searchPosts: "", category: "" });
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

	render() {
		return (
			<div>
				<HeaderComponent
					search={this.state.search}
					renderSearch={this.renderSearch}
					clearSearch={this.clearSearch}
					image="images/code-wallpaper01.jpg"
				/>

				<div style={styles.index}>
					{ this.state.category &&
						<span style={styles.categoryLabel} onClick={this.clearSearch}>
							{this.state.category}
							<Icon style={styles.labelIcon} name="close" size="large" />
						</span>
					}

					<div style={styles.postsContainer}>
						{this.state.searchPosts.length > 0 ?
							this.state.searchPosts.map( (post, index) =>

								<Post
									key={post._id}
									title={post.title}
									introduction={post.introduction}
									image={post.image}
									slug={post.slug}
									index={index}
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
							/>

						)
						}
						{this.state.pageNum < this.state.maxPages ?
							<Button
								primary
								style={styles.nextPage}
								onClick={this.nextPage}
								content="Next Page"
							/>
						:
						<Button
							disabled
							primary
							style={styles.nextPage}
							onClick={this.nextPage}
							content="Next Page"
						/>
						}
						{this.state.pageNum > 1 ?
							<Button
								primary
								style={styles.prevPage}
								onClick={this.prevPage}
								content="Previous Page"
							/>
						:
						<Button
							primary
							disabled
							style={styles.prevPage}
							onClick={this.prevPage}
							content="Previous Page"
						/>
						}

					</div>
				</div>

			</div>
		);
	}
};

IndexPage.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps( state ) {
	return {
		isAuthenticated: !!state.user.token
	};
}

export default connect( mapStateToProps )( IndexPage );
