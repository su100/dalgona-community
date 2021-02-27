import React, { Component } from 'react';

import './ArticleList.scss';

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            searchWord: '',
            articleCount: 23,
            articleList: [],
        };
    }
    render() {
        return (
            <div className="article-list">
                <div>헤더</div>
                <div>키워드</div>
                <div>기사 map</div>
            </div>
        );
    }
}

export default ArticleList;
