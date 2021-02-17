import React, { Component } from 'react';
import Post from 'components/Post';
import './Home.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="home">
                <Post />
            </div>
        );
    }
}

export default Home;
