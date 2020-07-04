import React, { Component } from 'react'
import { isAutheticated } from '../../services/Auth/Auth';
import { getProjectById } from '../../services/Project/Project';
import Base from '../Base/Base';


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
        return (
            <Base>
                <div>
                    {JSON.stringify(this.state.project)}
                    <button onClick={this.editProject}>Edit</button>
                </div>
            </Base>
        )
    }
}

export default Project;