import React, { Component, Fragment } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as dalgonaActions from 'store/modules/dalgona';
import EventBoard from 'components/EventBoard';

class EventBoardContainer extends Component {
    getPostList = async (params) => {
        const { DalgonaActions } = this.props;
        try {
            await DalgonaActions.getEventList('event', params);
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

    getProfile = async () => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.getProfile();
        } catch (e) {
            console.log('error log:' + e);
        }
    };

    componentDidMount() {
        this.getPostList(); //글 목록 가져오기
    }

    render() {
        const { history, location, eventCount, eventList, profile } = this.props;
        const isSuperuser = profile.get('is_superuser');
        return (
            <Fragment>
                <EventBoard
                    history={history}
                    location={location}
                    postCount={eventCount}
                    postList={eventList}
                    isSuperuser={isSuperuser}
                />
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        eventCount: state.dalgona.get('eventCount'),
        eventList: state.dalgona.get('eventList'),
        profile: state.auth.get('profile'),
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        DalgonaActions: bindActionCreators(dalgonaActions, dispatch),
    })
)(EventBoardContainer);
