import React, { Component } from 'react';
import Post from 'components/Post';
import Pagination from 'components/common/Pagination';
import './Home.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countList: 100,
            page: 1,
        };
    }
    handlePage = (event) => {
        const value = event.target.value;
        this.setState({ page: value });
    };
    render() {
        const { countList, page } = this.state;
        return (
            <div className="home">
                <Post />
                <Pagination countList={countList} currentPage={page} isReply={true} handlePage={this.handlePage} />
            </div>
        );
    }
}

export default Home;
