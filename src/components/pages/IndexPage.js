import React from "react";
import Post from "../post";
import axios from "axios";
import HeaderComponent from "../header";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const styles = {
	index: {
		padding: "30px 0px",
		display: "flex",
		"flexWrap": "wrap",
		"overflow": "hidden",
		"justifyContent": "center",
		"backgroundColor": "#f4f2f0"
	},
	postsContainer: {
		"width": "70%",
		"display": "flex",
		"flexWrap": "wrap",
		"justifyContent": "center"
	}
};


// if you need to use any lifecycle events or set any state you should use class.
// Otherwise a function can be used for a simpler syntax
class IndexPage extends React.Component {
	state = {
		posts: [],
		searchPosts: []
	};

	componentDidMount() {
		axios.get("/api/posts").then( ( response ) => {
			this.setState({ posts: response.data });
		}).catch( err => console.log( err ) );
	}

	renderSearch = (posts) => {
		this.setState({ searchPosts: posts });
		console.log( this.state.searchPosts );
	};

	clearSearch = () => {
		this.setState({ searchPosts: "" });
		console.log( this.state );
	};

	render() {
		return (
			<div>
				<HeaderComponent
					renderSearch={this.renderSearch}
					clearSearch={this.clearSearch}
					image="images/code-wallpaper01.jpg"
				/>
				<div style={styles.index}>

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
