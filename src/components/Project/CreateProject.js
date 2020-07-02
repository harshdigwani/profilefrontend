import React, { Component } from 'react';
import { isAutheticated } from '../../services/Auth/Auth';
import { createBlog, updateBlog } from '../../services/Blog/Blog';

class CreateBlog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            links: [],
            author: isAutheticated()._id,
            category: "",
            content: "",
            blogId: "",
            user: isAutheticated(),
            loading: false,
            update: false
        }
    }

    componentDidMount() {
        const blog = this.props.location.state;
        console.log(blog)
        if (blog)
            this.setState({
                blogId: blog._id,
                author: blog.author._id,
                category: blog.category._id,
                content: blog.content,
                links: blog.links,
                title: blog.title,
                update: blog.update
            })
    }

    createBlog = async () => {
        try {
            this.setState({ loading: true });

            const { title, links, author, category, content } = this.state;

            const response = await createBlog({
                title, links, author, category, content
            });
            if (response.ok)
                this.setState({ loading: false });
            console.log(response);
            console.log(response.message);

        } catch (err) {
            console.error(err);
        }
    }

    updateBlog = async () => {
        try {
            this.setState({ loading: true });

            const { title, links, author, category, content, blogId } = this.state;

            const response = await updateBlog(blogId, {
                title, links, author, category, content
            });
            if (response.ok)
                this.setState({ loading: false });
            console.log(response);
            console.log(response.message);

        } catch (err) {
            console.error(err);
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h4>{this.state.user.firstname + " " + this.state.user.lastname}</h4>
                <h4>{this.state.category}</h4>
                <h4>Title</h4>
                <input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                />
                <h4>Content</h4>
                <textarea
                    name="content"
                    value={this.state.content}
                    onChange={this.handleChange}
                />
                {this.state.update ? <button onClick={this.updateBlog}>Update Blog</button>
                    : <button onClick={this.createBlog}>Create Blog</button>}
            </div>
        )
    }
}

export default CreateBlog;