import React, { Component } from 'react';
import { getAllProjects, getProjectsOfUser } from '../../services/Project/Project'

class Projects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            error: {},
            loading: true
        }
    }

    async componentDidMount() {
        await this.getAllProjects();
    }

    getAllProjects = async () => {
        try {
            const response = await getAllProjects();
            if (response.ok)
                this.setState({ projects: response.data, loading: false });
            console.log(response)
            console.log(response.message);

        } catch (err) {
            console.error(err);
        }
    }

    getProjectsOfUser = async () => {
        try {
            const response = await getProjectsOfUser();
            if (response.ok)
                this.setState({ projects: response.data, loading: false });
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

                {Object(this.state.projects).map(project =>
                    (<div key={project._id}>
                        <h1>{project.title}</h1>
                        <p>{project.category.name}</p>
                        <p>{project.createdBy.name}</p>
                        <p>{project.description}</p>
                        <p>{(new Date(project.createdAt)).toLocaleDateString()}</p>
                        <div>{Array(project.link).map(l => <div key={Math.random()}> {l} &nbsp; &nbsp;&nbsp; </div>)}</div>
                        {/* {JSON.stringify(blog)} */}
                    </div>))}
            </div>)

    }
}

export default Projects;