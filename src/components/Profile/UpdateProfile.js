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

    getState = () => console.log(this.state);

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
        console.log(e.target)
        if (this.state.update)
            this.setState({
                [e.target.name]: e.target.value
            })
    }

    render() {
        if (!this.state.update)
            return (<div>No Profile found</div>)
        return (

            <div>
                <h4>{this.state.user.firstname + " " + this.state.user.lastname}</h4>
                <h4>{this.state.category}</h4>
                <h4>Name</h4>
                <input
                    type="text"
                    name="profile.about.name"
                    value={this.state.profile.about.name}
                    onChange={this.handleChange}
                />

                <h5>{JSON.stringify(this.state.profile.about)}</h5>

                <button onClick={this.updateProfile}>Update Profile</button>
                <button onClick={this.getState}>Get state </button>

            </div>
        )
    }
}

export default UpdateProfile;