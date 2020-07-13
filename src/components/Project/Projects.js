import React, { Component } from 'react';
import { getAllProjects, getProjectsOfUser } from '../../services/Project/Project'
import { titleCase } from '../../utils/StingsFunction';
import Base from '../Base/Base';

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

    openProject = (id) => this.props.history.push(`/project/${id}`);


    render() {
        return (
            <Base>
                <div className="container col justify-center align-center flex-wrap space-arround">
                    {/* <button onClick={(e) => { e.preventDefault(); this.getprojectsOfUser() }}>Get My Blogs</button> */}

                    {Object(this.state.projects).map(project => (

                        <div key={project._id} className="card-blog">
                            <div className="container align-center">
                                <span className="fa fa-user-circle fa-2x" /> &nbsp;&nbsp;&nbsp;
                                <div className="container col justify-center">
                                    <b>{titleCase(project.createdBy.name)}</b>
                                    <span >{(new Date(project.createdAt)).toDateString()}</span>
                                </div>
                                <b className="badge right">{titleCase(project.category.name)}</b>
                            </div>
                            <h2>{titleCase(project.title)}</h2>
                            <p>
                                {Array(project.content).slice(0, 100)}...
                                <span className="btn-more" onClick={() => this.openProject(project._id)}>read more</span>
                            </p>

                            {/* <div>{Array(project.link).map(l => <div key={Math.random()}> {l} &nbsp; &nbsp;&nbsp; </div>)}</div> */}
                            {/* {JSON.stringify(project)} */}
                        </div>
                    ))}
                </div>
            </Base>)
    }
}

export default Projects;