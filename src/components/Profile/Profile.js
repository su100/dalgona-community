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
                <div className="only-pc">
                    <div className="profile__listtype">
                        <button
                            className={type === 'activity' ? 'profile__listtype click' : undefined}
                            onClick={this.handleType}
                            id="activity"
                        >
                            활동내역
                        </button>
                        <button
                            className={type === 'point' ? 'profile__listtype click' : undefined}
                            onClick={this.handleType}
                            id="point"
                        >
                            별 내역
                        </button>
                    </div>
                    {type === 'activity' && <ActivityList />}
                    {type === 'point' && <PointList />}
                </div>
            </div>
        );
    }
}

export default Profile;
