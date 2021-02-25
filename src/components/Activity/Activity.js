import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditProfile from 'components/common/EditProfile';
import ActivityList from 'components/common/ActivityList';
import PointList from 'components/common/PointList';
import './Activity.scss';

class Activity extends Component {
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
            <div className="activity">
                <div className="only-pc">
                    <EditProfile />
                    <div className="activity__listtype">
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
                </div>
                <div className="not-pc">
                    <div className="activity__header">
                        <span>활동내역</span>
                    </div>
                </div>
                {type === 'activity' && <ActivityList />}
                {type === 'point' && <PointList />}
            </div>
        );
    }
}

export default Activity;
