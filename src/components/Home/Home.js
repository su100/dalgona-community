import React, { Component } from 'react';
import Post from 'components/Post';
import './Home.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 20,
            page: 1,
        };
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
