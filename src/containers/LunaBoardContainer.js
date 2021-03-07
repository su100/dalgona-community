import React, { Component, Fragment } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as lunaActions from 'store/modules/luna';
import LunaBoard from 'components/LunaBoard';

class LunaBoardContainer extends Component {
    getBoardInfo = async () => {
        const { location, LunaActions } = this.props;
        const tmp = location.pathname.split('/');
        try {
            await LunaActions.getBoardInfo(tmp[2]);
        } catch (e) {
            console.log('error log:' + e);
        }
    };

    getBestPostList = async () => {
        const { location, LunaActions } = this.props;
        const tmp = location.pathname.split('/');
        try {
            await LunaActions.getBestPostList(tmp[2]);
        } catch (e) {
            console.log('error log:' + e);
        }
    };

    getPostList = async (params) => {
        const { location, LunaActions } = this.props;
        const tmp = location.pathname.split('/');
        try {
            await LunaActions.getPostList(tmp[2], params);
        } catch (e) {
            console.log('error log:' + e);
        }
    };

    getSnapshotBeforeUpdate(prevProps, prevState) {
        //게시판 바뀔 때
        if (prevProps.location.pathname !== this.props.location.pathname) {
            return 'board';
        } else if (prevProps.location.search !== this.props.location.search) {
            //게시판 이동 없이 글만 새로 가져오기
            return 'post';
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot === 'board') {
            //게시판 이동할 때
            this.getBoardInfo(); //게시판 정보 가져오기
            this.getBestPostList(); //실시간 인기글 가져오기
            this.getPostList(); //글 목록 가져오기
        } else if (snapshot === 'post') {
            //게시판 그대로고 글만 새로 가져올 때
            this.getPostList(); //글 목록 가져오기
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
        this.getBoardInfo(); //게시판 정보 가져오기
        this.getBestPostList(); //실시간 인기글 가져오기
        this.getPostList(); //글 목록 가져오기
    }

    render() {
        const { history, location, boardInfo, bestPostList, postCount, postList } = this.props;
        return (
            <Fragment>
                <LunaBoard
                    history={history}
                    location={location}
                    boardInfo={boardInfo}
                    bestPostList={bestPostList}
                    postCount={postCount}
                    postList={postList}
                />
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        boardInfo: state.luna.get('boardInfo'),
        bestPostList: state.luna.get('bestPostList'),
        postCount: state.luna.get('postCount'),
        postList: state.luna.get('postList'),
    }),
    (dispatch) => ({
        LunaActions: bindActionCreators(lunaActions, dispatch),
    })
)(LunaBoardContainer);
