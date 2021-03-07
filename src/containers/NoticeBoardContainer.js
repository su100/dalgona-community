import React, { Component, Fragment } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dalgonaActions from 'store/modules/dalgona';
import NoticeBoard from 'components/NoticeBoard';

class NoticeBoardContainer extends Component {
    getPostList = async (params) => {
        const { DalgonaActions } = this.props;
        try {
            await DalgonaActions.getNoticeList('notice', params);
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
            //글 목록 가져오기
            this.getPost();
        }
    }

    getPost() {
        //주소바뀔 때 글 목록 가져오기
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
        this.getPostList(params);
    }

    componentDidMount() {
        this.getPostList(); //글 목록 가져오기
    }

    render() {
        const { history, location, noticeCount, noticeList } = this.props;
        return (
            <Fragment>
                <NoticeBoard history={history} location={location} postCount={noticeCount} postList={noticeList} />
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        noticeCount: state.dalgona.get('noticeCount'),
        noticeList: state.dalgona.get('noticeList'),
    }),
    (dispatch) => ({
        DalgonaActions: bindActionCreators(dalgonaActions, dispatch),
    })
)(NoticeBoardContainer);
