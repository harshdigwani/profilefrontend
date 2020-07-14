import React, { Component } from 'react';
import { getAllBlogs, getBlogsOfUser } from '../../services/Blog/Blog'
import Base from '../Base/Base';
import { titleCase } from '../../utils/StingsFunction';
import './Blog.css'

class Blogs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            error: {},
            loading: true
        }
    }

    // TODO: their is memory leak due to async operation 
    async componentDidMount() {
        await this.getAllBlogs();
    }

    getAllBlogs = async () => {
        try {
            const response = await getAllBlogs();
            if (response.ok)
                this.setState({ blogs: response.data, loading: false });
            console.log(response.message);

        } catch (err) {
            console.error(err);
        }
    }

    getBlogsOfUser = async () => {
        try {
            const response = await getBlogsOfUser();
            if (response.ok)
                this.setState({ blogs: response.data, loading: false });
            console.log(response.message);

        } catch (err) {
            console.error(err);
        }
    }

    openBlog = (id) => this.props.history.push(`/blog/${id}`);

    render() {
        return (
            <Base>
                <div className="container col justify-center align-center flex-wrap space-arround">
                    {/* <button onClick={(e) => { e.preventDefault(); this.getBlogsOfUser() }}>Get My Blogs</button> */}

                    {Object(this.state.blogs).map(blog => (

                        <div key={blog._id} className="card-blog">
                            <div className="container align-center">
                                <span className="fa fa-user-circle fa-2x" /> &nbsp;&nbsp;&nbsp;
                                <div className="container col justify-center">
                                    <b>{titleCase(blog.author.name)}</b>
                                    <span >{(new Date(blog.createdAt)).toDateString()}</span>
                                </div>
                                <b className="badge right">{titleCase(blog.category.name)}</b>
                            </div>
                            <h2>{titleCase(blog.title)}</h2>
                            <p>
                                {Array(blog.content).slice(0, 100)}...
                                <span className="btn-more" onClick={() => this.openBlog(blog._id)}>read more</span>
                            </p>

                            {/* <div>{Array(blog.link).map(l => <div key={Math.random()}> {l} &nbsp; &nbsp;&nbsp; </div>)}</div> */}
                            {/* {JSON.stringify(blog)} */}
                        </div>
                    ))}
                </div>
            </Base>
        )
    }
}

export default Blogs;