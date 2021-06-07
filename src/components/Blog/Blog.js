import React, { Component } from 'react'
import { isAutheticated } from '../../services/Auth/Auth';
import { getBlogById } from '../../services/Blog/Blog';
import Base from '../Base/Base';
import Spinner from '../Core/Spinner'
import { titleCase } from '../../utils/StingsFunction';
class Blog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: isAutheticated(),
            blogId: this.props.match.params.id,
            blog: null,
            loading: false
        }
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true });
            const response = await getBlogById(this.state.blogId);
            if (response.ok)
                this.setState({ blog: response.data, loading: false });
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
        let { blog, user } = this.state;
        if (!blog)
            return (<Base>{<Spinner/>}</Base>)

        return (
            
            <Base>
                {this.state.loading && <Spinner />}
                <div className="container justify-center align-center ">
                    <div className="width-60">
                        <div className="container align-center">
                            <h1 className="heading-1 inline">{titleCase(blog.title)}</h1>
                            {user._id === blog.author._id && <b className="badge right" onClick={this.editBlog}><span className="fa fa-pencil" /> Edit</b>}
                        </div>
                        <div className="container align-center">
                            <span className="fa fa-user-circle fa-2x" /> &nbsp;&nbsp;&nbsp;
                                <div className="container col justify-center">
                                <b>{titleCase(blog.author.name)}</b>
                                <span className="font-size-date">{(new Date(blog.createdAt)).toDateString()}</span>
                            </div>
                            <b className="badge right">{titleCase(blog.category.name)}</b>
                        </div>


                        <div>{(blog.links).map(l => {
                            return <h6 key={l}><span className="btn-more" onClick={() => window.open(l)}>http://{l}</span></h6>
                        })}</div>

                        <p className="content">
                            {blog.content}
                        </p>
                    </div>
                </div>
            </Base >
        )
    }
}

export default Blog;