import React, { Component } from 'react';
import { isAutheticated } from '../../services/Auth/Auth';
import { updateProfile } from '../../services/Profile/Profile';

class UpdateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            user: isAutheticated(),
            loading: false,
            update: false
        }
    }

    componentDidMount() {
        const derivedState = this.props.location.state;
        console.log(derivedState);
        if (derivedState)
            this.setState({
                profile: derivedState.profile,
                update: derivedState.update
            })
    }

    updateProfile = async () => {
        try {
            this.setState({ loading: true });

            const response = await updateProfile(this.state.profile);
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
        )
    }
}

export default UpdateProfile;