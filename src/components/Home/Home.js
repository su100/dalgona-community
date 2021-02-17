import React, { Component } from 'react';

import './Home.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 20,
            page: 1,
        };
    }

    handlePage = (event) => {
        // const { ordering } = this.state;
        const value = event.target.value;
        this.setState({ page: value });
        //this.props.getUserList(value, ordering);
    };

    render() {
        const { count, page } = this.state;
        return <div className="home"></div>;
    }
}

export default Home;
