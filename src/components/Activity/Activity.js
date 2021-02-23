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
                <ActivityList />
                <ActivityList />
                <ActivityList />
            </div>
        );
    }
}

export default Activity;
