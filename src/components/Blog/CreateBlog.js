import React, { Component } from 'react';
import { isAutheticated } from '../../services/Auth/Auth';
import { createBlog, updateBlog } from '../../services/Blog/Blog';
import Base from '../Base/Base';
import { titleCase } from '../../utils/StingsFunction';
import TextareaAutosize from 'react-autosize-textarea';
import { getAllCategories } from '../../services/Category/Category';

class CreateBlog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blog: {
                title: "",
                links: [],
                category: "",
                content: ""
            },
            user: isAutheticated(),
            categories: getAllCategories(),
            loading: false,
            update: false
        }
    }

    componentDidMount() {
        console.log(this.state);
        const blog = this.props.location.state;
        if (blog)
            this.setState({
                blog,
                user: isAutheticated(),
                // categories: getAllCategories(),
                update: blog.update,
                loading: false
            })
    }

    createBlog = async () => {
        try {
            this.setState({ loading: true });

            const { title, links, category, content } = this.state.blog;

            const response = await createBlog({
                title, links, author: this.state.user._id, category: category._id, content
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

            const { _id, title, links, category, content } = this.state.blog;

            const response = await updateBlog(_id, {
                title, links, author: this.state.user._id, category: category._id, content
            });
            if (response.ok)
                this.setState({ loading: false });
            console.log(response);
            console.log(response.message);

        } catch (err) {
            console.error(err);
        }
    }


    handleChange = field => (e) => {
        if (this.state.blog !== null) {
            const value = e.target.value;

            this.setState(prevState => ({
                blog: {
                    ...prevState.blog,
                    [field]: value
                }
            }))
        }
    }


    render() {
        const { blog, user, update, categories } = this.state;

        return (
            <Base>
                <div className="container justify-center align-center ">
                    <div className="width-60">

                        <div className="container align-center">
                            <span className="fa fa-user-circle fa-2x" /> &nbsp;&nbsp;&nbsp;
                                <div className="container col justify-center">
                                <b>{update ? titleCase(blog.author.name) : titleCase(user.firstname + " " + user.lastname)}</b>
                                <span className="font-size-date">{update ? (new Date(blog.createdAt)).toDateString() : (new Date()).toDateString()}</span>
                            </div>
                        </div>

                        <div className="container align-center">
                            <TextareaAutosize id="title"
                                type="text"
                                name="title"
                                placeholder="Enter title here..."
                                value={titleCase(blog.title)}
                                onChange={this.handleChange("title")}
                            />

                            {/* // TODO: Convert below field into drop down menu */}

                            <select className="badge right">{update ? titleCase(blog.category.name) : "web"} 
                                {Object.values(categories).map(category => (
                                    <option key={category._id} value={category.name}>{titleCase(category.name)}</option>
                                ))}
                            </select>

                            {update ?
                                (<b className="badge right" onClick={this.updateBlog}><span className="fa fa-pencil" /> Update</b>) :
                                (<b className="badge right" onClick={this.createBlog}><span className="fa fa-plus-square-o" /> Create</b>)}
                        </div>

                        <div>{(blog.links).map(l => {
                            return <h6 key={l}><span className="btn-more" onClick={() => window.open(l)}>http://{l}</span></h6>
                        })}
                        </div>

                        <TextareaAutosize id="content"
                            type="text"
                            name="content"
                            placeholder="Write your content here..."
                            value={blog.content}
                            onChange={this.handleChange("content")}
                        />
                    </div>
                </div>
            </Base >
        )
    }
}

export default CreateBlog;