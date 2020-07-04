import React, { Component } from 'react';
import { getAllProfiles } from '../../services/Profile/Profile';
import Base from '../Base/Base';

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


    render() {
        return (
            <Base>
                <div>
                    {/* <button onClick={(e) => { e.preventDefault(); this.getBlogsOfUser() }}>Get My Blogs</button> */}

                    {Object(this.state.profiles).map(profile =>
                        <div key={profile._id}>
                            <hr />
                            <p >{JSON.stringify(profile)}</p>
                            <hr />
                        </div>)}
                </div>
            </Base>
        )
    }
}

export default Profiles;