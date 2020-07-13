import React, { Component } from 'react';
import { isAutheticated } from '../../services/Auth/Auth';
import { createProject, updateProject } from '../../services/Project/Project';
import Base from '../Base/Base';
import { getAllCategories } from '../../services/Category/Category';
import { titleCase } from '../../utils/StingsFunction';
import TextareaAutosize from 'react-autosize-textarea/lib';

class CreateProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: {
                title: "",
                links: [],
                category: "",
                description: ""
            },
            user: isAutheticated(),
            categories: getAllCategories(),
            loading: false,
            update: false
        }
    }

    componentDidMount() {
        const project = this.props.location.state;
        if (project)
            this.setState({
                project,
                user: isAutheticated(),
                // categories: getAllCategories(),
                update: project.update,
                loading: false
            })
    }

    createProject = async () => {
        try {
            this.setState({ loading: true });

            const { title, links, category, description } = this.state.project;

            const response = await createProject({
                title, links, createdBy: this.state.user._id, category, description
            });
            if (response.ok)
                this.setState({ loading: false });
            console.log(response);
            console.log(response.message);

        } catch (err) {
            console.error(err);
        }
    }

    updateProject = async () => {
        try {
            this.setState({ loading: true });

            const { _id, title, links, category, description } = this.state.project;

            const response = await updateProject(_id, {
                title, links, createdBy: this.state.user._id, category, description
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
        if (this.state.project !== null) {
            const value = e.target.value;

            this.setState(prevState => ({
                project: {
                    ...prevState.project,
                    [field]: value
                }
            }))
        }
    }

    render() {
        const { project, user, update, categories } = this.state;

        return (
            <Base>
                <div className="container justify-center align-center ">
                    <div className="width-60">

                        <div className="container align-center">
                            <span className="fa fa-user-circle fa-2x" /> &nbsp;&nbsp;&nbsp;
                                <div className="container col justify-center">
                                <b>{update ? titleCase(project.createdBy.name) : titleCase(user.firstname + " " + user.lastname)}</b>
                                <span className="font-size-date">{update ? (new Date(project.createdAt)).toDateString() : (new Date()).toDateString()}</span>
                            </div>
                        </div>

                        <div className="container align-center">
                            <TextareaAutosize id="title"
                                type="text"
                                name="title"
                                placeholder="Enter title here..."
                                value={titleCase(project.title)}
                                onChange={this.handleChange("title")}
                            />

                            {/* // TODO: Convert below field into drop down menu */}

                            <select className="badge right">{update ? titleCase(project.category.name) : "web"}
                                {Object.values(categories).map(category => (
                                    <option key={category._id} value={category.name}>{titleCase(category.name)}</option>
                                ))}
                            </select>

                            {update ?
                                (<b className="badge right" onClick={this.updateProject}><span className="fa fa-pencil" /> Update</b>) :
                                (<b className="badge right" onClick={this.createProject}><span className="fa fa-plus-square-o" /> Create</b>)}
                        </div>

                        <div>{(project.links).map(l => {
                            return <h6 key={l}><span className="btn-more" onClick={() => window.open(l)}>http://{l}</span></h6>
                        })}
                        </div>

                        <TextareaAutosize id="content"
                            type="text"
                            name="description"
                            placeholder="Write your project description here..."
                            value={project.description}
                            onChange={this.handleChange("description")}
                        />
                    </div>
                </div>
            </Base >
        )
    }
}

export default CreateProject;