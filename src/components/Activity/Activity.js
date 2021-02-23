import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ActivityList from 'components/common/ActivityList';

import './Activity.scss';

class Activity extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="activity">
                <div className="not-pc">
                    <div className="activity__header">
                        <span>활동내역</span>
                    </div>
                </div>
                <ActivityList />
                <ActivityList />
                <ActivityList />
            </div>
        );
    }
}

export default Activity;
