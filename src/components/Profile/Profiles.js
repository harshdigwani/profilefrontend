import React, { Component } from 'react';
import { getAllProfiles } from '../../services/Profile/Profile';
import Base from '../Base/Base';
import Spinner from '../Core/Spinner'
import { titleCase } from '../../utils/StingsFunction';

class Profiles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            error: {},
            loading: true
        }
    }

    async componentDidMount() {
        await this.getAllProfiles();
    }

    getAllProfiles = async () => {
        try {
            const response = await getAllProfiles();
            if (response.ok)
                this.setState({ profiles: response.data, loading: false });
            console.log(response)
            console.log(response.message);

        } catch (err) {
            console.error(err);
        }
    }

    openProfile = (id) => this.props.history.push(`/profile/${id}`);

    render() {
        return (
            <Base>
                <div className="container col justify-center align-center flex-wrap space-arround">
                    {/* <button onClick={(e) => { e.preventDefault(); this.getBlogsOfUser() }}>Get My Blogs</button> */}
                    {this.state.loading && <Spinner />}

                    {Object(this.state.profiles).map(profile => (

                        <div key={profile._id} className="card-blog">
                            <div className="container align-center">
                                <span className="fa fa-user-circle fa-2x" /> &nbsp;&nbsp;&nbsp;
                                <div className="container col justify-center">
                                    <b>{titleCase(profile.about.name)}</b>
                                    <span >{(new Date(profile.createdAt)).toDateString()}</span>
                                </div>
                                <span className="badge btn-more right" onClick={() => this.openProfile(profile._id)}>View Profile</span>

                            </div>
                            <b>{profile.about.email}</b>
                            <p>{profile.about.description}</p>
                            {/* <div>{Array(profile.link).map(l => <div key={Math.random()}> {l} &nbsp; &nbsp;&nbsp; </div>)}</div> */}
                            {/* {JSON.stringify(profile)} */}
                        </div>
                    ))}
                </div>
            </Base>
        )
    }
}

export default Profiles;