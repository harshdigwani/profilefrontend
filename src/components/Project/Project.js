import React, { Component } from 'react'
import { isAutheticated } from '../../services/Auth/Auth';
import { getProjectById } from '../../services/Project/Project';
import Base from '../Base/Base';
import Spinner from '../Core/Spinner';
import { titleCase } from '../../utils/StingsFunction';

class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: isAutheticated(),
            projectId: this.props.match.params.id,
            project: null
        }
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true });

            const response = await getProjectById(this.state.projectId);
            if (response.ok)
                this.setState({ project: response.data, loading: false });
            console.log(response);
            console.log(response.message);

        } catch (err) {
            console.error(err);
        }
    }

    editProject = () => {
        this.props.history.push({
            pathname: '/createproject',
            state: { ...this.state.project, update: true }
        })
    }

    render() {
        let { project, user } = this.state;
        if (!project) return (<Base>{<Spinner/>}</Base>)


        return (
            <Base>
                {this.state.loading && <Spinner />}
                <div className="container justify-center align-center ">
                    <div className="width-60">
                        <div className="container align-center">
                            <h1 className="heading-1 inline">{titleCase(project.title)}</h1>
                            {user._id === project.createdBy._id && <b className="badge right" onClick={this.editProject}><span className="fa fa-pencil" /> Edit</b>}
                        </div>
                        <div className="container align-center">
                            <span className="fa fa-user-circle fa-2x" /> &nbsp;&nbsp;&nbsp;
                                <div className="container col justify-center">
                                <b>{titleCase(project.createdBy.name)}</b>
                                <span className="font-size-date">{(new Date(project.createdAt)).toDateString()}</span>
                            </div>
                            <b className="badge right">{titleCase(project.category.name)}</b>
                        </div>


                        <div>{(project.links).map(l => {
                            return <h6 key={l}><span className="btn-more" onClick={() => window.open(l)}>http://{l}</span></h6>
                        })}</div>

                        <p className="content" placeholder="Project Descrition...">
                            {project.description}
                        </p>
                    </div>
                </div>
            </Base>
        )
    }
}

export default Project;