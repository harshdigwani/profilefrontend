import React, { Component } from 'react';
import { isAutheticated } from '../../services/Auth/Auth';
import { createProject, updateProject } from '../../services/Project/Project';
import Base from '../Base/Base';

class CreateProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            links: [],
            createdBy: isAutheticated()._id,
            category: "",
            description: "",
            projectId: "",
            user: isAutheticated(),
            loading: false,
            update: false
        }
    }

    componentDidMount() {
        const project = this.props.location.state;
        console.log(project)
        if (project)
            this.setState({
                projectId: project._id,
                createdBy: project.createdBy._id,
                category: project.category._id,
                description: project.description,
                links: project.links,
                title: project.title,
                update: project.update
            })
    }

    createProject = async () => {
        try {
            this.setState({ loading: true });

            const { title, links, createdBy, category, description } = this.state;

            const response = await createProject({
                title, links, createdBy, category, description
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

            const { title, links, createdBy, category, description, projectId } = this.state;

            const response = await updateProject(projectId, {
                title, links, createdBy, category, description
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
            <Base>
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
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                    />
                    {this.state.update ? <button onClick={this.updateProject}>Update Project</button>
                        : <button onClick={this.createProject}>Create Project</button>}
                </div>
            </Base>
        )
    }
}

export default CreateProject;