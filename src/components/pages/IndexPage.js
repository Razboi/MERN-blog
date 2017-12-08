import React from "react";
import Post from "../post";
import axios from "axios";
import IndexHeader from "../indexHeader";

const styles = {
	index: {
		padding: "30px 0px",
		display: "flex",
		"flexWrap": "wrap",
		"overflow": "hidden",
		"justifyContent": "center"
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
		return (
			<div>
				<IndexHeader image="code-wallpaper01.jpg" />
				<div style={styles.index}>
					{this.state.posts.map( post =>
						<Post
							key={post._id}
							title={post.title}
							introduction={post.introduction}
							image={post.image}
							slug={post.slug}
						/>
					)}
				</div>
			</div>
		);
	}
};

export default IndexPage;
