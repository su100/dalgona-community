import React, { Component, Fragment } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as issueActions from 'store/modules/issue';
import Article from 'components/Article';

class ArticleContainer extends Component {
    getNewsList = async (params) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.getNewsList(params);
        } catch (e) {
            console.log('error log:' + e);
        }
    };

    getNewsKeyword = async () => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.getNewsKeyword();
        } catch (e) {
            console.log('error log:' + e);
        }
    };

    getSnapshotBeforeUpdate(prevProps, prevState) {
        //주소 바뀔 때
        if (prevProps.location !== this.props.location) {
            return true;
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot) {
            //뉴스 목록 가져오기
            this.getNews();
        }
    }

    getNews() {
        //주소바뀔 때 뉴스 목록 가져오기
        const { location } = this.props;
        const query = queryString.parse(location.search);
        let params = {};
        if (query.page) {
            params['page'] = query.page;
        }
        if (query.search) {
            params['searchWord'] = query.search;
            params['searchType'] = 'title';
        }
        this.getNewsList(params);
    }

    componentDidMount() {
        this.getNews();
        this.getNewsKeyword();
    }

    render() {
        const { history, location, newsCount, newsList, newsKeyword } = this.props;
        return (
            <Fragment>
                <Article
                    history={history}
                    location={location}
                    newsCount={newsCount}
                    newsList={newsList}
                    newsKeyword={newsKeyword}
                    getNewsList={this.getNewsList}
                />
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        newsCount: state.issue.get('newsCount'),
        newsList: state.issue.get('newsList'),
        newsKeyword: state.issue.get('newsKeyword'),
    }),
    (dispatch) => ({
        IssueActions: bindActionCreators(issueActions, dispatch),
    })
)(ArticleContainer);
