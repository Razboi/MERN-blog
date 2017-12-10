import React from "react";
import Post from "../post";
import axios from "axios";
import HeaderComponent from "../header";

const styles = {
	index: {
		padding: "30px 0px",
		display: "flex",
		"flexWrap": "wrap",
		"overflow": "hidden",
		"justifyContent": "center",
		"backgroundColor": "#f4f2f0"
	}
};


// if you need to use any lifecycle events or set any state you should use class.
// Otherwise a function can be used for a simpler syntax
class IndexPage extends React.Component {
	state = { posts: [] };

	componentDidMount() {
		axios.get("/api/posts").then( ( response ) => {
			this.setState({ posts: response.data });
		}).catch( err => console.log( err ) );
	}

	render() {
		// var postNumber = 0;
		// this.state.posts.map( (post, index) => {
		// 	console.log( index );
		// });
		return (
			<div>
				<HeaderComponent image="images/code-wallpaper01.jpg" />
				<div style={styles.index}>
					{this.state.posts.map( (post, index) =>

						<Post
							key={post._id}
							title={post.title}
							introduction={post.introduction}
							image={post.image}
							slug={post.slug}
							index={index}
						/>

					)}
				</div>
			</div>
		);
	}
};

export default IndexPage;
