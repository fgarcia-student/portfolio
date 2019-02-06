import React from "react"
import Layout from "../layout/Layout"
import styled from "styled-components"
import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import CircularProgress from '@material-ui/core/CircularProgress'
import { ListWrapper } from ".";
import BlogPostListItem from "../components/BlogPostListItem"
import { Button } from "@material-ui/core"
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'

if (typeof window !== "undefined") {
    firebase.initializeApp({
        apiKey: "AIzaSyB6SuFOVeX7Za9J0tiKfuv9_63SUVaELZg",
        authDomain: "triple-student-185704.firebaseapp.com",
        databaseURL: "https://triple-student-185704.firebaseio.com",
        projectId: "triple-student-185704",
        storageBucket: "triple-student-185704.appspot.com",
        messagingSenderId: "331710830613",
    });
}

const BlogListWrapper = styled(ListWrapper)`
    height: unset;
    flex: 1;
    align-items: flex-start;
`;

const TextArea = styled(TextField)`
    width: 90%;
    height: 90%;
`;

function byDate(postA, postB) {
    const dateA = new Date(postA.date);
    const dateB = new Date(postB.date);
    if (dateA > dateB) {
        return -1;
    }

    if (dateA < dateB) {
        return 1;
    }

    return 0;
}

class Blog extends React.Component {
    constructor(props) {
        super(props);

        if (typeof window !== "undefined") {
            this.db = firebase.firestore();
            this.auth = firebase.auth();
            this.db.settings({ timestampsInSnapshots: true })
        }
        this.state = {
            posts: [],
            users: [],
            currentTags: [],
            error: undefined,
            email: "",
            password: "",
            loggedIn: false,
            modals: {login: false, post: false},
            post: "",
            title: "",
            tagsToAdd: [],
        }
    }
    
    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const getPosts = new Promise((resolve, reject) => {
            const posts = [];
            const tags = {};
            this.db.collection("posts").get()
            .then((snapshot) => {
                snapshot.forEach((post) => {
                    posts.push({
                        id: post.id,
                        title: post.get("title"),
                        author: post.get("author"),
                        content: post.get("content"),
                        date: post.get("date"),
                        tags: post.get("tags")
                    });
                    tags[post.get("tags")] = true;
                });
                resolve({posts, tags});
            })
            .catch((err) => {
                reject(err);
            });
        });
    
        const getUsers = new Promise((resolve, reject) => {
            const users = {};
            this.db.collection("users").get()
            .then((snapshot) => {
                snapshot.forEach((user) =>
                    users[user.get("userId")] = user.get("name")
                );
                resolve(users);
            })
            .catch((err) => {
                reject(err);
            });
        });

        Promise.all([getPosts, getUsers])
        .then(([postsAndTags, users]) => this.setState({ posts: postsAndTags.posts.sort(byDate), currentTags: postsAndTags.tags, users }))
        .catch((err) => this.setState({ error: err }))
    }

    handleClose = () => {
        this.setState({ modals: {login: false, post: false} });
    }

    handleLogin = () => {
        this.auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            this.setState({ loggedIn: true, modals: {login: false, post: false} });
        })
    }

    handlePost = () => {
        const now = new Date();
        this.db.collection("posts").add({
            title: this.state.title,
            author: this.auth.currentUser.uid,
            content: this.state.post,
            date: `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`,
            tags: ["woah", "for wifey"]
        })
        .then(() => {
            this.handleClose();
            this.getData();
        })
    }

    render() {

        let button = <Button onClick={() => this.setState({ modals: { login: true, post: false } })}>Login</Button>;
        if (this.state.loggedIn) {
            button = <Button onClick={() => this.setState({ modals: { login: false, post: true } })}>Create Post</Button>;
        }


        if (this.state.error) {
            return (
                <Layout>
                    {`Some error occured: ${this.state.error}`}
                </Layout>
            )
        }

        return (
            <Layout>
                {button}
                <BlogListWrapper>
                    {this.state.posts.length === 0 && <CircularProgress />}
                    {
                        this.state.posts.length > 0 &&
                        this.state.posts.map(post => 
                            <BlogPostListItem key={post.id} post={post} name={this.state.users[post.author] || "Unknown"} />
                        )
                    }
                </BlogListWrapper>
                <Dialog
                    open={this.state.modals.login && !this.state.loggedIn}
                    onClose={this.handleClose}
                >
                    <DialogTitle>Login to Continue</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.currentTarget.value })}
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.currentTarget.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleLogin} color="primary">
                            Login
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    fullScreen
                    open={this.state.modals.post && this.state.loggedIn}
                    onClose={this.handleClose}
                >
                    <AppBar>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit">
                                New Blog Post
                            </Typography>
                            <Button color="inherit" onClick={this.handlePost}>
                                Post
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <DialogContent
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <TextField
                            margin="dense"
                            id="title"
                            label="Title"
                            fullWidth
                            value={this.state.title}
                            onChange={(e) => this.setState({ title: e.currentTarget.value })}
                        />
                        <TextArea
                            multiline
                            value={this.state.post}
                            onChange={(e) => this.setState({ post: e.currentTarget.value })}
                        />
                    </DialogContent>
                </Dialog>
            </Layout>
        )
    }
}

export default Blog;