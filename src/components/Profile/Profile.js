import React, { Component } from 'react'
import { isAutheticated } from '../../services/Auth/Auth';
import { getMyProfile, getProfileById } from '../../services/Profile/Profile';
import Base from '../Base/Base';
import { titleCase } from '../../utils/StingsFunction';
import Spinner from '../Core/Spinner';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: isAutheticated(),
            profileId: this.props.match.params.id,
            profile: null,
            loading: false
        }
    }

    async componentDidMount() {
        if (this.state.profileId === "me")
            this.getMyProfile();
        else
            this.getProfileById();
    }

    getMyProfile = async () => {
        try {
            this.setState({ loading: true });
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
            this.setState({ loading: true });
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
        const { profile, user, loading } = this.state;
        if (!profile || loading) return (<Spinner></Spinner>)

        return (
            <Base>
                <div className="container justify-center align-center ">
                    <div className="width-60">
                        <div className="container align-center">
                            <h1 className="heading-1 inline">{titleCase(profile.about.name)}</h1>
                            {/* {user._id === profile._id && <b className="badge right" onClick={this.editprofile}><span className="fa fa-pencil" /> Edit</b>} */}
                        </div>
                        <div className="container align-center">
                            <span className="fa fa-user-circle fa-2x" /> &nbsp;&nbsp;&nbsp;
                                <div className="container col justify-center">
                                <b>{profile.about.email}</b>
                                <span className="font-size-date">{(new Date(profile.createdAt)).toDateString()}</span>
                            </div>
                            <b className="badge right">{titleCase(profile.about.name)}</b>
                        </div>


                        <div>{(profile.links).map(l => {
                            return <h6 key={l}><span className="btn-more" onClick={() => window.open(l)}>http://{l}</span></h6>
                        })}</div>

                        <p className="content" placeholder="profile Descrition...">
                            {profile.description}
                        </p>
                    </div>
                </div>
            </Base>
        )
    }
}

export default Profile;