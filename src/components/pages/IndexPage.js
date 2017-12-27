import React from "react";
import Post from "../post";
import axios from "axios";
import HeaderComponent from "../header";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Icon} from "semantic-ui-react";

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
		"justifyContent": "center"
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
		search: ""
	};
	}

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

		axios.get("/api/posts").then( ( response ) => {
			this.setState({ posts: response.data });
		}).catch( err => console.log( err ) );

	}

	renderSearch = (posts, category) => {
		this.setState({ searchPosts: posts, category: category });
	};

	clearSearch = () => {
		this.setState({ searchPosts: "", category: "" });
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
