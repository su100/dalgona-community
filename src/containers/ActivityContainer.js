import React, { Component, Fragment } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dalgonaActions from 'store/modules/dalgona';
import Activity from 'components/Activity';

class ActivityContainer extends Component {
    getMyPost = async (page) => {
        const { DalgonaActions } = this.props;
        try {
            await DalgonaActions.getMyPost(page);
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
            const { location } = this.props;
            const query = queryString.parse(location.search);
            this.getPostList(query.page);
        }
    }

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            alert('로그인이 필요합니다.');
            this.props.history.push('/login');
        } else {
            this.getMyPost(1);
        }
    }

    render() {
        const { history, location, myPostCount, myPost } = this.props;
        return (
            <Fragment>
                <Activity
                    history={history}
                    location={location}
                    myPostCount={myPostCount}
                    myPost={myPost}
                    getMyPost={this.getMyPost}
                />
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        isAuthenticated: state.auth.get('isAuthenticated'),
        myPostCount: state.dalgona.get('myPostCount'),
        myPost: state.dalgona.get('myPost'),
        myPoint: state.dalgona.get('myPoint'),
    }),
    (dispatch) => ({
        DalgonaActions: bindActionCreators(dalgonaActions, dispatch),
    })
)(ActivityContainer);
