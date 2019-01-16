import React from "react"
import Layout from "../layout/Layout"
import styled from "styled-components"
import firebase from "firebase/app"
import "firebase/firestore"
import CircularProgress from '@material-ui/core/CircularProgress'
import { ListWrapper } from ".";
import BlogPostListItem from "../components/BlogPostListItem"

firebase.initializeApp({
    apiKey: "AIzaSyB6SuFOVeX7Za9J0tiKfuv9_63SUVaELZg",
    authDomain: "triple-student-185704.firebaseapp.com",
    databaseURL: "https://triple-student-185704.firebaseio.com",
    projectId: "triple-student-185704",
    storageBucket: "triple-student-185704.appspot.com",
    messagingSenderId: "331710830613",
});

const BlogListWrapper = styled(ListWrapper)`
    height: unset;
    flex: 1;
    align-items: flex-start;
`;

class Blog extends React.Component {
    constructor(props) {
        super(props);

        this.db = firebase.firestore();
        this.db.settings({ timestampsInSnapshots: true })
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        this.db.collection("posts").get().then((snapshot) => {
            const posts = [];
            snapshot.forEach((doc) =>
                posts.push({
                    id: doc.id,
                    title: doc.get("title"),
                    author: doc.get("author"),
                    content: doc.get("content"),
                    date: doc.get("date"),
                    tags: doc.get("tags")
                })
            );
            this.setState({ posts });
        })
    }

    render() {
        return (
            <Layout>
                <BlogListWrapper>
                    {this.state.posts.length === 0 && <CircularProgress />}
                    {
                        this.state.posts.length > 0 &&
                        this.state.posts.map(post => 
                            <BlogPostListItem key={post.id} post={post} />
                        )
                    }
                </BlogListWrapper>
            </Layout>
        )
    }
}

export default Blog;