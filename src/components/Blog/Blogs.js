import React, { Component } from 'react';
import { getAllBlogs, getBlogsOfUser } from '../../services/Blog/Blog'

class Blogs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Blogs: [],
            error: {},
            loading: true
        }
    }

    async componentDidMount() {
        await this.getAllBlogs();
    }

    getAllBlogs = async () => {
        try {
            const response = await getAllBlogs();
            if (response.ok)
                this.setState({ Blogs: response.data, loading: false });
            console.log(response)
            console.log(response.message);

        } catch (err) {
            console.error(err);
        }
    }

    getBlogsOfUser = async () => {
        try {
            const response = await getBlogsOfUser();
            if (response.ok)
                this.setState({ Blogs: response.data, loading: false });
            console.log(response);
            console.log(response.message);

        } catch (err) {
            console.error(err);
        }

    }

    render() {
        return (
            <div>
                {/* <button onClick={(e) => { e.preventDefault(); this.getBlogsOfUser() }}>Get My Blogs</button> */}

                {Object(this.state.Blogs).map(blog =>
                    (<div key={blog._id}>
                        <h1>{blog.title}</h1>
                        <p>{blog.category.name}</p>
                        <p>{blog.author.name}</p>
                        <p>{blog.content}</p>
                        <p>{(new Date(blog.createdAt)).toLocaleDateString()}</p>
                        <div>{Array(blog.link).map(l => <div key={Math.random()}> {l} &nbsp; &nbsp;&nbsp; </div>)}</div>
                        {/* {JSON.stringify(blog)} */}
                    </div>))}
            </div>)

    }
}

export default Blogs;