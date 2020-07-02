import React, { Component } from 'react'
import { isAutheticated } from '../../services/Auth/Auth';
import { getBlogById } from '../../services/Blog/Blog';

class Blog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: isAutheticated(),
            blogId: this.props.match.params.id,
            blog: {}
        }
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true });

            const response = await getBlogById(this.state.blogId);
            if (response.ok)
                this.setState({ blog: response.data, loading: false });
            console.log(response);
            console.log(response.message);

        } catch (err) {
            console.error(err);
        }
    }

    editBlog = () => {
        this.props.history.push({
            pathname: '/createblog',
            state: { ...this.state.blog, update: true }
        })
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.state.blog)}
                <button onClick={this.editBlog}>Edit</button>
            </div>
        )
    }
}

export default Blog;