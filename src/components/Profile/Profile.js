import React, { Component } from 'react';
import EditProfile from 'components/common/EditProfile';
import ActivityList from 'components/common/ActivityList';
import PointList from 'components/common/PointList';
import './Profile.scss';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'activity',
        };
    }

    handleType = (e) => {
        this.setState({ type: e.target.id });
    };

    render() {
        const { type } = this.state;
        return (
            <div className="profile">
                <EditProfile />
            </div>
        );
    }
}

export default Profile;
