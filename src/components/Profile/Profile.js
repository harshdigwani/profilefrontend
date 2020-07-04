import React, { Component } from 'react'
import { isAutheticated } from '../../services/Auth/Auth';
import { getMyProfile, getProfileById } from '../../services/Profile/Profile';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: isAutheticated(),
            profileId: this.props.match.params.id,
            profile: null
        }
    }

    async componentDidMount() {
        if (!this.state.profileId)
            this.getMyProfile();
        else
            this.getProfileById();
    }

    getMyProfile = async () => {
        try {
            const response = await getMyProfile();
            if (response.ok)
                this.setState({ profile: response.data, loading: false });
            console.log(response);
            console.log(response.message);

        } catch (err) {
            console.error(err);
        }
    }

    getProfileById = async () => {
        try {
            const response = await getProfileById(this.state.profileId);
            if (response.ok)
                this.setState({ profile: response.data, loading: false });
            console.log(response);
            console.log(response.message);

        } catch (err) {
            console.error(err);
        }
    }



    editProfile = () => {
        this.props.history.push({
            pathname: '/updateprofile',
            state: { profile: this.state.profile, update: true }
        })
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.state.profile)}
                <button onClick={this.editProfile}>Edit</button>
            </div>
        )
    }
}

export default Profile;